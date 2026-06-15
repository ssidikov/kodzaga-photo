"use server";

import { db } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
}

const statusSchema = z.enum(["new", "contacted", "confirmed", "completed", "cancelled"]);

export async function updateReservationStatus(id: string, status: string) {
  await requireAdmin();
  const parsed = statusSchema.safeParse(status);
  if (!parsed.success) throw new Error("Statut invalide");

  await db
    .update(reservations)
    .set({ status: parsed.data, updatedAt: new Date() })
    .where(eq(reservations.id, id));

  revalidatePath(`/admin/reservations/${id}`);
  revalidatePath("/admin/reservations");
  revalidatePath("/admin");
}

export async function updateReservationNotes(id: string, notes: string) {
  await requireAdmin();
  if (notes.length > 2000) throw new Error("Notes trop longues");

  await db
    .update(reservations)
    .set({ notes, updatedAt: new Date() })
    .where(eq(reservations.id, id));

  revalidatePath(`/admin/reservations/${id}`);
}

export async function deleteReservation(id: string) {
  await requireAdmin();

  await db.delete(reservations).where(eq(reservations.id, id));

  redirect("/admin/reservations");
}
