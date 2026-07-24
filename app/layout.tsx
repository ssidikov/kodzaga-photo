import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, Jost } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni-moda',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const viewport: Viewport = {
  themeColor: '#C9A84C',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://al3x-photos.fr'),
  title: 'Alex Photos | Directeur Artistique & Photographe',
  description:
    'Alexis Kodzaga — Directeur Artistique, Photographe et Vidéaste. Shootings photo professionnels : portrait, lifestyle, contrasté cinématographique. Réservez votre séance.',
  keywords: [
    'photographe',
    'directeur artistique',
    'shooting photo',
    'portrait',
    'lifestyle',
    'cinématographique',
    'Alexis Kodzaga',
    'Alex Photos',
  ],
  authors: [{ name: 'Alexis Kodzaga' }],
  creator: 'Alexis Kodzaga',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Alex Photos | Directeur Artistique & Photographe',
    description:
      'Shootings photo professionnels : portrait, lifestyle, contrasté cinématographique.',
    url: 'https://al3x-photos.fr',
    siteName: 'Alex Photos',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://pub-b0039a11c59a45d1846d6ff5e26b11d0.r2.dev/images/hero-bg.webp',
        width: 1200,
        height: 630,
        alt: 'Alex Photos | Directeur Artistique & Photographe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Photos | Directeur Artistique & Photographe',
    description:
      'Shootings photo professionnels : portrait, lifestyle, contrasté cinématographique.',
    images: ['https://pub-b0039a11c59a45d1846d6ff5e26b11d0.r2.dev/images/hero-bg.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Alex Photos',
    image: 'https://pub-b0039a11c59a45d1846d6ff5e26b11d0.r2.dev/images/alexis-kodzaga.jpg',
    description: 'Directeur Artistique, Photographe et Vidéaste — Shootings professionnels',
    url: 'https://al3x-photos.fr',
    priceRange: '€€',
    founder: {
      '@type': 'Person',
      name: 'Alexis Kodzaga',
      jobTitle: 'Directeur Artistique & Photographe',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
    },
    knowsAbout: [
      'Photographie',
      'Direction Artistique',
      'Vidéos Publicitaires',
      'Portrait Lifestyle',
    ],
    sameAs: ['https://instagram.com/al3xis.kdz', 'https://www.tiktok.com/@al3x.photos'],
  }

  return (
    <html lang='fr' className={`${bodoniModa.variable} ${jost.variable}`}>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className='bg-bg text-cream font-body antialiased'>
        <main className='relative overflow-x-hidden'>{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
