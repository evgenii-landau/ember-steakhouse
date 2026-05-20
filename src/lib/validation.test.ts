import { describe, it, expect } from 'vitest'
import { validateReservationForm, type ReservationFields } from './validation'

const valid: ReservationFields = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '2125550198',
  date: '2026-06-01',
  time: '19:00',
  guests: '2',
  requests: '',
}

describe('validateReservationForm', () => {
  it('returns no errors for valid input', () => {
    expect(validateReservationForm(valid)).toEqual({})
  })

  it('requires name', () => {
    const errors = validateReservationForm({ ...valid, name: '' })
    expect(errors.name).toBe('Name is required')
  })

  it('requires valid email', () => {
    const errors = validateReservationForm({ ...valid, email: 'notanemail' })
    expect(errors.email).toBe('Valid email is required')
  })

  it('requires phone with at least 10 digits', () => {
    const errors = validateReservationForm({ ...valid, phone: '123' })
    expect(errors.phone).toBe('Valid phone number is required')
  })

  it('requires date', () => {
    const errors = validateReservationForm({ ...valid, date: '' })
    expect(errors.date).toBe('Date is required')
  })

  it('requires time', () => {
    const errors = validateReservationForm({ ...valid, time: '' })
    expect(errors.time).toBe('Time is required')
  })

  it('requires guests between 1 and 20', () => {
    const tooMany = validateReservationForm({ ...valid, guests: '21' })
    expect(tooMany.guests).toBe('Guests must be between 1 and 20')

    const zero = validateReservationForm({ ...valid, guests: '0' })
    expect(zero.guests).toBe('Guests must be between 1 and 20')
  })
})
