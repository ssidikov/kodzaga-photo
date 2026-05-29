"use client";

import {
  Camera,
  Users,
  Sparkles,
  Star,
  PawPrint,
  Gift,
  Check,
  Clock,
  Video,
  Palette,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const SOLO_PACKS = [
  {
    icon: Camera,
    title: "Pack Essentiel",
    price: "175 €",
    features: ["1h de shooting", "15 photos retouchées"],
    notes: ["Idéal pour les réseaux"],
    highlighted: false,
  },
  {
    icon: Camera,
    title: "Pack Premium",
    price: "215 €",
    features: ["2h de shooting", "30 photos retouchées"],
    notes: ["Plusieurs tenues", "Plusieurs lieux"],
    highlighted: true,
    badge: "Le plus demandé",
  },
  {
    icon: Star,
    title: "Pack Signature",
    price: "275 €",
    features: ["3h de shooting", "50 photos retouchées", "Vidéos", "MUA"],
    notes: ["Comme une Star !"],
    highlighted: false,
  },
];

const GROUPE_PACKS = [
  {
    icon: Users,
    title: "Pack DUO",
    price: "255 €",
    features: ["2h de shooting", "Photos individuelles et en duo"],
    notes: ["Idéal couple / amis"],
    highlighted: false,
  },
  {
    icon: Users,
    title: "Pack TRIO",
    price: "295 €",
    features: ["3h de shooting", "Photos / Vidéos"],
    notes: ["Boys Band !", "Spice Girls !"],
    highlighted: true,
    badge: "Le plus demandé",
  },
  {
    icon: Users,
    title: "Pack Famille",
    price: "315 €",
    features: ["Photos / Vidéos", "Animaux de compagnie bienvenus"],
    notes: ["En mode Avengers !"],
    highlighted: false,
  },
];

const AUTRES_PACKS = [
  {
    icon: PawPrint,
    title: "Pack Animaux",
    price: "155 €",
    features: [
      "1h de shooting",
      "Plusieurs animaux possibles (3 max)",
      "Photos avec le propriétaire possibles",
    ],
    notes: ["Chiens / Chats / Chevaux sous les lumières !"],
    highlighted: false,
  },
  {
    icon: Sparkles,
    title: "Pack Personnalisable",
    price: "Sur devis",
    features: [
      "Projet artistique spécifique / Collaboration",
      "Durée et contenu adaptés",
      "Studio équipé",
    ],
    notes: ["Boys Band !", "Spice Girls !"],
    highlighted: false,
  },
  {
    icon: Gift,
    title: "Bon Cadeau",
    price: "Pack choisi",
    features: [
      "Amis / Famille",
      "Choisis le Pack de ton choix à offrir à tes proches !",
    ],
    notes: ["Idéal pour les fêtes !"],
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

interface Pack {
  icon: typeof Camera;
  title: string;
  price: string;
  features: string[];
  notes: string[];
  highlighted: boolean;
  badge?: string;
}

const handleChoosePack = (
  e: React.MouseEvent<HTMLAnchorElement>,
  packTitle: string
) => {
  e.preventDefault();
  if (typeof window === "undefined") return;

  const newUrl = `${window.location.pathname}?prestation=${encodeURIComponent(
    packTitle
  )}#contact`;
  window.history.pushState({}, "", newUrl);

  const event = new CustomEvent("prestation-change", { detail: packTitle });
  window.dispatchEvent(event);

  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
};

function PackGroup({
  title,
  packs,
  delayOffset,
}: {
  title: string;
  packs: Pack[];
  delayOffset: number;
}) {
  return (
    <div className="mb-20">
      <ScrollReveal>
        <h3 className="font-body text-xl font-semibold tracking-[0.25em] uppercase text-gold/45 mb-10">
          {title}
        </h3>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {packs.map((pack, i) => {
          const Icon = pack.icon;
          return (
            <ScrollReveal key={pack.title} delay={delayOffset + i * 70}>
              <div
                className={`price-card p-8 h-full flex flex-col justify-between ${
                  pack.highlighted ? "ring-1 ring-gold/30" : ""
                }`}
              >
                <div>
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

                  {/* Title */}
                  <h3 className="font-heading text-xl font-semibold text-cream mb-2">
                    {pack.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="font-heading text-3xl font-semibold gold-text">
                      {pack.price}
                    </span>
                    {pack.price !== "Sur devis" &&
                      pack.price !== "Pack choisi" && (
                        <span className="font-body text-[11px] text-cream/30">
                          / séance
                        </span>
                      )}
                  </div>

                  <div className="gold-divider mb-5 opacity-15" />

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8">
                    {pack.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check
                          className="w-3 h-3 flex-shrink-0 mt-1 text-gold"
                          strokeWidth={2.5}
                        />
                        <span className="font-body text-[12px] text-cream/50 font-light">
                          {feature}
                        </span>
                      </li>
                    ))}
                    {pack.notes.map((note) => (
                      <li key={note} className="flex items-start gap-2.5">
                        <span className="text-gold font-body text-[12px] select-none">
                          →
                        </span>
                        <span className="font-body text-[12px] text-gold/80 font-normal">
                          {note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={(e) => handleChoosePack(e, pack.title)}
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
    </div>
  );
}

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

      {/* Solo section */}
      <PackGroup title="Solo" packs={SOLO_PACKS} delayOffset={0} />

      <div className="gold-divider my-16 opacity-15" />

      {/* Groupe section */}
      <PackGroup title="Groupe" packs={GROUPE_PACKS} delayOffset={100} />

      <div className="gold-divider my-16 opacity-15" />

      {/* Autres packs section */}
      <PackGroup title="Autres packs" packs={AUTRES_PACKS} delayOffset={200} />

      <div className="gold-divider my-16 opacity-15" />

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
                  <Icon
                    className="w-5 h-5 text-gold/40 mx-auto mb-3"
                    strokeWidth={1.5}
                  />
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
