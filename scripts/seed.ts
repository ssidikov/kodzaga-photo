import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  const email = "contact@al3x-photos.fr";
  const existing = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (existing.length > 0) {
    console.log("Admin user already exists, skipping.");
    return;
  }

  const passwordHash = await bcrypt.hash("Al26photo06&*2006", 12);

  await db.insert(schema.users).values({
    name: "Alexis Kodzaga",
    email,
    passwordHash,
    role: "admin",
  });

  console.log("Admin user created: contact@al3x-photos.fr");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
