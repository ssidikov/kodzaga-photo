import { Camera, Users, Sparkles, Check, Clock, Video, Palette } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const PACKS = [
  {
    icon: Camera,
    title: "Solo",
    description:
      "Shooting individuel en extérieur ou intérieur. Portrait, lifestyle, mode.",
    price: "150€",
    priceLabel: "/ séance",
    features: [
      "1h de shooting",
      "10 photos retouchées",
      "Intérieur ou extérieur",
      "Livraison sous 3 jours",
    ],
    highlighted: false,
  },
  {
    icon: Users,
    title: "Groupe",
    description:
      "Shooting duo ou groupe. Parfait pour couples, amis, familles ou équipes.",
    price: "250€",
    priceLabel: "/ séance",
    features: [
      "2h de shooting",
      "20 photos retouchées",
      "Jusqu'à 4 personnes",
      "Vidéo backstage incluse",
      "Livraison sous 3 jours",
    ],
    highlighted: true,
    badge: "Le plus demandé",
  },
  {
    icon: Sparkles,
    title: "Autres Packs",
    description:
      "Événements, marques, corporate, éditoriaux. Chaque projet est unique.",
    price: "Sur devis",
    priceLabel: "",
    features: [
      "Durée personnalisée",
      "Direction Artistique incluse",
      "Photos + vidéo sur-mesure",
      "Devis gratuit sous 48h",
    ],
    highlighted: false,
  },
];

const OPTIONS = [
  {
    icon: Clock,
    label: "Livraison Express en 24h",
    detail: "au lieu de 3 jours ouvrés",
    price: "20 €",
  },
  {
    icon: Video,
    label: "Vidéo",
    detail: "pour les packs sans vidéo incluse",
    price: "75 €",
  },
  {
    icon: Palette,
    label: "MUA ou Coiffeuse",
    detail: "2h de prestation beauté",
    price: "75 €",
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="py-32 px-6 md:px-14 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-20">
        <ScrollReveal>
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/45 mb-4">
            Investissement
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light mb-5">
            Les <em className="gold-text">prestations</em>
          </h2>
          <p className="font-body text-cream/30 text-sm font-light">
            Shootings Photo Pro — Extérieur — Intérieur
          </p>
        </ScrollReveal>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
        {PACKS.map((pack, i) => {
          const Icon = pack.icon;
          return (
            <ScrollReveal key={pack.title} delay={i * 70}>
              <div
                className={`price-card p-8 h-full ${
                  pack.highlighted ? "ring-1 ring-gold/30" : ""
                }`}
              >
                {/* Badge */}
                {pack.highlighted && pack.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-noir text-[9px] tracking-[0.2em] uppercase font-bold font-body px-4 py-1 rounded-full whitespace-nowrap">
                    {pack.badge}
                  </div>
                )}

                {/* Icon */}
                <div className="mb-5">
                  <Icon className="w-6 h-6 text-gold/60" strokeWidth={1.5} />
                </div>

                {/* Title & description */}
                <h3 className="font-heading text-xl font-semibold text-cream mb-2">
                  {pack.title}
                </h3>
                <p className="font-body text-cream/30 text-[12.5px] font-light leading-relaxed mb-6">
                  {pack.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="font-heading text-3xl font-semibold gold-text">
                    {pack.price}
                  </span>
                  {pack.priceLabel && (
                    <span className="font-body text-[11px] text-cream/30">
                      {pack.priceLabel}
                    </span>
                  )}
                </div>

                <div className="gold-divider mb-5 opacity-15" />

                {/* Features */}
                <ul className="space-y-2.5 mb-8">
                  {pack.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="w-3 h-3 flex-shrink-0 mt-1 text-gold" strokeWidth={2.5} />
                      <span className="font-body text-[12px] text-cream/50 font-light">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`block text-center py-3 text-[11px] tracking-[0.2em] uppercase font-body font-medium transition-all duration-300 cursor-pointer ${
                    pack.highlighted
                      ? "btn-gold w-full justify-center"
                      : "border border-gold/15 hover:border-gold/40 text-cream/40 hover:text-gold/70"
                  }`}
                >
                  Réserver
                </a>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Options extras */}
      <ScrollReveal>
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading text-xl font-light text-center mb-8">
            Options <em className="gold-text">à la carte</em>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <div
                  key={opt.label}
                  className="bg-surface border border-gold/[0.06] p-5 text-center"
                >
                  <Icon className="w-5 h-5 text-gold/40 mx-auto mb-3" strokeWidth={1.5} />
                  <p className="font-body text-cream/60 text-[12px] font-medium mb-1">
                    {opt.label}
                  </p>
                  <p className="font-body text-cream/25 text-[11px] font-light mb-3">
                    {opt.detail}
                  </p>
                  <p className="font-heading text-lg gold-text font-semibold">
                    {opt.price}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Payment info */}
          <div className="bg-surface/50 border border-gold/[0.08] p-6 text-center">
            <p className="font-body text-[11px] tracking-[0.3em] uppercase text-gold/40 mb-3">
              Information Paiement
            </p>
            <p className="font-body text-cream/50 text-sm font-light">
              <span className="gold-text font-medium">30%</span> du paiement à
              la confirmation de la réservation
            </p>
            <p className="font-body text-cream/50 text-sm font-light">
              <span className="gold-text font-medium">70%</span> restant maximum
              le jour de la prestation
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
