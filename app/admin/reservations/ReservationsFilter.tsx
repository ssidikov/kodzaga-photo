"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Search, X } from "lucide-react";

const STATUSES = [
  { value: "", label: "Tous" },
  { value: "new", label: "Nouveau" },
  { value: "contacted", label: "Contacté" },
  { value: "confirmed", label: "Confirmé" },
  { value: "completed", label: "Terminé" },
  { value: "cancelled", label: "Annulé" },
];

export default function ReservationsFilter({
  q: initialQ,
  status: initialStatus,
}: {
  q: string;
  status: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function navigate(nextQ: string, nextStatus: string) {
    const params = new URLSearchParams();
    if (nextQ) params.set("q", nextQ);
    if (nextStatus) params.set("status", nextStatus);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    navigate(String(formData.get("q") ?? ""), initialStatus);
  }

  function handleStatus(val: string) {
    navigate(initialQ, val);
  }

  function clearAll() {
    startTransition(() => router.push(pathname));
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f0ece3]/30 pointer-events-none" />
          <input
            type="text"
            name="q"
            defaultValue={initialQ}
          placeholder="Rechercher nom, email, prestation..."
          className="w-full h-9 pl-9 pr-8 rounded-lg border border-white/10 bg-white/5 text-sm text-[#f0ece3] placeholder:text-[#f0ece3]/25 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition-colors"
        />
        {initialQ && (
          <button
            type="button"
            onClick={() => navigate("", initialStatus)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#f0ece3]/30 hover:text-[#f0ece3]/60"
          >
            <X size={13} />
          </button>
        )}
      </form>

      {/* Status tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {STATUSES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleStatus(value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
              initialStatus === value
                ? "bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30"
                : "border border-white/[0.08] text-[#f0ece3]/45 hover:border-white/20 hover:text-[#f0ece3]/70"
            } ${isPending ? "opacity-60 pointer-events-none" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      {(initialQ || initialStatus) && (
        <button
          onClick={clearAll}
          className="text-xs text-[#f0ece3]/30 hover:text-[#f0ece3]/60 transition-colors whitespace-nowrap"
        >
          Effacer tout
        </button>
      )}
    </div>
  );
}
