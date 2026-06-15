import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { getAdminSession } from "@/lib/admin-auth";
import { buildReservationWhere, parseReservationFilters } from "@/lib/reservation-filters";

const CSV_FORMULA_PREFIX = /^[=+\-@\t\r]/;

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return new NextResponse("Non autorisé", { status: 401 });

  const { searchParams } = new URL(request.url);
  const filters = parseReservationFilters({
    q: searchParams.get("q"),
    status: searchParams.get("status"),
  });
  const where = buildReservationWhere(filters);
  const db = getDb();

  const rows = await db
    .select()
    .from(reservations)
    .where(where)
    .orderBy(desc(reservations.createdAt));

  const header = [
    "ID",
    "Nom",
    "Email",
    "Téléphone",
    "Prestation",
    "Date souhaitée",
    "Lieu",
    "Options",
    "Message",
    "Statut",
    "Notes",
    "Reçu le",
  ].join(",");

  function esc(value: string | null | undefined) {
    if (!value) return "";
    const safeValue = CSV_FORMULA_PREFIX.test(value) ? `'${value}` : value;
    return `"${safeValue.replace(/"/g, '""')}"`;
  }

  const lines = rows.map((r) =>
    [
      esc(r.id),
      esc(r.name),
      esc(r.email),
      esc(r.phone),
      esc(r.prestation),
      esc(r.date),
      esc(r.lieu),
      esc((r.options as string[] | null)?.join("; ")),
      esc(r.message),
      esc(r.status),
      esc(r.notes),
      esc(r.createdAt.toISOString()),
    ].join(",")
  );

  const csv = [header, ...lines].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="reservations-${Date.now()}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}
