import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reservations = pgTable("reservations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  prestation: text("prestation").notNull(),
  date: text("date"),
  lieu: text("lieu"),
  options: jsonb("options").$type<string[]>().default([]),
  message: text("message"),
  status: text("status").notNull().default("new"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const tariffGroups = pgTable("tariff_groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const tariffPacks = pgTable("tariff_packs", {
  id: uuid("id").primaryKey().defaultRandom(),
  groupId: uuid("group_id").notNull().references(() => tariffGroups.id, {
    onDelete: "cascade",
  }),
  title: text("title").notNull(),
  price: text("price").notNull(),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  notes: jsonb("notes").$type<string[]>().notNull().default([]),
  badge: text("badge"),
  icon: text("icon").notNull().default("camera"),
  highlighted: boolean("highlighted").notNull().default(false),
  active: boolean("active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const tariffOptions = pgTable("tariff_options", {
  id: uuid("id").primaryKey().defaultRandom(),
  label: text("label").notNull(),
  detail: text("detail").notNull().default(""),
  price: text("price").notNull(),
  icon: text("icon").notNull().default("clock"),
  active: boolean("active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type Reservation = typeof reservations.$inferSelect;
export type NewReservation = typeof reservations.$inferInsert;
export type ReservationStatus = "new" | "contacted" | "confirmed" | "completed" | "cancelled";
export type TariffGroup = typeof tariffGroups.$inferSelect;
export type NewTariffGroup = typeof tariffGroups.$inferInsert;
export type TariffPack = typeof tariffPacks.$inferSelect;
export type NewTariffPack = typeof tariffPacks.$inferInsert;
export type TariffOption = typeof tariffOptions.$inferSelect;
export type NewTariffOption = typeof tariffOptions.$inferInsert;
