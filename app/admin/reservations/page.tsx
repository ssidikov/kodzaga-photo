import { db } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { desc, like, eq, and, or } from "drizzle-orm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download } from "lucide-react";

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

const STATUSES = ["new", "contacted", "confirmed", "completed", "cancelled"];

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
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const statusFilter = params.status ?? "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  const conditions = [];
  if (q) {
    conditions.push(
      or(
        like(reservations.name, `%${q}%`),
        like(reservations.email, `%${q}%`),
        like(reservations.prestation, `%${q}%`)
      )
    );
  }
  if (statusFilter && STATUSES.includes(statusFilter)) {
    conditions.push(eq(reservations.status, statusFilter));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const rows = await db
    .select()
    .from(reservations)
    .where(where)
    .orderBy(desc(reservations.createdAt))
    .limit(pageSize)
    .offset(offset);

  const totalRows = await db
    .select({ count: reservations.id })
    .from(reservations)
    .where(where);

  const total = totalRows.length;
  const totalPages = Math.ceil(total / pageSize);

  function buildUrl(overrides: Record<string, string>) {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (statusFilter) p.set("status", statusFilter);
    if (page > 1) p.set("page", String(page));
    for (const [k, v] of Object.entries(overrides)) {
      if (v) p.set(k, v);
      else p.delete(k);
    }
    const s = p.toString();
    return `/admin/reservations${s ? `?${s}` : ""}`;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C]/60 mb-1">
            Réservations
          </p>
          <h1 className="text-2xl font-semibold text-[#f0ece3]">
            Toutes les réservations
          </h1>
          <p className="text-sm text-[#f0ece3]/35 mt-1">
            {total} entrée{total !== 1 ? "s" : ""}
          </p>
        </div>
        <a
          href="/api/admin/export-csv"
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-[#f0ece3]/60 hover:text-[#f0ece3] hover:bg-white/[0.07] transition-all"
        >
          <Download size={14} />
          Exporter CSV
        </a>
      </div>

      {/* Filters */}
      <form method="GET" className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Rechercher par nom, email, prestation..."
          className="flex-1 min-w-[220px] h-9 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-[#f0ece3] placeholder:text-[#f0ece3]/25 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-colors"
        />
        <select
          name="status"
          defaultValue={statusFilter}
          className="h-9 rounded-lg border border-white/10 bg-[#0d1117] px-3 text-sm text-[#f0ece3]/70 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-colors"
        >
          <option value="">Tous les statuts</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-9 px-4 rounded-lg bg-[#C9A84C] text-[#06080f] text-xs font-semibold hover:bg-[#e8d48b] transition-all active:scale-[0.97]"
        >
          Filtrer
        </button>
        {(q || statusFilter) && (
          <Link
            href="/admin/reservations"
            className="h-9 px-4 rounded-lg border border-white/10 text-[#f0ece3]/50 text-xs font-medium hover:text-[#f0ece3] hover:bg-white/[0.04] flex items-center transition-all"
          >
            Effacer
          </Link>
        )}
      </form>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.06] bg-[#0d1117] overflow-hidden">
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
                <tr
                  key={r.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-white/[0.06] flex items-center justify-between">
            <p className="text-xs text-[#f0ece3]/30">
              Page {page} / {totalPages}
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={buildUrl({ page: String(page - 1) })}
                  className="h-8 px-3 rounded-lg border border-white/10 text-xs text-[#f0ece3]/60 hover:text-[#f0ece3] hover:bg-white/[0.04] flex items-center transition-all"
                >
                  Précédent
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={buildUrl({ page: String(page + 1) })}
                  className="h-8 px-3 rounded-lg bg-[#C9A84C] text-[#06080f] text-xs font-semibold hover:bg-[#e8d48b] flex items-center transition-all"
                >
                  Suivant
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
