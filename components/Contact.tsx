'use client'

import { useState, useEffect, useMemo, useRef, type FormEvent } from 'react'
import Link from 'next/link'
import { User, Mail, Phone, MapPin, Calendar, MessageSquare, Send } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import type { TariffCatalog } from '@/lib/tariffs'

function formatOptionPrice(price: string) {
  return price.trim().startsWith('+') ? price : `+${price}`
}

export default function Contact({ tariffCatalog }: { tariffCatalog: TariffCatalog }) {
  const dateRef = useRef<HTMLInputElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [prestation, setPrestation] = useState('')
  const prestations = useMemo(() => {
    const list = tariffCatalog.groups.flatMap((group) => group.packs.map((pack) => pack.title))
    if (!list.includes('Vidéos Publicitaires')) {
      list.push('Vidéos Publicitaires')
    }
    return list
  }, [tariffCatalog.groups])

  useEffect(() => {
    const handlePrestationChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      if (customEvent.detail && prestations.includes(customEvent.detail)) {
        setPrestation(customEvent.detail)
      }
    }

    const handleInitialLoadAndChange = () => {
      const queryParams = new URLSearchParams(window.location.search)
      const prest = queryParams.get('prestation')
      if (prest && prestations.includes(prest)) {
        setPrestation(prest)
      } else {
        const hash = window.location.hash
        if (hash.includes('?prestation=')) {
          const params = new URLSearchParams(hash.split('?')[1])
          const hashPrest = params.get('prestation')
          if (hashPrest) {
            const decoded = decodeURIComponent(hashPrest)
            if (prestations.includes(decoded)) {
              setPrestation(decoded)
            }
          }
        }
      }
    }

    handleInitialLoadAndChange()
    window.addEventListener('hashchange', handleInitialLoadAndChange)
    window.addEventListener('prestation-change', handlePrestationChange)
    return () => {
      window.removeEventListener('hashchange', handleInitialLoadAndChange)
      window.removeEventListener('prestation-change', handlePrestationChange)
    }
  }, [prestations])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)

    const formData = new FormData(e.currentTarget)
    const res = await fetch('/api/contact', { method: 'POST', body: formData })

    if (!res.ok) {
      setSending(false)
      return
    }

    setSending(false)
    setSubmitted(true)
  }

  return (
    <section
      id='contact'
      className='section-bg scroll-mt-[68px] py-32 px-6 md:px-14 max-w-4xl mx-auto'>
      {/* Section header */}
      <div className='text-center mb-16'>
        <ScrollReveal>
          <p className='font-body text-[10px] tracking-[0.5em] uppercase text-gold/45 mb-4'>
            Contact
          </p>
          <h2 className='font-heading text-4xl md:text-5xl font-light mb-5'>
            Formulaire de <em className='gold-text'>Contact et Réservation</em>
          </h2>
          <p className='font-body text-cream/30 text-sm font-light'>Réponse sous 48h</p>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        {submitted ? (
          /* Success state */
          <div className='text-center py-20 bg-surface border border-gold/10'>
            <div className='w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6'>
              <Send className='w-6 h-6 text-gold' />
            </div>
            <h3 className='font-heading text-2xl mb-3'>
              Message <em className='gold-text'>envoyé</em>
            </h3>
            <p className='font-body text-cream/40 text-sm font-light max-w-md mx-auto'>
              Merci pour votre demande ! Je vous répondrai dans les 48 heures.
            </p>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleSubmit}
            className='bg-surface border border-gold/[0.06] p-8 md:p-12 space-y-6'>
            {/* Honeypot — hidden from real users, bots fill it */}
            <input
              type='text'
              name='website'
              tabIndex={-1}
              autoComplete='off'
              aria-hidden='true'
              style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
            />
            {/* Name & Email row */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='contact-name'
                  className='flex items-center gap-2 font-body text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-3'>
                  <User className='w-3.5 h-3.5 text-gold/40' />
                  Nom complet
                </label>
                <input
                  type='text'
                  id='contact-name'
                  name='name'
                  required
                  placeholder='Votre nom'
                  className='form-input'
                />
              </div>
              <div>
                <label
                  htmlFor='contact-email'
                  className='flex items-center gap-2 font-body text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-3'>
                  <Mail className='w-3.5 h-3.5 text-gold/40' />
                  Email
                </label>
                <input
                  type='email'
                  id='contact-email'
                  name='email'
                  required
                  placeholder='votre@email.com'
                  className='form-input'
                />
              </div>
            </div>

            {/* Phone & Prestation row */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='contact-phone'
                  className='flex items-center gap-2 font-body text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-3'>
                  <Phone className='w-3.5 h-3.5 text-gold/40' />
                  Téléphone
                </label>
                <input
                  type='tel'
                  id='contact-phone'
                  name='phone'
                  placeholder='+33 6 12 34 56 78'
                  className='form-input'
                />
              </div>
              <div>
                <label
                  htmlFor='contact-prestation'
                  className='flex items-center gap-2 font-body text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-3'>
                  <MessageSquare className='w-3.5 h-3.5 text-gold/40' />
                  Prestation souhaitée
                </label>
                <select
                  id='contact-prestation'
                  name='prestation'
                  required
                  className="form-input cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23C9A84C%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center]"
                  value={prestation}
                  onChange={(e) => setPrestation(e.target.value)}>
                  <option value='' disabled>
                    Sélectionner une prestation
                  </option>
                  {prestations.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Location row */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='contact-date'
                  className='flex items-center gap-2 font-body text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-3 cursor-pointer'>
                  <Calendar className='w-3.5 h-3.5 text-gold/40' />
                  Date souhaitée
                </label>
                <input
                  ref={dateRef}
                  type='date'
                  id='contact-date'
                  name='date'
                  className='form-input date-input'
                  onClick={() => dateRef.current?.showPicker()}
                />
              </div>
              <div>
                <label
                  htmlFor='contact-lieu'
                  className='flex items-center gap-2 font-body text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-3'>
                  <MapPin className='w-3.5 h-3.5 text-gold/40' />
                  Lieu
                </label>
                <input
                  type='text'
                  id='contact-lieu'
                  name='lieu'
                  placeholder='Paris Bordeaux Toulouse...'
                  className='form-input'
                />
              </div>
            </div>

            {/* Options checkboxes */}
            {tariffCatalog.options.length > 0 && (
              <div>
                <p className='font-body text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-4'>
                  Options à la réservation
                </p>
                <div className='flex flex-wrap gap-4'>
                  {tariffCatalog.options.map((opt) => (
                    <label
                      key={opt.id}
                      htmlFor={`option-${opt.id}`}
                      className='flex items-center gap-3 bg-surface-light/50 border border-gold/[0.06] px-4 py-3 cursor-pointer hover:border-gold/20 transition-colors'>
                      <input
                        type='checkbox'
                        id={`option-${opt.id}`}
                        name={`option-${opt.id}`}
                        className='w-4 h-4 rounded-sm accent-gold bg-surface border-gold/20 cursor-pointer'
                      />
                      <span className='font-body text-[12px] text-cream/50 font-light'>
                        {opt.label}{' '}
                        <span className='text-gold/60'>({formatOptionPrice(opt.price)})</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label
                htmlFor='contact-message'
                className='flex items-center gap-2 font-body text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-3'>
                <MessageSquare className='w-3.5 h-3.5 text-gold/40' />
                Message
              </label>
              {prestation === 'Vidéos Publicitaires' && (
                <p className='font-body text-cream/45 text-xs font-light leading-relaxed mb-3'>
                  Pour une vidéo unitaire en oneshot ou un besoin spécifique, précisez-le ici pour
                  recevoir un devis adapté.
                </p>
              )}
              <textarea
                id='contact-message'
                name='message'
                rows={5}
                placeholder={
                  prestation === 'Vidéos Publicitaires'
                    ? 'Prestation 3 à 11 mois, vidéo oneshot, durée, objectifs, délais...'
                    : 'Décrivez votre projet, vos idées, vos attentes...'
                }
                className='form-input resize-none'
              />
            </div>

            {/* Privacy Consent Checkbox */}
            <div className='flex items-start gap-3'>
              <input
                type='checkbox'
                id='contact-privacyConsent'
                name='privacyConsent'
                required
                className='w-4 h-4 rounded-sm accent-gold bg-surface border-gold/20 cursor-pointer mt-1 shrink-0'
              />
              <label
                htmlFor='contact-privacyConsent'
                className='font-body text-[12px] text-cream/50 font-light leading-relaxed cursor-pointer select-none'>
                J&apos;accepte que mes données soient traitées dans le cadre de ma demande de
                réservation conformément à la{' '}
                <Link
                  href='/politique-de-confidentialite'
                  target='_blank'
                  className='gold-text hover:underline'>
                  politique de confidentialité
                </Link>
                .
              </label>
            </div>

            {/* Submit button */}
            <button
              type='submit'
              disabled={sending}
              className='btn-gold w-full justify-center py-4 text-[12px] disabled:opacity-50 disabled:cursor-not-allowed'>
              {sending ? (
                'Envoi en cours...'
              ) : (
                <>
                  Envoyer ma demande
                  <Send className='w-3.5 h-3.5' />
                </>
              )}
            </button>
          </form>
        )}
      </ScrollReveal>
    </section>
  )
}
