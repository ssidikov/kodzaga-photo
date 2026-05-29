const NAV_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Contact", href: "#contact" },
];

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.6z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-heading text-xl italic gold-text mb-3">
              Alex Photos
            </p>
            <p className="font-body text-cream/30 text-[13px] font-light leading-relaxed">
              Directeur Artistique
              <br />
              Photographe & Vidéaste
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-cream/25 mb-4">
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-cream/40 text-[13px] hover:text-gold transition-colors duration-300 cursor-pointer w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-cream/25 mb-4">
              Réseaux sociaux
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/alex.photos"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-gold/10 flex items-center justify-center text-cream/30 hover:text-gold hover:border-gold/30 transition-all duration-300 cursor-pointer"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@alex.photos"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-gold/10 flex items-center justify-center text-cream/30 hover:text-gold hover:border-gold/30 transition-all duration-300 cursor-pointer"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-divider mb-8 opacity-10" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-cream text-[11px] font-light">
            © {new Date().getFullYear()} Alex Photos — Tous droits réservés
          </p>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="font-body text-cream text-[10px] font-light">
              Alexis Kodzaga · Directeur Artistique · Photographe · Vidéaste
            </p>
            <p className="font-body text-cream text-[10px] font-light">
              Site développé par{" "}
              <a
                href="https://www.sidikoff.com"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-text hover:underline transition-colors duration-300"
              >
                SIDIKOFF DIGITAL
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
