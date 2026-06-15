import { NextResponse } from "next/server";
import { sendClientConfirmation, sendAdminNotification, type ContactFormData } from "@/lib/email";
import { db } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { z } from "zod";

const OPTION_LABELS: Record<string, string> = {
  express: "Livraison Express 24h (+20€)",
  video: "Vidéo (+75€)",
  mua: "MUA ou Coiffeuse 2h (+75€)",
};

const PRESTATIONS = [
  "Pack Essentiel",
  "Pack Premium",
  "Pack Signature",
  "Pack DUO",
  "Pack TRIO",
  "Pack Famille",
  "Pack Animaux",
  "Pack Personnalisable",
  "Bon Cadeau",
] as const;

const formSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(300),
  phone: z.string().max(50).optional(),
  prestation: z.enum(PRESTATIONS),
  date: z.string().max(20).optional(),
  lieu: z.string().max(300).optional(),
  message: z.string().max(5000).optional(),
  honeypot: z.string().max(0).optional(),
});

// In-memory rate limiter: IP → [timestamps]
const rateMap = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = (rateMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_REQUESTS) return true;
  times.push(now);
  rateMap.set(ip, times);
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessayez dans une minute." },
      { status: 429 }
    );
  }

  try {
    const body = await request.formData();

    // Honeypot check — bots fill hidden fields
    if (body.get("website")) {
      return NextResponse.json({ success: true });
    }

    const options: string[] = [];
    for (const key of Object.keys(OPTION_LABELS)) {
      if (body.get(`option-${key}`) === "on") {
        options.push(OPTION_LABELS[key]);
      }
    }

    const raw = {
      name: (body.get("name") as string) || "",
      email: (body.get("email") as string) || "",
      phone: (body.get("phone") as string) || undefined,
      prestation: (body.get("prestation") as string) || "",
      date: (body.get("date") as string) || undefined,
      lieu: (body.get("lieu") as string) || undefined,
      message: (body.get("message") as string) || undefined,
      honeypot: (body.get("website") as string) || undefined,
    };

    const parsed = formSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 }
      );
    }

    const { name, email, phone, prestation, date, lieu, message } = parsed.data;

    // Save to DB first — email failure won't lose the reservation
    await db.insert(reservations).values({
      name,
      email,
      phone: phone || null,
      prestation,
      date: date || null,
      lieu: lieu || null,
      options,
      message: message || null,
      status: "new",
    });

    const emailData: ContactFormData = {
      name,
      email,
      phone: phone ?? "",
      prestation,
      date: date ?? "",
      lieu: lieu ?? "",
      options,
      message: message ?? "",
    };

    // Fire emails but don't fail the request if they error
    await Promise.allSettled([
      sendClientConfirmation(emailData),
      sendAdminNotification(emailData),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
