export interface ReservationFields {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  requests: string
}

export type ValidationErrors = Partial<Record<keyof ReservationFields, string>>

export function validateReservationForm(fields: ReservationFields): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!fields.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Valid email is required'
  }

  const digits = fields.phone.replace(/\D/g, '')
  if (digits.length < 10) {
    errors.phone = 'Valid phone number is required'
  }

  if (!fields.date) {
    errors.date = 'Date is required'
  }

  if (!fields.time) {
    errors.time = 'Time is required'
  }

  const guestCount = parseInt(fields.guests, 10)
  if (isNaN(guestCount) || guestCount < 1 || guestCount > 20) {
    errors.guests = 'Guests must be between 1 and 20'
  }

  return errors
}
