"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { imageUrl } from "./image-url";
import ScrollReveal from "./ScrollReveal";

const images = [
  "Artistique-2.webp",
  "Bruna-série-finale-26.webp",
  "Bruna-série-finale-29.webp",
  "Bruna-série-finale-5.webp",
  "Bruna-série-finale-7.webp",
  "Bucky-24.webp",
  "Bucky-30.webp",
  "Bucky-6.webp",
  "Deuxième-Last-série-13.webp",
  "Deuxième-série-14.webp",
  "Deuxième-série-24.webp",
  "Deuxième-série-5.webp",
  "Dolunay-24.webp",
  "Dolunay-30.webp",
  "Dolunay-35.webp",
  "Dolunay-4.webp",
  "Fond-blanc-1.webp",
  "Fond-blanc-17.webp",
  "Ianaya-&-Alexandra-série-finale-25.webp",
  "Ianaya-&-Alexandra-série-finale-8.webp",
  "Ianaya-&-Alexandra.webp",
  "Kawthar-14-04-7.webp",
  "Kawthar-2-8.webp",
  "Kim-Bas-Troca-15.webp",
  "Kim-Haut-Troca-10.webp",
  "Kim-Haut-Troca-5.webp",
  "Kim-Louvre-10.webp",
  "Lola-Buren-2.webp",
  "Lola-12.webp",
  "Lola-14.webp",
  "Lucie-Première-série.webp",
  "Marie-série-finale-12.webp",
  "Marie-série-finale-31.webp",
  "Marie-série-finale-32.webp",
  "Marie-série-finale-34.webp",
  "Marie-série-finale-41.webp",
  "Nicol-Diva-5.webp",
  "Nicol-Diva-6.webp",
  "Nicol-Porte-rouge-10.webp",
  "Nicol-Végétation-18.webp",
  "Première-&-Deuxième-série-22.webp",
  "Première-&-Deuxième-série-25.webp",
  "Première-série-19.webp",
  "Première-série-21.webp",
  "Première-série-2.webp",
  "Première-série.webp",
  "Ruelle.webp",
  "SHO04514-2.webp",
  "SHO04518.webp",
  "SHO04694.webp",
  "SHO06430.webp",
  "SHO06610.webp",
  "SHO09624.webp",
  "Série-2-16.webp",
  "Série-2-6.webp",
  "Trio-17.webp",
  "Trio-22.webp",
  "Trio.webp",
  "Troisième-série-7.webp",
  "Troisième-série.webp",
  "Végétal-3.webp",
  "WORK-2.webp",
];

const row1 = images.slice(0, 31);
const row2 = images.slice(31);

function GalleryImage({
  src,
  alt,
  size,
  visible,
}: {
  src: string;
  alt: string;
  size: "lg" | "sm";
  visible: boolean;
}) {
  const w = size === "lg" ? "w-56" : "w-44";
  const h = size === "lg" ? "h-[300px]" : "h-56";

  return (
    <div className="flex-shrink-0 mx-2">
      <div className={`relative overflow-hidden bg-surface ${w} ${h} group cursor-pointer`}>
        {visible && (
          <Image
            src={imageUrl(src)}
            alt={alt}
            fill
            sizes="(max-width: 768px) 176px, 224px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-300" />
      </div>
    </div>
  );
}

function useMobileMarquee(
  ref: React.RefObject<HTMLDivElement | null>,
  speed: number,
  direction: "left" | "right",
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;

    const container = ref.current;
    if (!container) return;

    let animationFrameId: number;
    let isInteracting = false;
    let lastTime = performance.now();
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const halfWidth = container.scrollWidth / 2;
      if (halfWidth <= 0) return;

      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += halfWidth;
      }
    };

    const handleTouchStart = () => {
      isInteracting = true;
      clearTimeout(timeoutId);
    };

    const handleTouchEnd = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isInteracting = false;
        lastTime = performance.now();
      }, 1000);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("mousedown", handleTouchStart, { passive: true });
    container.addEventListener("mouseup", handleTouchEnd, { passive: true });

    // Initial position wrapper
    const halfWidth = container.scrollWidth / 2;
    if (direction === "right" && container.scrollLeft === 0 && halfWidth > 0) {
      container.scrollLeft = halfWidth;
    }

    const step = (time: number) => {
      if (!isInteracting) {
        const delta = (time - lastTime) / 1000;
        const dirMultiplier = direction === "left" ? 1 : -1;
        container.scrollLeft += speed * delta * dirMultiplier;

        // Double check wrap inside animation frame
        const currentHalfWidth = container.scrollWidth / 2;
        if (currentHalfWidth > 0) {
          if (container.scrollLeft >= currentHalfWidth) {
            container.scrollLeft -= currentHalfWidth;
          } else if (container.scrollLeft <= 0) {
            container.scrollLeft += currentHalfWidth;
          }
        }
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(step);
    };

    const startTimeout = setTimeout(() => {
      const currentHalfWidth = container.scrollWidth / 2;
      if (direction === "right" && container.scrollLeft === 0 && currentHalfWidth > 0) {
        container.scrollLeft = currentHalfWidth;
      }
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(step);
    }, 100);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("mousedown", handleTouchStart);
      container.removeEventListener("mouseup", handleTouchEnd);
    };
  }, [ref, speed, direction, enabled]);
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMobileMarquee(row1Ref, 140, "left", isMobile);
  useMobileMarquee(row2Ref, 160, "right", isMobile);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="section-bg scroll-mt-[68px] py-32 overflow-hidden"
    >
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

      {/* Row 1 — scrolls left */}
      <div className="relative mb-5 overflow-hidden">
        <div
          ref={row1Ref}
          className="flex w-full overflow-x-auto scrollbar-none md:w-max md:overflow-x-visible md:animate-marquee"
        >
          {row1.map((src) => (
            <GalleryImage key={`r1-a-${src}`} src={src} alt={src.replace(".webp", "")} size="lg" visible={visible} />
          ))}
          {row1.map((src) => (
            <GalleryImage key={`r1-b-${src}`} src={src} alt={src.replace(".webp", "")} size="lg" visible={visible} />
          ))}
        </div>
        <div className="edge-fade-l" />
        <div className="edge-fade-r" />
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative overflow-hidden">
        <div
          ref={row2Ref}
          className="flex w-full overflow-x-auto scrollbar-none md:w-max md:overflow-x-visible md:animate-marquee-reverse"
        >
          {row2.map((src) => (
            <GalleryImage key={`r2-a-${src}`} src={src} alt={src.replace(".webp", "")} size="sm" visible={visible} />
          ))}
          {row2.map((src) => (
            <GalleryImage key={`r2-b-${src}`} src={src} alt={src.replace(".webp", "")} size="sm" visible={visible} />
          ))}
        </div>
        <div className="edge-fade-l" />
        <div className="edge-fade-r" />
      </div>

      <div className="text-center mt-10">
        <ScrollReveal>
          <a
            href="https://instagram.com/al3xis.kdz"
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

