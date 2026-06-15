"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./Sidebar";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar — mobile only */}
      <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-white/[0.06] bg-[#0a0d13] shrink-0">
        <p className="font-heading text-base font-light tracking-widest text-[#f0ece3]">
          AL3X <em className="text-[#C9A84C]">Photos</em>
        </p>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.06] text-[#f0ece3]/50 hover:text-[#f0ece3] hover:bg-white/[0.05] transition-all"
          aria-label="Ouvrir le menu"
        >
          <Menu size={18} />
        </button>
      </header>

      {/* Drawer overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Drawer */}
          <div
            className="relative w-72 max-w-[85vw] h-full bg-[#0a0d13] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.06] text-[#f0ece3]/40 hover:text-[#f0ece3] hover:bg-white/[0.05] transition-all"
              aria-label="Fermer le menu"
            >
              <X size={15} />
            </button>

            <AdminSidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
