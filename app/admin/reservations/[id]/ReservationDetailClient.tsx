"use client";

import { useState, useTransition } from "react";

const STATUSES = ["new", "contacted", "confirmed", "completed", "cancelled"];

type StatusVariant = "new" | "contacted" | "confirmed" | "completed" | "cancelled";

const STATUS_COLORS: Record<StatusVariant, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  contacted: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  completed: "bg-[#C9A84C]/15 text-[#C9A84C] border-[#C9A84C]/25",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/25",
};

interface Props {
  reservation: { id: string; status: string; notes: string };
  statusLabels: Record<string, string>;
  updateStatus: (id: string, status: string) => Promise<void>;
  updateNotes: (id: string, notes: string) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
}

export default function ReservationDetailClient({
  reservation,
  statusLabels,
  updateStatus,
  updateNotes,
  deleteAction,
}: Props) {
  const [status, setStatus] = useState(reservation.status);
  const [notes, setNotes] = useState(reservation.notes);
  const [notesSaved, setNotesSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(newStatus: string) {
    setStatus(newStatus);
    startTransition(async () => {
      await updateStatus(reservation.id, newStatus);
    });
  }

  function handleSaveNotes() {
    startTransition(async () => {
      await updateNotes(reservation.id, notes);
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteAction(reservation.id);
    });
  }

  return (
    <div className="space-y-4">
      {/* Status */}
      <div className="rounded-xl border border-white/[0.06] bg-[#0d1117] p-5">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#f0ece3]/30 mb-3">
          Statut
        </p>
        <div className="space-y-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              disabled={isPending}
              className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                status === s
                  ? STATUS_COLORS[s as StatusVariant]
                  : "border-white/[0.06] text-[#f0ece3]/40 hover:bg-white/[0.04] hover:text-[#f0ece3]/70"
              } disabled:opacity-50`}
            >
              {statusLabels[s] ?? s}
              {status === s && (
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-xl border border-white/[0.06] bg-[#0d1117] p-5">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#f0ece3]/30 mb-3">
          Notes internes
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          placeholder="Notes privées sur ce client..."
          className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[#f0ece3] placeholder:text-[#f0ece3]/20 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 resize-none transition-colors"
        />
        <button
          onClick={handleSaveNotes}
          disabled={isPending}
          className="mt-2 w-full h-8 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-medium text-[#f0ece3]/60 hover:text-[#f0ece3] hover:bg-white/[0.09] transition-all disabled:opacity-50"
        >
          {notesSaved ? "Sauvegardé ✓" : "Sauvegarder"}
        </button>
      </div>

      {/* Danger zone */}
      <div className="rounded-xl border border-red-500/15 bg-red-500/[0.03] p-5">
        <p className="text-[10px] uppercase tracking-[0.12em] text-red-400/60 mb-3">
          Zone dangereuse
        </p>
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-full h-8 rounded-lg border border-red-500/25 text-xs font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            Supprimer cette réservation
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-red-400/80">Confirmer la suppression ?</p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 h-8 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
              >
                Supprimer
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 h-8 rounded-lg border border-white/10 text-xs text-[#f0ece3]/50 hover:text-[#f0ece3] transition-all"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
