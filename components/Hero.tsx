import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { imageUrl } from './image-url'

export default function Hero() {
  return (
    <section className='relative isolate min-h-screen overflow-hidden bg-bg flex flex-col items-center justify-center text-center px-6 pt-20'>
      <picture className='absolute inset-0 -z-20 block'>
        <source media='(max-width: 767px)' srcSet={imageUrl('bg-mobile.jpg')} />
        <img
          src={imageUrl('main-bg.jpg')}
          alt=''
          className='block h-full w-full object-cover object-left md:object-center'
        />
      </picture>

      <div className='absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,8,15,0.58)_0%,rgba(6,8,15,0.42)_45%,rgba(6,8,15,0.88)_100%)]' />
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(6,8,15,0.12)_0%,rgba(6,8,15,0.66)_82%)]' />

      {/* Background effects */}
      <div className='absolute inset-0 -z-[5] pointer-events-none overflow-hidden'>
        {/* Radial gold glow */}
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full'
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 60%)',
          }}
        />
        {/* Blue accent glow */}
        <div
          className='absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full'
          style={{
            background: 'radial-gradient(circle, rgba(46,92,154,0.06) 0%, transparent 70%)',
          }}
        />
        <div className='hero-left-sparks' aria-hidden='true' />
        {/* Top line */}
        <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent' />
      </div>

      {/* Logo circle */}
      <div className='mb-10 animate-fade-in'>
        <div className='relative overflow-hidden bg-surface w-28 h-28 rounded-full border border-gold/20 mx-auto shadow-[0_0_40px_rgba(201,168,76,0.1)]'>
          <Image
            src={imageUrl('alexis-kodzaga.jpg')}
            alt='Alexis Kodzaga'
            fill
            sizes='112px'
            className='object-cover object-bottom'
          />
        </div>
      </div>

      {/* Eyebrow */}
      <p
        className='font-body max-w-[min(100%,28rem)] text-[9px] sm:text-[10px] leading-[2.2] tracking-[0.34em] sm:tracking-[0.48em] md:tracking-[0.6em] uppercase text-gold/55 mb-8 animate-slide-up [text-wrap:balance]'
        style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
        Directeur Artistique · Photographe · Vidéaste
      </p>

      {/* Main title */}
      <h1 className='font-heading leading-none mb-6'>
        <span
          className='block text-[clamp(4.5rem,13vw,10rem)] font-semibold gold-shimmer animate-fade-in'
          style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
          Alex
        </span>
        <span
          className='block text-[clamp(1.6rem,4.5vw,3.5rem)] italic text-cream/20 font-light tracking-[0.35em] -mt-2 animate-fade-in'
          style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
          Photos
        </span>
      </h1>

      {/* Divider */}
      <div
        className='w-12 gold-divider my-7 mx-auto opacity-35 animate-fade-in'
        style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
      />

      {/* Subtitle */}
      <p
        className='font-body text-cream/45 font-light text-sm md:text-base leading-[1.9] w-full max-w-[20rem] md:max-w-lg mb-12 animate-slide-up'
        style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}>
        Portrait Lifestyle et contrasté cinématographique.
        <br />
        Sublimez vos réseaux avec une direction artistique sur-mesure.
      </p>

      {/* CTAs */}
      <div
        className='flex flex-col sm:flex-row gap-4 items-center animate-slide-up'
        style={{ animationDelay: '0.9s', animationFillMode: 'backwards' }}>
        <a href='#contact' className='btn-gold'>
          Réserver un shooting
          <ArrowRight className='w-3.5 h-3.5' />
        </a>
        <a
          href='#portfolio'
          className='font-body text-[11px] tracking-[0.3em] uppercase text-cream/30 hover:text-gold/70 transition-colors flex items-center gap-2 cursor-pointer'>
          Voir le portfolio
          <svg
            width='11'
            height='11'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'>
            <path d='M7 17L17 7M17 7H7M17 7v10' />
          </svg>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-10 left-1/2 -translate-x-1/2'>
        <div className='w-px h-12 bg-gradient-to-b from-transparent via-gold/18 to-transparent mx-auto opacity-45' />
      </div>
    </section>
  )
}
