'use client'

import { useState } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import Button from '@/components/ui/Button'
import { validateReservationForm, type ReservationFields, type ValidationErrors } from '@/lib/validation'

const EMPTY: ReservationFields = {
  name: '', email: '', phone: '', date: '', time: '', guests: '2', requests: '',
}

const TIME_SLOTS = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']

export default function ReservationForm() {
  const [fields, setFields] = useState<ReservationFields>(EMPTY)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name as keyof ReservationFields]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
    }
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

              {/* Guests */}
              <div>
                <label className={labelClass} htmlFor="guests">Number of Guests</label>
                <input id="guests" name="guests" type="number" min="1" max="20"
                  value={fields.guests} onChange={handleChange} className={inputClass('guests')} />
                {errors.guests && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.guests}</p>}
              </div>

              {/* Date */}
              <div>
                <label className={labelClass} htmlFor="date">Date</label>
                <input id="date" name="date" type="date"
                  value={fields.date} onChange={handleChange} className={inputClass('date')} />
                {errors.date && <p className="font-sans text-[11px] text-red-400 mt-1">{errors.date}</p>}
              </div>

              {/* Time */}
              <div>
                <label className={labelClass} htmlFor="time">Time</label>
                <select id="time" name="time" value={fields.time} onChange={handleChange}
                  className={`${inputClass('time')} appearance-none cursor-pointer`}>
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t} className="bg-ember-warm">{t}</option>
                  ))}
                </select>
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
