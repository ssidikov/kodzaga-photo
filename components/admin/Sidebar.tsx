"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  CalendarDays,
  BadgeEuro,
  LogOut,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/admin/reservations", label: "Réservations", icon: CalendarDays, exact: false },
  { href: "/admin/tarifs", label: "Tarifs", icon: BadgeEuro, exact: false },
];

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full w-full md:w-64 bg-[#0a0d13] border-r border-white/[0.06]">
      {/* Brand */}
      <div className="px-6 py-7 border-b border-white/[0.06]">
        <p className="font-heading text-lg font-light tracking-widest text-[#f0ece3]">
          AL3X <em className="text-[#C9A84C]">Photos</em>
        </p>
        <p className="mt-0.5 text-[9px] uppercase tracking-[0.3em] text-[#f0ece3]/25">
          Admin
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 group",
                active
                  ? "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20"
                  : "text-[#f0ece3]/50 hover:bg-white/[0.04] hover:text-[#f0ece3]"
              )}
            >
              <Icon
                size={16}
                className={cn(
                  "shrink-0 transition-colors",
                  active ? "text-[#C9A84C]" : "text-[#f0ece3]/35 group-hover:text-[#f0ece3]/60"
                )}
              />
              <span className="font-medium">{label}</span>
              {active && <ChevronRight size={12} className="ml-auto text-[#C9A84C]/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-0.5 border-t border-white/[0.06] pt-3">
        <Link
          href="/"
          target="_blank"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#f0ece3]/40 hover:bg-white/[0.04] hover:text-[#f0ece3]/70 transition-all duration-150 group"
        >
          <ExternalLink size={15} className="shrink-0" />
          <span>Voir le site</span>
        </Link>
        <button
          onClick={() => { onNavigate?.(); signOut({ callbackUrl: "/admin/login" }); }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#f0ece3]/40 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 group"
        >
          <LogOut size={15} className="shrink-0" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
