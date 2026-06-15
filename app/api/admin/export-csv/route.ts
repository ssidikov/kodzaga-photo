import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session) return new NextResponse("Non autorisé", { status: 401 });

  const rows = await db
    .select()
    .from(reservations)
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

  function esc(v: string | null | undefined) {
    if (!v) return "";
    return `"${v.replace(/"/g, '""')}"`;
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
    },
  });
}
