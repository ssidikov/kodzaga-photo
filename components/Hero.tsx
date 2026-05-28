import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial gold glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 60%)",
          }}
        />
        {/* Blue accent glow */}
        <div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(46,92,154,0.06) 0%, transparent 70%)",
          }}
        />
        {/* Top line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        {/* Bottom line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/8 to-transparent" />
      </div>

      {/* Logo circle */}
      <div className="mb-10 animate-fade-in">
        <div className="relative overflow-hidden bg-surface flex items-center justify-center w-28 h-28 rounded-full border border-gold/20 mx-auto shadow-[0_0_40px_rgba(201,168,76,0.1)]">
          {/* Placeholder logo — replace with actual logo image */}
          <span className="font-heading text-3xl font-semibold gold-text">
            AK
          </span>
        </div>
      </div>

      {/* Eyebrow */}
      <p
        className="font-body text-[10px] tracking-[0.6em] uppercase text-gold/55 mb-8 animate-slide-up"
        style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
      >
        Directeur Artistique · Photographe · Vidéaste
      </p>

      {/* Main title */}
      <h1 className="font-heading leading-none mb-6">
        <span
          className="block text-[clamp(4.5rem,13vw,10rem)] font-semibold gold-shimmer animate-fade-in"
          style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
        >
          Alex
        </span>
        <span
          className="block text-[clamp(1.6rem,4.5vw,3.5rem)] italic text-cream/20 font-light tracking-[0.35em] -mt-2 animate-fade-in"
          style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
        >
          Photos
        </span>
      </h1>

      {/* Divider */}
      <div
        className="w-12 gold-divider my-7 mx-auto opacity-35 animate-fade-in"
        style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}
      />

      {/* Subtitle */}
      <p
        className="font-body text-cream/45 font-light text-[15px] md:text-base leading-[1.9] max-w-lg mb-12 animate-slide-up"
        style={{ animationDelay: "0.7s", animationFillMode: "backwards" }}
      >
        Portrait Lifestyle et contrasté cinématographique.
        <br />
        Sublimez votre image avec une direction artistique sur-mesure.
      </p>

      {/* CTAs */}
      <div
        className="flex flex-col sm:flex-row gap-4 items-center animate-slide-up"
        style={{ animationDelay: "0.9s", animationFillMode: "backwards" }}
      >
        <a href="#contact" className="btn-gold">
          Réserver un shooting
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <a
          href="#portfolio"
          className="font-body text-[11px] tracking-[0.3em] uppercase text-cream/30 hover:text-gold/70 transition-colors flex items-center gap-2 cursor-pointer"
        >
          Voir le portfolio
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/30 to-transparent mx-auto animate-scroll-line" />
      </div>
    </section>
  );
}
