'use client'

import { useState, useRef, useEffect } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import Button from '@/components/ui/Button'
import Calendar from '@/components/ui/calendar-1'
import { validateReservationForm, type ReservationFields, type ValidationErrors } from '@/lib/validation'

const EMPTY: ReservationFields = {
  name: '', email: '', phone: '', date: '', time: '', guests: '2', requests: '',
}

const TIME_SLOTS = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']

function parseDate(str: string): Date | undefined {
  if (!str) return undefined
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatDisplay(str: string): string {
  const date = parseDate(str)
  if (!date) return ''
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function toDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function ReservationForm() {
  const [fields, setFields] = useState<ReservationFields>(EMPTY)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const calendarWrapRef = useRef<HTMLDivElement>(null)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Close calendar on outside click
  useEffect(() => {
    if (!showCalendar) return
    function onMouseDown(e: MouseEvent) {
      if (calendarWrapRef.current && !calendarWrapRef.current.contains(e.target as Node)) {
        setShowCalendar(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [showCalendar])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name as keyof ReservationFields]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
    }
  }

  function handleGuestsChange(delta: number) {
    const current = parseInt(fields.guests) || 1
    const next = Math.max(1, Math.min(20, current + delta))
    setFields(prev => ({ ...prev, guests: String(next) }))
    if (errors.guests) setErrors(prev => ({ ...prev, guests: undefined }))
  }

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      setFields(prev => ({ ...prev, date: toDateString(date) }))
      if (errors.date) setErrors(prev => ({ ...prev, date: undefined }))
    }
    setShowCalendar(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validation = validateReservationForm(fields)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }
    setSubmitted(true)
  }

  const inputClass = (field: keyof ReservationFields) =>
    `w-full bg-transparent border-b py-3 font-sans text-[15px] text-white placeholder-ember-muted/50 outline-none transition-colors duration-200 focus:border-ember-gold ${
      errors[field] ? 'border-red-400' : 'border-ember-border'
    }`

  const labelClass = 'block font-sans text-[11px] uppercase tracking-[0.15em] text-ember-muted mb-1'

  if (submitted) {
    return (
      <section id="reservations" className="bg-ember-warm py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 text-center">
          <FadeIn>
            <SectionEyebrow>Confirmed</SectionEyebrow>
            <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white mb-6">
              Your Table Awaits
            </h2>
            <p className="font-sans text-[17px] text-ember-muted max-w-md mx-auto">
              We have received your reservation and will confirm within the hour. See you soon.
            </p>
          </FadeIn>
        </div>
      </section>
    )
  }

  return (
    <section id="reservations" className="bg-ember-warm py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeIn className="text-center mb-14">
          <SectionEyebrow>Book Your Visit</SectionEyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white">
            Reserve Your Table
          </h2>
        </FadeIn>

        <FadeIn>
          <form onSubmit={handleSubmit} noValidate className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

              {/* Name */}
              <div>
                <label className={labelClass} htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="John Doe"
                  value={fields.name} onChange={handleChange} className={inputClass('name')} />
                {errors.name && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className={labelClass} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com"
                  value={fields.email} onChange={handleChange} className={inputClass('email')} />
                {errors.email && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass} htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" placeholder="+1 (212) 000-0000"
                  value={fields.phone} onChange={handleChange} className={inputClass('phone')} />
                {errors.phone && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Guests — custom stepper */}
              <div>
                <label className={labelClass}>Number of Guests</label>
                <div className={`flex items-stretch border-b transition-colors duration-200 ${
                  errors.guests ? 'border-red-400' : 'border-ember-border'
                }`}>
                  <button
                    type="button"
                    onClick={() => handleGuestsChange(-1)}
                    aria-label="Decrease guests"
                    className="font-sans text-[20px] leading-none text-ember-gold hover:text-ember-gold-hover transition-colors pb-3 pr-4 pt-3"
                  >
                    −
                  </button>
                  <span className="flex-1 py-3 font-sans text-[15px] text-white text-center select-none">
                    {fields.guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleGuestsChange(1)}
                    aria-label="Increase guests"
                    className="font-sans text-[20px] leading-none text-ember-gold hover:text-ember-gold-hover transition-colors pb-3 pl-4 pt-3"
                  >
                    +
                  </button>
                </div>
                {errors.guests && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.guests}</p>}
              </div>

              {/* Date — custom calendar dropdown */}
              <div className="relative" ref={calendarWrapRef}>
                <label className={labelClass}>Date</label>
                <button
                  type="button"
                  onClick={() => setShowCalendar(v => !v)}
                  className={`w-full bg-transparent border-b py-3 font-sans text-[15px] text-left outline-none transition-colors duration-200 flex items-center justify-between ${
                    showCalendar
                      ? 'border-ember-gold'
                      : errors.date
                      ? 'border-red-400'
                      : 'border-ember-border'
                  } ${fields.date ? 'text-white' : 'text-ember-muted/50'}`}
                >
                  <span>{fields.date ? formatDisplay(fields.date) : 'Select a date'}</span>
                  {/* Calendar icon */}
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0 text-ember-gold">
                    <rect x="1" y="2.5" width="13" height="12" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M5 1v3M10 1v3M1 6.5h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
                  </svg>
                </button>

                {/* Calendar dropdown */}
                {showCalendar && (
                  <div className="absolute top-full left-0 z-50 mt-2 bg-ember-cream border border-ember-border p-5 shadow-2xl">
                    <Calendar
                      mode="single"
                      selected={parseDate(fields.date)}
                      onSelect={handleDateSelect}
                      disabled={{ before: today }}
                      numberOfMonths={1}
                    />
                  </div>
                )}

                {errors.date && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.date}</p>}
              </div>

              {/* Time — custom arrow */}
              <div>
                <label className={labelClass} htmlFor="time">Time</label>
                <div className="relative">
                  <select id="time" name="time" value={fields.time} onChange={handleChange}
                    className={`${inputClass('time')} appearance-none cursor-pointer pr-8 [color-scheme:dark]`}>
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map(t => (
                      <option key={t} value={t} className="bg-ember-warm text-white">{t}</option>
                    ))}
                  </select>
                  <div className="absolute right-0 bottom-[14px] pointer-events-none">
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                      <path d="M1 1l5 5 5-5" stroke="#C8973A" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                    </svg>
                  </div>
                </div>
                {errors.time && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.time}</p>}
              </div>

              {/* Special requests — full width */}
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="requests">Special Requests</label>
                <textarea id="requests" name="requests" rows={3} placeholder="Allergies, occasions, seating preferences..."
                  value={fields.requests} onChange={handleChange}
                  className={`${inputClass('requests')} resize-none`} />
              </div>

            </div>

            {/* Submit */}
            <div className="mt-12 text-center">
              <Button type="submit">Confirm Reservation</Button>
              <p className="font-sans text-[13px] text-ember-muted mt-6">
                Or call us: <a href="tel:+12125550198" className="text-white hover:text-ember-gold transition-colors">+1 (212) 555-0198</a>
              </p>
            </div>

          </form>
        </FadeIn>

      </div>
    </section>
  )
}
