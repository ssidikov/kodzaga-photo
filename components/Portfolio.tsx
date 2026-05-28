import { ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

/* Generate placeholder items for the marquee rows */
const ROW_1_COUNT = 32;
const ROW_2_COUNT = 32;

const row1Items = Array.from({ length: ROW_1_COUNT }, (_, i) => ({
  id: i + 1,
  alt: `Shooting ${i + 1}`,
}));

const row2Items = Array.from({ length: ROW_2_COUNT }, (_, i) => ({
  id: i + ROW_1_COUNT + 1,
  alt: `Shooting ${i + ROW_1_COUNT + 1}`,
}));

/* Gradient colors for placeholder images */
const gradients = [
  "from-blue/30 to-surface",
  "from-gold/20 to-surface",
  "from-blue-light/20 to-surface",
  "from-gold-dark/25 to-surface",
  "from-blue/20 to-gold/10",
  "from-surface-light to-surface",
  "from-blue/15 to-surface-light",
  "from-gold/15 to-blue/10",
];

function PlaceholderImage({
  index,
  size,
}: {
  index: number;
  size: "lg" | "sm";
}) {
  const gradient = gradients[index % gradients.length];
  const w = size === "lg" ? "w-56" : "w-44";
  const h = size === "lg" ? "h-[300px]" : "h-56";

  return (
    <div className={`flex-shrink-0 mx-2`}>
      <div
        className={`relative overflow-hidden bg-surface ${w} ${h} group cursor-pointer`}
      >
        {/* Placeholder gradient — replace with <img> when real photos are ready */}
        <div
          className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}
        >
          <span className="font-heading text-lg text-cream/10 select-none">
            {index + 1}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-300" />
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 overflow-hidden">
      {/* Section header */}
      <div className="px-6 md:px-14 mb-14">
        <ScrollReveal>
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/45 mb-4">
            Portfolio
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light">
            Mes <em className="gold-text">réalisations</em>
          </h2>
        </ScrollReveal>
      </div>

      {/* Marquee row 1 — scrolls left */}
      <div className="relative mb-5 overflow-hidden">
        <div className="flex animate-marquee">
          {/* Original set */}
          {row1Items.map((item, i) => (
            <PlaceholderImage key={`r1-a-${item.id}`} index={i} size="lg" />
          ))}
          {/* Duplicate for seamless loop */}
          {row1Items.map((item, i) => (
            <PlaceholderImage key={`r1-b-${item.id}`} index={i} size="lg" />
          ))}
        </div>
        <div className="edge-fade-l" />
        <div className="edge-fade-r" />
      </div>

      {/* Marquee row 2 — scrolls right (reverse) */}
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee-reverse">
          {/* Original set */}
          {row2Items.map((item, i) => (
            <PlaceholderImage key={`r2-a-${item.id}`} index={i} size="sm" />
          ))}
          {/* Duplicate for seamless loop */}
          {row2Items.map((item, i) => (
            <PlaceholderImage key={`r2-b-${item.id}`} index={i} size="sm" />
          ))}
        </div>
        <div className="edge-fade-l" />
        <div className="edge-fade-r" />
      </div>

      {/* Instagram link */}
      <div className="text-center mt-10">
        <ScrollReveal>
          <a
            href="https://instagram.com/alex.photos"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.3em] uppercase text-gold/45 hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            Voir tout le portfolio Instagram
            <ExternalLink className="w-3 h-3" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
