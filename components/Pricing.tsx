'use client'

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
} from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import type { TariffCatalog, TariffIconKey, TariffPackView } from '@/lib/tariffs'

const ICONS: Record<TariffIconKey, typeof Camera> = {
  camera: Camera,
  users: Users,
  sparkles: Sparkles,
  star: Star,
  paw: PawPrint,
  gift: Gift,
  clock: Clock,
  video: Video,
  palette: Palette,
}

const handleChoosePack = (e: React.MouseEvent<HTMLAnchorElement>, packTitle: string) => {
  e.preventDefault()
  if (typeof window === 'undefined') return

  const newUrl = `${window.location.pathname}?prestation=${encodeURIComponent(packTitle)}#contact`
  window.history.pushState({}, '', newUrl)

  const event = new CustomEvent('prestation-change', { detail: packTitle })
  window.dispatchEvent(event)

  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}

function PackGroup({
  title,
  packs,
  delayOffset,
}: {
  title: string
  packs: TariffPackView[]
  delayOffset: number
}) {
  if (packs.length === 0) return null

  return (
    <div className='mb-20'>
      <ScrollReveal>
        <h3 className='font-body text-xl font-semibold tracking-[0.25em] uppercase text-gold/45 mb-10'>
          {title}
        </h3>
      </ScrollReveal>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {packs.map((pack, i) => {
          const Icon = ICONS[pack.icon] ?? Camera
          return (
            <ScrollReveal key={pack.title} delay={delayOffset + i * 70}>
              <div
                className={`price-card p-8 h-full flex flex-col justify-between ${
                  pack.highlighted ? 'ring-1 ring-gold/30' : ''
                }`}>
                <div>
                  {/* Badge */}
                  {pack.highlighted && pack.badge && (
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-noir text-[9px] tracking-[0.2em] uppercase font-bold font-body px-4 py-1 rounded-full whitespace-nowrap'>
                      {pack.badge}
                    </div>
                  )}

                  {/* Icon */}
                  <div className='mb-5'>
                    <Icon className='w-6 h-6 text-gold/60' strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className='font-heading text-xl font-semibold text-cream mb-2'>
                    {pack.title}
                  </h3>

                  {/* Price */}
                  <div className='flex items-baseline gap-2 mb-5'>
                    <span className='font-heading text-3xl font-semibold gold-text'>
                      {pack.price}
                    </span>
                    {pack.price !== 'Sur devis' && pack.price !== 'Pack choisi' && (
                      <span className='font-body text-[11px] text-cream/30'>/ séance</span>
                    )}
                  </div>

                  <div className='gold-divider mb-5 opacity-15' />

                  {/* Features */}
                  <ul className='space-y-2.5 mb-8'>
                    {pack.features.map((feature) => (
                      <li key={feature} className='flex items-start gap-2.5'>
                        <Check className='w-3 h-3 flex-shrink-0 mt-1 text-gold' strokeWidth={2.5} />
                        <span className='font-body text-[12px] text-cream/50 font-light'>
                          {feature}
                        </span>
                      </li>
                    ))}
                    {pack.notes.map((note) => (
                      <li key={note} className='flex items-start gap-2.5'>
                        <span className='text-gold font-body text-[12px] select-none'>→</span>
                        <span className='font-body text-[12px] text-gold/80 font-normal'>
                          {note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href='#contact'
                  onClick={(e) => handleChoosePack(e, pack.title)}
                  className={`block text-center py-3 text-[11px] tracking-[0.2em] uppercase font-body font-medium transition-all duration-300 cursor-pointer ${
                    pack.highlighted
                      ? 'btn-gold w-full justify-center'
                      : 'border border-gold/15 hover:border-gold/40 text-cream/40 hover:text-gold/70'
                  }`}>
                  Réserver
                </a>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}

export default function Pricing({ catalog }: { catalog: TariffCatalog }) {
  return (
    <section id='tarifs' className='section-bg scroll-mt-[68px] py-32'>
      <div className='relative z-10 px-6 md:px-14 max-w-7xl mx-auto'>
        {/* Section header */}
        <div className='text-center mb-20'>
          <ScrollReveal>
            <p className='font-body text-[10px] tracking-[0.5em] uppercase text-gold/45 mb-4'>
              Shootings Photos
            </p>
            <h2 className='font-heading text-4xl md:text-5xl font-light mb-5'>
              Les <em className='gold-text'>prestations</em>
            </h2>
            <p className='font-body text-cream/30 text-sm font-light'>
              Extérieur - Intérieur - Studio
            </p>
          </ScrollReveal>
        </div>

        {catalog.groups.map((group, index) => (
          <div key={group.id}>
            <PackGroup title={group.name} packs={group.packs} delayOffset={index * 100} />
            {index < catalog.groups.length - 1 && <div className='gold-divider my-16 opacity-15' />}
          </div>
        ))}

        {catalog.options.length > 0 && <div className='gold-divider my-16 opacity-15' />}

        {/* Options extras */}
        {catalog.options.length > 0 && (
          <ScrollReveal>
            <div className='max-w-3xl mx-auto'>
              <h3 className='font-heading text-xl font-light text-center mb-8'>
                Options <em className='gold-text'>à la carte</em>
              </h3>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'>
                {catalog.options.map((opt) => {
                  const Icon = ICONS[opt.icon] ?? Clock
                  return (
                    <div
                      key={opt.label}
                      className='bg-surface border border-gold/[0.06] p-5 text-center'>
                      <Icon className='w-5 h-5 text-gold/40 mx-auto mb-3' strokeWidth={1.5} />
                      <p className='font-body text-cream/60 text-[12px] font-medium mb-1'>
                        {opt.label}
                      </p>
                      <p className='font-body text-cream/25 text-[11px] font-light mb-3'>
                        {opt.detail}
                      </p>
                      <p className='font-heading text-lg gold-text font-semibold'>{opt.price}</p>
                    </div>
                  )
                })}
              </div>

              {/* Payment info */}
              <div className='bg-surface/50 border border-gold/[0.08] p-6 text-center'>
                <p className='font-body text-[11px] tracking-[0.3em] uppercase text-gold/40 mb-3'>
                  Information Paiement
                </p>
                <p className='font-body text-cream/50 text-sm font-light'>
                  <span className='gold-text font-medium'>30%</span> du paiement à la confirmation
                  de la réservation
                </p>
                <p className='font-body text-cream/50 text-sm font-light'>
                  <span className='gold-text font-medium'>70%</span> restant maximum le jour de la
                  prestation
                </p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Encart Vidéos Publicitaires (Pour les entreprises) */}
        <ScrollReveal>
          <div className='mt-16 max-w-4xl mx-auto'>
            <div
              id='videos-publicitaires'
              className='price-card p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 scroll-mt-[100px]'>
              <div className='corner-tl' />
              <div className='corner-br' />

              <div className='flex-1 text-center md:text-left'>
                <div className='flex items-center justify-center md:justify-start gap-2 mb-3'>
                  <Video className='w-5 h-5 text-gold' strokeWidth={1.5} />
                  <span className='font-body text-[10px] tracking-[0.25em] uppercase font-bold text-gold/70'>
                    Entreprises &amp; Partenaires
                  </span>
                </div>
                <h3 className='font-heading text-2xl md:text-3xl font-semibold text-cream mb-3'>
                  Vidéos Publicitaires
                </h3>
                <p className='font-body text-cream/70 text-sm md:text-base font-light leading-relaxed'>
                  Pour les entreprises et partenaires : vidéos publicitaires pour une prestation de
                  3 à 11 mois, à partir de 275 €.
                  <span className='block mt-2 text-cream/55 text-sm'>
                    Possibilité de vidéo unitaire en oneshot — à préciser dans le message du
                    formulaire de Contact et Réservation pour un devis adapté.
                  </span>
                </p>
              </div>

              <div className='shrink-0 flex flex-col items-center md:items-end gap-3 w-full md:w-auto'>
                <a
                  href='#contact'
                  onClick={(e) => handleChoosePack(e, 'Vidéos Publicitaires')}
                  className='btn-gold w-full md:w-auto justify-center px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-body font-medium transition-all duration-300 cursor-pointer'>
                  Réserver
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
