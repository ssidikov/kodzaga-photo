import { db } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { desc, sql } from "drizzle-orm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download } from "lucide-react";
import {
  buildReservationWhere,
  parseReservationFilters,
  RESERVATION_STATUSES,
} from "@/lib/reservation-filters";
import { requireAdminPage } from "@/lib/admin-auth";

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

function formatDate(d: Date | string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface PageProps {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}

export default async function ReservationsPage({ searchParams }: PageProps) {
  await requireAdminPage();
  const params = await searchParams;
  const { q, status: statusFilter } = parseReservationFilters(params);
  const requestedPage = parsePage(params.page);
  const pageSize = 20;
  const where = buildReservationWhere({ q, status: statusFilter });

  const [totalRow] = await db
    .select({ count: sql<number>`count(*)` })
    .from(reservations)
    .where(where);

  const total = Number(totalRow?.count ?? 0);
  const totalPages = Math.ceil(total / pageSize);
  const currentPage = Math.min(requestedPage, Math.max(totalPages, 1));
  const offset = (currentPage - 1) * pageSize;

  const rows = await db
    .select()
    .from(reservations)
    .where(where)
    .orderBy(desc(reservations.createdAt))
    .limit(pageSize)
    .offset(offset);

  function buildUrl(overrides: Record<string, string>) {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (statusFilter) p.set("status", statusFilter);
    if (currentPage > 1) p.set("page", String(currentPage));
    for (const [k, v] of Object.entries(overrides)) {
      if (v) p.set(k, v);
      else p.delete(k);
    }
    const s = p.toString();
    return `/admin/reservations${s ? `?${s}` : ""}`;
  }

  function buildExportUrl() {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (statusFilter) p.set("status", statusFilter);
    const s = p.toString();
    return `/api/admin/export-csv${s ? `?${s}` : ""}`;
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C]/60 mb-1">
            Réservations
          </p>
          <h1 className="text-xl md:text-2xl font-semibold text-[#f0ece3]">
            Toutes les réservations
          </h1>
          <p className="text-sm text-[#f0ece3]/35 mt-1">
            {total} entrée{total !== 1 ? "s" : ""}
          </p>
        </div>
        <a
          href={buildExportUrl()}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 md:px-4 py-2 text-xs font-medium text-[#f0ece3]/60 hover:text-[#f0ece3] hover:bg-white/[0.07] transition-all shrink-0"
        >
          <Download size={14} />
          <span className="hidden sm:inline">Exporter CSV</span>
        </a>
      </div>

      {/* Filters */}
      <form method="GET" className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3 mb-5 md:mb-6">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Rechercher par nom, email, prestation..."
          className="w-full sm:flex-1 sm:min-w-[220px] h-9 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-[#f0ece3] placeholder:text-[#f0ece3]/25 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-colors"
        />
        <div className="flex gap-2">
          <select
            name="status"
            defaultValue={statusFilter}
            className="flex-1 sm:flex-none h-9 rounded-lg border border-white/10 bg-[#0d1117] px-3 text-sm text-[#f0ece3]/70 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-colors"
          >
            <option value="">Tous statuts</option>
            {RESERVATION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="h-9 px-4 rounded-lg bg-[#C9A84C] text-[#06080f] text-xs font-semibold hover:bg-[#e8d48b] transition-all active:scale-[0.97] shrink-0"
          >
            Filtrer
          </button>
          {(q || statusFilter) && (
            <Link
              href="/admin/reservations"
              className="h-9 px-3 rounded-lg border border-white/10 text-[#f0ece3]/50 text-xs font-medium hover:text-[#f0ece3] hover:bg-white/[0.04] flex items-center transition-all shrink-0"
            >
              ✕
            </Link>
          )}
        </div>
      </form>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2 mb-4">
        {rows.length === 0 && (
          <div className="rounded-xl border border-white/[0.06] bg-[#0d1117] px-5 py-12 text-center text-sm text-[#f0ece3]/25">
            Aucune réservation trouvée.
          </div>
        )}
        {rows.map((r) => (
          <Link
            key={r.id}
            href={`/admin/reservations/${r.id}`}
            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0d1117] px-4 py-3.5 hover:bg-white/[0.02] active:scale-[0.99] transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-[#C9A84C]">
                {r.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <p className="font-medium text-sm text-[#f0ece3] truncate">{r.name}</p>
                <Badge variant={STATUS_VARIANT[r.status] ?? "secondary"} className="shrink-0 text-[10px]">
                  {STATUS_LABELS[r.status] ?? r.status}
                </Badge>
              </div>
              <p className="text-xs text-[#f0ece3]/40 truncate">{r.prestation}</p>
              <p className="text-[10px] text-[#f0ece3]/25 mt-0.5">{formatDate(r.createdAt)}</p>
            </div>
            <ArrowRight size={14} className="text-[#f0ece3]/20 shrink-0" />
          </Link>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-xl border border-white/[0.06] bg-[#0d1117] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Client", "Prestation", "Date souhaitée", "Statut", "Reçu le", ""].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.12em] text-[#f0ece3]/30 font-medium whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center text-sm text-[#f0ece3]/25">
                    Aucune réservation trouvée.
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-semibold text-[#C9A84C]">
                          {r.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-[#f0ece3] truncate max-w-[160px]">{r.name}</p>
                        <p className="text-xs text-[#f0ece3]/35 truncate max-w-[160px]">{r.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[#f0ece3]/70 truncate max-w-[140px] block">{r.prestation}</span>
                  </td>
                  <td className="px-5 py-4 text-[#f0ece3]/50 whitespace-nowrap">
                    {r.date ? formatDate(r.date) : <span className="text-[#f0ece3]/20">-</span>}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={STATUS_VARIANT[r.status] ?? "secondary"}>
                      {STATUS_LABELS[r.status] ?? r.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-[#f0ece3]/35 text-xs whitespace-nowrap">
                    {formatDate(r.createdAt)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/reservations/${r.id}`}
                      className="inline-flex items-center gap-1 text-xs text-[#f0ece3]/25 group-hover:text-[#C9A84C] transition-colors"
                    >
                      Voir <ArrowRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 px-1 flex items-center justify-between">
          <p className="text-xs text-[#f0ece3]/30">
            Page {currentPage} / {totalPages}
          </p>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Link
                href={buildUrl({ page: String(currentPage - 1) })}
                className="h-9 px-4 rounded-lg border border-white/10 text-xs text-[#f0ece3]/60 hover:text-[#f0ece3] hover:bg-white/[0.04] flex items-center transition-all"
              >
                Précédent
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={buildUrl({ page: String(currentPage + 1) })}
                className="h-9 px-4 rounded-lg bg-[#C9A84C] text-[#06080f] text-xs font-semibold hover:bg-[#e8d48b] flex items-center transition-all"
              >
                Suivant
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function parsePage(value: string | undefined) {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) ? Math.max(1, parsed) : 1;
}
