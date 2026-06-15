import { db } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { desc, gte, sql } from "drizzle-orm";
import { requireAdminPage } from "@/lib/admin-auth";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, TrendingUp, Clock, ArrowRight } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  confirmed: "Confirmé",
  completed: "Terminé",
  cancelled: "Annulé",
};

const STATUS_VARIANT: Record<string, "new" | "contacted" | "confirmed" | "completed" | "cancelled"> = {
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

export default async function AdminDashboard() {
  const session = await requireAdminPage();

  // eslint-disable-next-line react-hooks/purity
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [allReservations, weekReservations, statusCounts, recent, prestationCounts] =
    await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(reservations),
      db
        .select({ count: sql<number>`count(*)` })
        .from(reservations)
        .where(gte(reservations.createdAt, weekAgo)),
      db
        .select({ status: reservations.status, count: sql<number>`count(*)` })
        .from(reservations)
        .groupBy(reservations.status),
      db
        .select()
        .from(reservations)
        .orderBy(desc(reservations.createdAt))
        .limit(5),
      db
        .select({ prestation: reservations.prestation, count: sql<number>`count(*)` })
        .from(reservations)
        .groupBy(reservations.prestation)
        .orderBy(desc(sql`count(*)`))
        .limit(5),
    ]);

  const total = Number(allReservations[0]?.count ?? 0);
  const thisWeek = Number(weekReservations[0]?.count ?? 0);
  const newCount = Number(statusCounts.find((s) => s.status === "new")?.count ?? 0);
  const confirmedCount = Number(statusCounts.find((s) => s.status === "confirmed")?.count ?? 0);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C]/60 mb-1">
          Tableau de bord
        </p>
        <h1 className="text-2xl font-semibold text-[#f0ece3]">
          Bonjour, {session?.user?.name?.split(" ")[0]}
        </h1>
        <p className="text-sm text-[#f0ece3]/35 mt-1">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total réservations",
            value: total,
            icon: Users,
            sub: "toutes périodes",
          },
          {
            label: "Cette semaine",
            value: thisWeek,
            icon: TrendingUp,
            sub: "7 derniers jours",
            accent: true,
          },
          {
            label: "En attente",
            value: newCount,
            icon: Clock,
            sub: "à traiter",
            warn: newCount > 0,
          },
          {
            label: "Confirmées",
            value: confirmedCount,
            icon: CalendarDays,
            sub: "en cours",
          },
        ].map(({ label, value, icon: Icon, sub, accent, warn }) => (
          <div
            key={label}
            className={`rounded-xl border p-5 bg-[#0d1117] transition-colors ${
              accent
                ? "border-[#C9A84C]/25 bg-[#C9A84C]/[0.04]"
                : warn
                ? "border-yellow-500/20 bg-yellow-500/[0.03]"
                : "border-white/[0.06]"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-[10px] uppercase tracking-[0.12em] font-medium ${
                  accent ? "text-[#C9A84C]/70" : warn ? "text-yellow-500/60" : "text-[#f0ece3]/35"
                }`}
              >
                {label}
              </span>
              <Icon
                size={14}
                className={accent ? "text-[#C9A84C]/60" : warn ? "text-yellow-500/50" : "text-[#f0ece3]/20"}
              />
            </div>
            <p
              className={`text-3xl font-bold tracking-tight ${
                accent ? "text-[#C9A84C]" : warn && value > 0 ? "text-yellow-400" : "text-[#f0ece3]"
              }`}
            >
              {value}
            </p>
            <p className="text-[11px] text-[#f0ece3]/25 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Two columns: recent + prestation breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent reservations */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-[#0d1117]">
          <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#f0ece3]">Dernières réservations</h2>
              <p className="text-[11px] text-[#f0ece3]/30 mt-0.5">5 plus récentes</p>
            </div>
            <Link
              href="/admin/reservations"
              className="flex items-center gap-1.5 text-xs text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors"
            >
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recent.length === 0 && (
              <div className="px-6 py-10 text-center text-sm text-[#f0ece3]/25">
                Aucune réservation pour l&apos;instant.
              </div>
            )}
            {recent.map((r) => (
              <Link
                key={r.id}
                href={`/admin/reservations/${r.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-[#C9A84C]">
                    {r.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#f0ece3] truncate">{r.name}</p>
                  <p className="text-xs text-[#f0ece3]/35 truncate">{r.prestation}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <Badge variant={STATUS_VARIANT[r.status] ?? "secondary"}>
                    {STATUS_LABELS[r.status] ?? r.status}
                  </Badge>
                  <span className="text-[10px] text-[#f0ece3]/25">{formatDate(r.createdAt)}</span>
                </div>
                <ArrowRight
                  size={14}
                  className="text-[#f0ece3]/20 group-hover:text-[#f0ece3]/50 transition-colors ml-1 shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Prestation breakdown */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0d1117]">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <h2 className="text-sm font-semibold text-[#f0ece3]">Top prestations</h2>
            <p className="text-[11px] text-[#f0ece3]/30 mt-0.5">par volume</p>
          </div>
          <div className="px-6 py-4 space-y-4">
            {prestationCounts.length === 0 && (
              <p className="text-sm text-[#f0ece3]/25 text-center py-6">Aucune donnée.</p>
            )}
            {prestationCounts.map(({ prestation, count }, i) => {
              const pct = total > 0 ? Math.round((Number(count) / total) * 100) : 0;
              return (
                <div key={prestation}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-[#f0ece3]/70 truncate max-w-[160px]">
                      {prestation}
                    </span>
                    <span className="text-xs font-medium text-[#f0ece3]/50 ml-2 shrink-0">
                      {count}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#C9A84C] transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        opacity: 1 - i * 0.12,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status breakdown */}
          <div className="px-6 pb-5 pt-2 border-t border-white/[0.04] mt-2">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#f0ece3]/25 mb-3">
              Par statut
            </p>
            <div className="space-y-2">
              {statusCounts.map(({ status, count }) => (
                <div key={status} className="flex items-center justify-between">
                  <Badge variant={STATUS_VARIANT[status] ?? "secondary"} className="text-[10px]">
                    {STATUS_LABELS[status] ?? status}
                  </Badge>
                  <span className="text-xs text-[#f0ece3]/40">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
