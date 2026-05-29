import Image from 'next/image'
import ScrollReveal from './ScrollReveal'

/* Inline SVGs for brand icons (not available in lucide-react) */
function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'>
      <rect x='2' y='2' width='20' height='20' rx='5' />
      <circle cx='12' cy='12' r='5' />
      <circle cx='17.5' cy='6.5' r='1.2' fill='currentColor' stroke='none' />
    </svg>
  )
}

function TikTokIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
      <path d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.6z' />
    </svg>
  )
}

export default function About() {
  return (
    <section id='about' className='scroll-mt-[68px] py-32 px-6 md:px-14 max-w-7xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-28 items-center'>
        {/* Portrait photo */}
        <ScrollReveal>
          <div className='relative'>
            <div className='relative overflow-hidden bg-surface w-full aspect-[3/4]'>
              <Image
                src='/images/alexis-kodzaga.jpg'
                alt='Alexis Kodzaga'
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                className='object-cover'
              />
            </div>
            <div className='corner-tl' />
            <div className='corner-br' />
            <div className='absolute -inset-4 border border-gold/[0.06] pointer-events-none' />
          </div>
        </ScrollReveal>

        {/* Bio content */}
        <ScrollReveal delay={120}>
          <div>
            <p className='font-body text-[10px] tracking-[0.5em] uppercase text-gold/45 mb-5'>
              À propos
            </p>
            <h2 className='font-heading text-4xl md:text-5xl font-light leading-snug mb-7'>
              Alex
              <br />
              <em className='gold-text'>Photos</em>
            </h2>
            <div className='w-8 gold-divider mb-8 opacity-50' />

            <p className='font-body text-cream/50 text-[14.5px] leading-[1.9] font-light mb-5'>
              Passionné par l&apos;image et la direction artistique, je capture l&apos;essence de
              chaque instant avec un regard cinématographique unique.
            </p>
            <p className='font-body text-cream/50 text-[14.5px] leading-[1.9] font-light mb-10'>
              Spécialisé en portraits lifestyle et shootings contrastés, je propose une approche
              créative et sur-mesure pour sublimer chaque projet.
            </p>

            {/* Stats */}
            <div className='grid grid-cols-2 gap-4 pb-10 border-b border-white/5 mb-10'>
              <div className='text-center'>
                <div className='font-heading text-3xl font-semibold gold-text mb-1'>3</div>
                <div className='font-body text-[10px] tracking-[0.15em] uppercase text-cream/30'>
                  Ans d&apos;exp.
                </div>
              </div>
              <div className='text-center'>
                <div className='font-heading text-3xl font-semibold gold-text mb-1'>100+</div>
                <div className='font-body text-[10px] tracking-[0.15em] uppercase text-cream/30'>
                  Clients
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className='flex gap-4'>
              <a
                href='https://instagram.com/alex.photos'
                target='_blank'
                rel='noreferrer'
                className='btn-gold py-2.5 px-5 text-[10px]'>
                <InstagramIcon className='w-3.5 h-3.5' />
                Suivre sur Instagram
              </a>
              <a
                href='https://tiktok.com/@alex.photos'
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 py-2.5 px-5 text-[10px] tracking-[0.15em] uppercase font-body font-medium border border-gold/15 text-cream/40 hover:border-gold/40 hover:text-gold/70 transition-all duration-300 cursor-pointer'>
                <TikTokIcon className='w-3.5 h-3.5' />
                TikTok
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
