import { NextResponse } from "next/server";
import { sendClientConfirmation, sendAdminNotification, type ContactFormData } from "@/lib/email";
import { db } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { getOptionLabelsFromForm, validatePrestationName } from "@/lib/tariffs";

const formSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(300),
  phone: z.string().trim().max(50).optional(),
  prestation: z.string().trim().min(1).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  lieu: z.string().trim().max(300).optional(),
  message: z.string().trim().max(5000).optional(),
  honeypot: z.string().max(0).optional(),
});

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;

function getClientIp(request: Request) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limit = rateLimit(`contact:${ip}`, MAX_REQUESTS, WINDOW_MS);
  if (!limit.allowed) {
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
    const validPrestation = await validatePrestationName(prestation);
    if (!validPrestation) {
      return NextResponse.json(
        { error: "Prestation invalide" },
        { status: 400 }
      );
    }

    const options = await getOptionLabelsFromForm(body);

    // Save to DB first. Email failure must not lose reservation.
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
