import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function createDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required before using the database");
  }

  return drizzle(neon(databaseUrl), { schema });
}

let cachedDb: ReturnType<typeof createDb> | null = null;

export function getDb() {
  cachedDb ??= createDb();
  return cachedDb;
}
