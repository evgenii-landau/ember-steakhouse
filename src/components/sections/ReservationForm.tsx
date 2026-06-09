'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import Button from '@/components/ui/Button'
import Calendar from '@/components/ui/calendar-1'
import {
  reservationSchema,
  type ReservationFormValues,
  MAX_DAYS_AHEAD,
  MAX_GUESTS,
} from '@/lib/validation'

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

function formatTime(t: string): string {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = ((h + 11) % 12) + 1
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

// Progressive +1 (XXX) XXX-XXXX mask
function maskPhone(input: string): string {
  let digits = input.replace(/\D/g, '')
  if (digits.startsWith('1')) digits = digits.slice(1)
  digits = digits.slice(0, 10)
  if (digits.length === 0) return ''
  const area = digits.slice(0, 3)
  const prefix = digits.slice(3, 6)
  const line = digits.slice(6, 10)
  if (digits.length <= 3) return `+1 (${area}`
  if (digits.length <= 6) return `+1 (${area}) ${prefix}`
  return `+1 (${area}) ${prefix}-${line}`
}

const labelClass =
  'block font-sans text-[11px] uppercase tracking-[0.15em] text-ember-muted mb-1 transition-colors duration-200 ease-in-out group-focus-within:text-ember-cream'

function fieldClass(hasError: boolean): string {
  return `w-full bg-transparent border-b py-3 font-sans text-[15px] text-white placeholder-ember-muted/50 outline-none transition-all duration-200 ease-in-out ${
    hasError
      ? 'border-[#8f4a48] focus:border-[#b8736d]'
      : 'border-ember-border focus:border-ember-gold'
  }`
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="mt-1.5 font-sans text-[11px] text-[#cf928c]"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

const DEFAULTS: ReservationFormValues = {
  name: '', email: '', phone: '', guests: 2, date: '', time: '', requests: '',
}

export default function ReservationForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  })

  const [showCalendar, setShowCalendar] = useState(false)
  const [requestsFocused, setRequestsFocused] = useState(false)
  const [confirmed, setConfirmed] = useState<ReservationFormValues | null>(null)

  const calendarWrapRef = useRef<HTMLDivElement>(null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + MAX_DAYS_AHEAD)

  const requestsValue = watch('requests') ?? ''

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

  async function onSubmit(data: ReservationFormValues) {
    // Simulate network latency before confirming
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setConfirmed(data)
  }

  function handleCloseOverlay() {
    setConfirmed(null)
    reset(DEFAULTS)
  }

  const requests = register('requests')

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
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

              {/* Name */}
              <div className="group">
                <label className={labelClass} htmlFor="name">Full Name</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className={fieldClass(!!errors.name)}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={() => {
                        field.onChange(field.value.trim())
                        field.onBlur()
                      }}
                    />
                  )}
                />
                <FieldError message={errors.name?.message} />
              </div>

              {/* Email */}
              <div className="group">
                <label className={labelClass} htmlFor="email">Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={fieldClass(!!errors.email)}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value.toLowerCase())}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                <FieldError message={errors.email?.message} />
              </div>

              {/* Phone */}
              <div className="group">
                <label className={labelClass} htmlFor="phone">Phone</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="+1 (212) 000-0000"
                      className={fieldClass(!!errors.phone)}
                      value={field.value}
                      onChange={(e) => field.onChange(maskPhone(e.target.value))}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                <FieldError message={errors.phone?.message} />
              </div>

              {/* Guests — custom stepper */}
              <div className="group">
                <label className={labelClass}>Number of Guests</label>
                <Controller
                  name="guests"
                  control={control}
                  render={({ field }) => {
                    const atMin = field.value <= 1
                    const atMax = field.value >= MAX_GUESTS
                    return (
                      <>
                        <div
                          className={`flex items-stretch border-b transition-colors duration-200 ease-in-out ${
                            errors.guests ? 'border-[#8f4a48]' : 'border-ember-border'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => field.onChange(Math.max(1, field.value - 1))}
                            disabled={atMin}
                            aria-label="Decrease guests"
                            className={`font-sans text-[20px] leading-none text-ember-gold transition-all duration-200 ease-in-out pb-3 pr-4 pt-3 ${
                              atMin ? 'opacity-40 cursor-not-allowed' : 'hover:text-ember-gold-hover'
                            }`}
                          >
                            −
                          </button>
                          <span className="flex-1 py-3 font-sans text-[15px] text-white text-center select-none">
                            {field.value}
                          </span>
                          <button
                            type="button"
                            onClick={() => field.onChange(Math.min(MAX_GUESTS, field.value + 1))}
                            disabled={atMax}
                            aria-label="Increase guests"
                            className={`font-sans text-[20px] leading-none text-ember-gold transition-all duration-200 ease-in-out pb-3 pl-4 pt-3 ${
                              atMax ? 'opacity-40 cursor-not-allowed' : 'hover:text-ember-gold-hover'
                            }`}
                          >
                            +
                          </button>
                        </div>
                        <AnimatePresence>
                          {atMax && (
                            <motion.p
                              initial={{ opacity: 0, y: -2 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2, ease: 'easeInOut' }}
                              className="mt-1.5 font-sans text-[11px] text-ember-muted"
                            >
                              For parties over {MAX_GUESTS}, please call us to arrange your table.
                            </motion.p>
                          )}
                        </AnimatePresence>
                        <FieldError message={errors.guests?.message} />
                      </>
                    )
                  }}
                />
              </div>

              {/* Date — custom calendar dropdown */}
              <div className="group relative" ref={calendarWrapRef}>
                <label className={labelClass}>Date</label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <>
                      <button
                        type="button"
                        onClick={() => setShowCalendar((v) => !v)}
                        className={`w-full bg-transparent border-b py-3 font-sans text-[15px] text-left outline-none transition-all duration-200 ease-in-out flex items-center justify-between ${
                          showCalendar
                            ? 'border-ember-gold'
                            : errors.date
                            ? 'border-[#8f4a48]'
                            : 'border-ember-border'
                        } ${field.value ? 'text-white' : 'text-ember-muted/50'}`}
                      >
                        <span>{field.value ? formatDisplay(field.value) : 'Select a date'}</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0 text-ember-gold">
                          <rect x="1" y="2.5" width="13" height="12" stroke="currentColor" strokeWidth="1.2" />
                          <path d="M5 1v3M10 1v3M1 6.5h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
                        </svg>
                      </button>

                      {showCalendar && (
                        <div className="absolute top-full left-0 z-50 mt-2 bg-ember-cream border border-ember-border p-5 shadow-2xl">
                          <Calendar
                            mode="single"
                            selected={parseDate(field.value)}
                            onSelect={(date: Date | undefined, triggerDate: Date) => {
                              // RDP passes the clicked day as triggerDate; fall back to it
                              // so selection works even when `date` resolves undefined
                              const picked = date ?? triggerDate
                              if (picked) field.onChange(toDateString(picked))
                              field.onBlur()
                              setShowCalendar(false)
                            }}
                            disabled={[{ before: today }, { after: maxDate }]}
                            numberOfMonths={1}
                          />
                        </div>
                      )}
                    </>
                  )}
                />
                <FieldError message={errors.date?.message} />
              </div>

              {/* Time */}
              <div className="group">
                <label className={labelClass} htmlFor="time">Time</label>
                <div className="relative">
                  <select
                    id="time"
                    {...register('time')}
                    className={`${fieldClass(!!errors.time)} appearance-none cursor-pointer pr-8 [color-scheme:dark]`}
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t} className="bg-ember-warm text-white">{t}</option>
                    ))}
                  </select>
                  <div className="absolute right-0 bottom-[14px] pointer-events-none">
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                      <path d="M1 1l5 5 5-5" stroke="#C8973A" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </div>
                </div>
                <FieldError message={errors.time?.message} />
              </div>

              {/* Special requests — full width */}
              <div className="group md:col-span-2">
                <label className={labelClass} htmlFor="requests">Special Requests</label>
                <div className="relative">
                  <textarea
                    id="requests"
                    rows={3}
                    placeholder="Allergies, occasions, seating preferences..."
                    maxLength={300}
                    {...requests}
                    onFocus={() => setRequestsFocused(true)}
                    onBlur={(e) => {
                      requests.onBlur(e)
                      setRequestsFocused(false)
                    }}
                    className={`${fieldClass(!!errors.requests)} resize-none`}
                  />
                  <AnimatePresence>
                    {requestsFocused && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="absolute bottom-2 right-0 font-sans text-[10px] tracking-[0.1em] text-ember-muted/70"
                      >
                        {requestsValue.length}/300
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <FieldError message={errors.requests?.message} />
              </div>

            </div>

            {/* Submit */}
            <div className="mt-12 text-center">
              <Button type="submit" loading={isSubmitting} className="min-w-[220px]">
                Confirm Reservation
              </Button>
              <p className="font-sans text-[13px] text-ember-muted mt-6">
                Or call us:{' '}
                <a href="tel:+12125550198" className="text-white hover:text-ember-gold transition-colors duration-200">
                  +1 (212) 555-0198
                </a>
              </p>
            </div>

          </form>
        </FadeIn>

      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {confirmed && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-ember-black/80"
              style={{ backdropFilter: 'blur(8px)' }}
              onClick={handleCloseOverlay}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Reservation confirmed"
              className="relative z-10 w-full max-w-md border border-ember-border bg-ember-warm px-8 py-12 text-center"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <SectionEyebrow>Confirmed</SectionEyebrow>
              <h3 className="font-display text-[32px] font-bold text-white mb-4">Thank You</h3>
              <p className="font-sans text-[15px] leading-relaxed text-ember-muted">
                Your reservation has been confirmed. We are waiting for you on{' '}
                <span className="text-ember-gold">{formatDisplay(confirmed.date)}</span> at{' '}
                <span className="text-ember-gold">{formatTime(confirmed.time)}</span>.
              </p>
              <button
                type="button"
                onClick={handleCloseOverlay}
                className="mt-8 font-sans text-[11px] uppercase tracking-[0.2em] text-ember-muted transition-colors duration-200 hover:text-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
