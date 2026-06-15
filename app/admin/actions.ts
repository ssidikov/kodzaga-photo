"use server";

import { db } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdminSession } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const updateStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "confirmed", "completed", "cancelled"]),
});

export async function updateReservationStatus(formData: FormData) {
  await requireAdminSession();

  const parsed = updateStatusSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) throw new Error("Invalid data");

  await db
    .update(reservations)
    .set({ status: parsed.data.status, updatedAt: new Date() })
    .where(eq(reservations.id, parsed.data.id));

  revalidatePath(`/admin/reservations/${parsed.data.id}`);
  revalidatePath("/admin/reservations");
  revalidatePath("/admin");
}

const updateNotesSchema = z.object({
  id: z.string().uuid(),
  notes: z.string().max(5000),
});

export async function updateReservationNotes(formData: FormData) {
  await requireAdminSession();

  const parsed = updateNotesSchema.safeParse({
    id: formData.get("id"),
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) throw new Error("Invalid data");

  await db
    .update(reservations)
    .set({ notes: parsed.data.notes, updatedAt: new Date() })
    .where(eq(reservations.id, parsed.data.id));

  revalidatePath(`/admin/reservations/${parsed.data.id}`);
}

const deleteSchema = z.object({
  id: z.string().uuid(),
});

export async function deleteReservation(formData: FormData) {
  await requireAdminSession();

  const parsed = deleteSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) throw new Error("Invalid data");

  await db.delete(reservations).where(eq(reservations.id, parsed.data.id));

  revalidatePath("/admin/reservations");
  revalidatePath("/admin");
  redirect("/admin/reservations");
}
