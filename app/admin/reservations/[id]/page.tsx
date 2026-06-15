import { getDb } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/admin-auth";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import {
  updateReservationStatus,
  updateReservationNotes,
  deleteReservation,
} from "./actions";
import ReservationDetailClient from "./ReservationDetailClient";

const STATUS_LABELS: Record<string, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  confirmed: "Confirmé",
  completed: "Terminé",
  cancelled: "Annulé",
};

type StatusVariant = "new" | "contacted" | "confirmed" | "completed" | "cancelled" | "secondary";
const STATUS_VARIANT: Record<string, StatusVariant> = {
  new: "new",
  contacted: "contacted",
  confirmed: "confirmed",
  completed: "completed",
  cancelled: "cancelled",
};
const idSchema = z.string().uuid();

function formatDate(d: Date | string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReservationDetailPage({ params }: PageProps) {
  const { id } = await params;
  await requireAdminPage();
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) notFound();
  const db = getDb();

  const [reservation] = await db
    .select()
    .from(reservations)
    .where(eq(reservations.id, parsedId.data))
    .limit(1);

  if (!reservation) notFound();

  const fields = [
    { label: "Nom complet", value: reservation.name },
    { label: "Email", value: reservation.email, href: `mailto:${reservation.email}` },
    { label: "Téléphone", value: reservation.phone },
    { label: "Prestation", value: reservation.prestation },
    { label: "Date souhaitée", value: reservation.date ? new Date(reservation.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : null },
    { label: "Lieu", value: reservation.lieu },
    { label: "Options", value: (reservation.options as string[] | null)?.join(", ") || null },
    { label: "Message", value: reservation.message, multiline: true },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Back */}
      <Link
        href="/admin/reservations"
        className="inline-flex items-center gap-1.5 text-xs text-[#f0ece3]/35 hover:text-[#f0ece3]/70 transition-colors mb-6"
      >
        &larr; Retour aux réservations
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6 md:mb-8 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
            <span className="text-lg font-semibold text-[#C9A84C]">
              {reservation.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[#f0ece3]">{reservation.name}</h1>
            <p className="text-xs text-[#f0ece3]/35 mt-0.5">
              Reçue le {formatDate(reservation.createdAt)}
            </p>
          </div>
        </div>
        <Badge variant={STATUS_VARIANT[reservation.status] ?? "secondary"} className="shrink-0 text-xs px-3 py-1">
          {STATUS_LABELS[reservation.status] ?? reservation.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl border border-white/[0.06] bg-[#0d1117] divide-y divide-white/[0.04]">
            {fields.map(({ label, value, href, multiline }) => (
              value ? (
                <div key={label} className="px-6 py-4">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#f0ece3]/30 mb-1.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-[#C9A84C] hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className={`text-sm text-[#f0ece3]/80 ${multiline ? "whitespace-pre-wrap" : ""}`}>
                      {value}
                    </p>
                  )}
                </div>
              ) : null
            ))}
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${reservation.email}`}
              className="flex items-center gap-2 rounded-lg bg-[#C9A84C] text-[#06080f] px-4 py-2 text-xs font-semibold hover:bg-[#e8d48b] transition-all active:scale-[0.97]"
            >
              Envoyer un email
            </a>
            {reservation.phone && (
              <a
                href={`tel:${reservation.phone}`}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] text-[#f0ece3]/70 px-4 py-2 text-xs font-medium hover:text-[#f0ece3] hover:bg-white/[0.07] transition-all"
              >
                Appeler
              </a>
            )}
          </div>
        </div>

        {/* Sidebar: status + notes + delete */}
        <ReservationDetailClient
          reservation={{
            id: reservation.id,
            status: reservation.status,
            notes: reservation.notes ?? "",
          }}
          statusLabels={STATUS_LABELS}
          updateStatus={updateReservationStatus}
          updateNotes={updateReservationNotes}
          deleteAction={deleteReservation}
        />
      </div>
    </div>
  );
}
