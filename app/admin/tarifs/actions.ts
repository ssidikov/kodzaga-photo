"use server";

import { getDb } from "@/lib/db";
import { tariffGroups, tariffOptions, tariffPacks } from "@/lib/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { TARIFF_ICON_KEYS } from "@/lib/tariff-types";

const iconSchema = z.enum(TARIFF_ICON_KEYS);

function asBool(value: FormDataEntryValue | null) {
  return value === "on";
}

function asNumber(value: FormDataEntryValue | null) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function asLines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function refreshTariffs() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/tarifs");
}

const groupSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1).max(80),
  sortOrder: z.number().int().min(0).max(1000),
  active: z.boolean(),
});

export async function createTariffGroup(formData: FormData) {
  await requireAdminSession();

  const parsed = groupSchema.omit({ id: true }).safeParse({
    name: formData.get("name"),
    sortOrder: asNumber(formData.get("sortOrder")),
    active: asBool(formData.get("active")),
  });
  if (!parsed.success) throw new Error("Données invalides");

  const db = getDb();
  await db.insert(tariffGroups).values(parsed.data);
  refreshTariffs();
}

export async function updateTariffGroup(formData: FormData) {
  await requireAdminSession();

  const parsed = groupSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    sortOrder: asNumber(formData.get("sortOrder")),
    active: asBool(formData.get("active")),
  });
  if (!parsed.success || !parsed.data.id) throw new Error("Données invalides");

  const db = getDb();
  await db
    .update(tariffGroups)
    .set({
      name: parsed.data.name,
      sortOrder: parsed.data.sortOrder,
      active: parsed.data.active,
      updatedAt: new Date(),
    })
    .where(eq(tariffGroups.id, parsed.data.id));
  refreshTariffs();
}

const packSchema = z.object({
  id: z.string().uuid().optional(),
  groupId: z.string().uuid(),
  title: z.string().trim().min(1).max(120),
  price: z.string().trim().min(1).max(60),
  features: z.array(z.string().max(160)).max(12),
  notes: z.array(z.string().max(160)).max(12),
  badge: z.string().trim().max(80).nullable().optional(),
  icon: iconSchema,
  highlighted: z.boolean(),
  active: z.boolean(),
  sortOrder: z.number().int().min(0).max(1000),
});

export async function createTariffPack(formData: FormData) {
  await requireAdminSession();

  const parsed = packSchema.omit({ id: true }).safeParse({
    groupId: formData.get("groupId"),
    title: formData.get("title"),
    price: formData.get("price"),
    features: asLines(formData.get("features")),
    notes: asLines(formData.get("notes")),
    badge: String(formData.get("badge") ?? "").trim() || null,
    icon: formData.get("icon"),
    highlighted: asBool(formData.get("highlighted")),
    active: asBool(formData.get("active")),
    sortOrder: asNumber(formData.get("sortOrder")),
  });
  if (!parsed.success) throw new Error("Données invalides");

  const db = getDb();
  await db.insert(tariffPacks).values({
    ...parsed.data,
    badge: parsed.data.badge || null,
  });
  refreshTariffs();
}

export async function updateTariffPack(formData: FormData) {
  await requireAdminSession();

  const parsed = packSchema.safeParse({
    id: formData.get("id"),
    groupId: formData.get("groupId"),
    title: formData.get("title"),
    price: formData.get("price"),
    features: asLines(formData.get("features")),
    notes: asLines(formData.get("notes")),
    badge: String(formData.get("badge") ?? "").trim() || null,
    icon: formData.get("icon"),
    highlighted: asBool(formData.get("highlighted")),
    active: asBool(formData.get("active")),
    sortOrder: asNumber(formData.get("sortOrder")),
  });
  if (!parsed.success || !parsed.data.id) throw new Error("Données invalides");

  const db = getDb();
  await db
    .update(tariffPacks)
    .set({
      groupId: parsed.data.groupId,
      title: parsed.data.title,
      price: parsed.data.price,
      features: parsed.data.features,
      notes: parsed.data.notes,
      badge: parsed.data.badge || null,
      icon: parsed.data.icon,
      highlighted: parsed.data.highlighted,
      active: parsed.data.active,
      sortOrder: parsed.data.sortOrder,
      updatedAt: new Date(),
    })
    .where(eq(tariffPacks.id, parsed.data.id));
  refreshTariffs();
}

const optionSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().trim().min(1).max(120),
  detail: z.string().trim().max(160),
  price: z.string().trim().min(1).max(60),
  icon: iconSchema,
  active: z.boolean(),
  sortOrder: z.number().int().min(0).max(1000),
});

export async function createTariffOption(formData: FormData) {
  await requireAdminSession();

  const parsed = optionSchema.omit({ id: true }).safeParse({
    label: formData.get("label"),
    detail: formData.get("detail"),
    price: formData.get("price"),
    icon: formData.get("icon"),
    active: asBool(formData.get("active")),
    sortOrder: asNumber(formData.get("sortOrder")),
  });
  if (!parsed.success) throw new Error("Données invalides");

  const db = getDb();
  await db.insert(tariffOptions).values(parsed.data);
  refreshTariffs();
}

export async function updateTariffOption(formData: FormData) {
  await requireAdminSession();

  const parsed = optionSchema.safeParse({
    id: formData.get("id"),
    label: formData.get("label"),
    detail: formData.get("detail"),
    price: formData.get("price"),
    icon: formData.get("icon"),
    active: asBool(formData.get("active")),
    sortOrder: asNumber(formData.get("sortOrder")),
  });
  if (!parsed.success || !parsed.data.id) throw new Error("Données invalides");

  const db = getDb();
  await db
    .update(tariffOptions)
    .set({
      label: parsed.data.label,
      detail: parsed.data.detail,
      price: parsed.data.price,
      icon: parsed.data.icon,
      active: parsed.data.active,
      sortOrder: parsed.data.sortOrder,
      updatedAt: new Date(),
    })
    .where(eq(tariffOptions.id, parsed.data.id));
  refreshTariffs();
}
