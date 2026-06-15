"use server";

import { getDb } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const statusSchema = z.enum(["new", "contacted", "confirmed", "completed", "cancelled"]);
const idSchema = z.string().uuid();
const notesSchema = z.string().max(5000);

export async function updateReservationStatus(id: string, status: string) {
  await requireAdminSession();
  const parsedId = idSchema.safeParse(id);
  const parsed = statusSchema.safeParse(status);
  if (!parsedId.success) throw new Error("Réservation invalide");
  if (!parsed.success) throw new Error("Statut invalide");

  const db = getDb();
  await db
    .update(reservations)
    .set({ status: parsed.data, updatedAt: new Date() })
    .where(eq(reservations.id, parsedId.data));

  revalidatePath(`/admin/reservations/${parsedId.data}`);
  revalidatePath("/admin/reservations");
  revalidatePath("/admin");
}

export async function updateReservationNotes(id: string, notes: string) {
  await requireAdminSession();
  const parsedId = idSchema.safeParse(id);
  const parsedNotes = notesSchema.safeParse(notes);
  if (!parsedId.success) throw new Error("Réservation invalide");
  if (!parsedNotes.success) throw new Error("Notes trop longues");

  const db = getDb();
  await db
    .update(reservations)
    .set({ notes: parsedNotes.data, updatedAt: new Date() })
    .where(eq(reservations.id, parsedId.data));

  revalidatePath(`/admin/reservations/${parsedId.data}`);
}

export async function deleteReservation(id: string) {
  await requireAdminSession();
  const parsedId = idSchema.safeParse(id);
  if (!parsedId.success) throw new Error("Réservation invalide");

  const db = getDb();
  await db.delete(reservations).where(eq(reservations.id, parsedId.data));

  redirect("/admin/reservations");
}
