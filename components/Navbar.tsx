"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "À propos", href: "/#about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isOpen ? "h-screen bg-transparent" : "h-[68px]"
      } ${
        isOpen ? "" : (scrolled ? "nav-blur" : "bg-transparent")
      }`}
    >
      {/* Header bar content wrapper */}
      <div className="w-full h-[68px] flex items-center justify-between px-6 md:px-14">
        {/* Logo */}
        <a
          href="/"
          className="font-heading text-xl italic text-cream hover:text-gold transition-colors duration-300 cursor-pointer z-50"
        >
          Alexis Kodzaga
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8 font-body text-[11px] tracking-[0.22em] uppercase text-cream/40">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="/#contact" className="hidden md:inline-flex btn-gold py-2.5 px-5 text-[10px]">
          Réserver
          <ArrowRight className="w-3 h-3" />
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cream/60 hover:text-gold transition-colors cursor-pointer z-50"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-bg/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <div
            key={link.href}
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isOpen ? `${i * 75}ms` : "0ms" }}
          >
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-heading text-2xl text-cream/60 hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              {link.label}
            </a>
          </div>
        ))}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isOpen ? `${NAV_LINKS.length * 75}ms` : "0ms" }}
        >
          <a
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="btn-gold mt-4"
          >
            Réserver un shooting
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
