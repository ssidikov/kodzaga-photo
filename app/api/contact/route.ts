import { NextResponse } from "next/server";
import { sendClientConfirmation, sendAdminNotification, type ContactFormData } from "@/lib/email";

const OPTION_LABELS: Record<string, string> = {
  express: "Livraison Express 24h (+20€)",
  video: "Vidéo (+75€)",
  mua: "MUA ou Coiffeuse 2h (+75€)",
};

export async function POST(request: Request) {
  try {
    const body = await request.formData();

    const options: string[] = [];
    for (const key of Object.keys(OPTION_LABELS)) {
      if (body.get(`option-${key}`) === "on") {
        options.push(OPTION_LABELS[key]);
      }
    }

    const data: ContactFormData = {
      name: (body.get("name") as string) || "",
      email: (body.get("email") as string) || "",
      phone: (body.get("phone") as string) || "",
      prestation: (body.get("prestation") as string) || "",
      date: (body.get("date") as string) || "",
      lieu: (body.get("lieu") as string) || "",
      options,
      message: (body.get("message") as string) || "",
    };

    if (!data.name || !data.email || !data.prestation) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    await Promise.all([
      sendClientConfirmation(data),
      sendAdminNotification(data),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
