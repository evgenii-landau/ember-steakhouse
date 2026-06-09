import { describe, it, expect } from 'vitest'
import { reservationSchema, type ReservationFormValues } from './validation'

function futureDate(days: number): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + days)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const valid: ReservationFormValues = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (212) 555-0198',
  date: futureDate(7),
  time: '19:00',
  guests: 2,
  requests: '',
}

function fieldError(input: ReservationFormValues, field: keyof ReservationFormValues): string | undefined {
  const result = reservationSchema.safeParse(input)
  if (result.success) return undefined
  return result.error.flatten().fieldErrors[field]?.[0]
}

describe('reservationSchema', () => {
  it('accepts valid input', () => {
    expect(reservationSchema.safeParse(valid).success).toBe(true)
  })

  it('requires a name', () => {
    expect(fieldError({ ...valid, name: '' }, 'name')).toBe('Name is required')
  })

  it('requires first and last name', () => {
    expect(fieldError({ ...valid, name: 'John' }, 'name')).toBe('Enter first and last name')
  })

  it('rejects digits and special characters in name', () => {
    expect(fieldError({ ...valid, name: 'John D0e' }, 'name')).toBe('Use Latin letters and hyphens only')
  })

  it('requires a valid email', () => {
    expect(fieldError({ ...valid, email: 'notanemail' }, 'email')).toBe('Enter a valid email')
  })

  it('requires a fully masked phone number', () => {
    expect(fieldError({ ...valid, phone: '+1 (212) 555-019' }, 'phone')).toBe('Enter a complete phone number')
  })

  it('rejects guests below 1 and above 10', () => {
    expect(fieldError({ ...valid, guests: 0 }, 'guests')).toBe('At least 1 guest')
    expect(fieldError({ ...valid, guests: 11 }, 'guests')).toBe('Up to 10 guests')
  })

  it('requires a date', () => {
    expect(fieldError({ ...valid, date: '' }, 'date')).toBe('Date is required')
  })

  it('rejects dates in the past', () => {
    expect(fieldError({ ...valid, date: futureDate(-1) }, 'date')).toBe('Choose a date within the next 90 days')
  })

  it('rejects dates beyond the booking window', () => {
    expect(fieldError({ ...valid, date: futureDate(91) }, 'date')).toBe('Choose a date within the next 90 days')
  })

  it('requires a time', () => {
    expect(fieldError({ ...valid, time: '' }, 'time')).toBe('Time is required')
  })

  it('rejects requests longer than 300 characters', () => {
    expect(fieldError({ ...valid, requests: 'x'.repeat(301) }, 'requests')).toBe('Maximum 300 characters')
  })
})
