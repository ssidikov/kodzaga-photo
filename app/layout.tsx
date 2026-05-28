import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alex Photos | Directeur Artistique & Photographe",
  description:
    "Alexis Kodzaga — Directeur Artistique, Photographe et Vidéaste. Shootings photo professionnels : portrait, lifestyle, contrasté cinématographique. Réservez votre séance.",
  keywords: [
    "photographe",
    "directeur artistique",
    "shooting photo",
    "portrait",
    "lifestyle",
    "cinématographique",
    "Alexis Kodzaga",
    "Alex Photos",
  ],
  authors: [{ name: "Alexis Kodzaga" }],
  creator: "Alexis Kodzaga",
  openGraph: {
    title: "Alex Photos | Directeur Artistique & Photographe",
    description:
      "Shootings photo professionnels : portrait, lifestyle, contrasté cinématographique.",
    url: "https://alex-photos.fr",
    siteName: "Alex Photos",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Photos | Directeur Artistique & Photographe",
    description:
      "Shootings photo professionnels : portrait, lifestyle, contrasté cinématographique.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${bodoniModa.variable} ${jost.variable}`}>
      <head>
        <meta name="theme-color" content="#C9A84C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Alex Photos",
              description:
                "Directeur Artistique, Photographe et Vidéaste — Shootings professionnels",
              url: "https://alex-photos.fr",
              priceRange: "€€",
              address: {
                "@type": "PostalAddress",
                addressCountry: "FR",
              },
              sameAs: [
                "https://instagram.com/alex.photos",
                "https://tiktok.com/@alex.photos",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-bg text-cream font-body antialiased">
        <main className="relative overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
