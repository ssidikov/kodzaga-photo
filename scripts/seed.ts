import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(12),
  ADMIN_NAME: z.string().min(1).default("Admin"),
});

async function seed() {
  const env = envSchema.parse(process.env);
  const email = env.ADMIN_EMAIL.toLowerCase();
  const sql = neon(env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  const existing = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (existing.length > 0) {
    console.log("Admin user already exists, skipping.");
    return;
  }

  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);

  await db.insert(schema.users).values({
    name: env.ADMIN_NAME,
    email,
    passwordHash,
    role: "admin",
  });

  console.log(`Admin user created: ${email}`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
