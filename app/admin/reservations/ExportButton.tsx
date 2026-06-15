"use client";

import { Download } from "lucide-react";

export default function ExportButton({ q, status }: { q: string; status: string }) {
  function handleExport() {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    window.location.href = `/api/admin/export-csv?${params.toString()}`;
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-[#f0ece3]/60 hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-all duration-150 active:scale-[0.97]"
    >
      <Download size={14} />
      Exporter CSV
    </button>
  );
}
