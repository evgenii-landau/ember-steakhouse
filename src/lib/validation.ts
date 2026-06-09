import { z } from 'zod'

export const MAX_DAYS_AHEAD = 90
export const MAX_GUESTS = 10

// Latin letters, separated by single spaces or hyphens (no digits / specials)
const NAME_PATTERN = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/
const PHONE_PATTERN = /^\+1 \(\d{3}\) \d{3}-\d{4}$/

function startOfToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function isWithinBookingWindow(value: string): boolean {
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return false
  const picked = new Date(y, m - 1, d)
  picked.setHours(0, 0, 0, 0)
  const today = startOfToday()
  const max = startOfToday()
  max.setDate(max.getDate() + MAX_DAYS_AHEAD)
  return picked >= today && picked <= max
}

export const reservationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .regex(NAME_PATTERN, 'Use Latin letters and hyphens only')
    .refine((v) => v.split(/\s+/).filter(Boolean).length >= 2, 'Enter first and last name'),
  email: z.string().min(1, 'Email is required').pipe(z.email('Enter a valid email')),
  phone: z.string().regex(PHONE_PATTERN, 'Enter a complete phone number'),
  guests: z
    .number()
    .int()
    .min(1, 'At least 1 guest')
    .max(MAX_GUESTS, `Up to ${MAX_GUESTS} guests`),
  date: z
    .string()
    .min(1, 'Date is required')
    .refine(isWithinBookingWindow, 'Choose a date within the next 90 days'),
  time: z.string().min(1, 'Time is required'),
  requests: z.string().max(300, 'Maximum 300 characters'),
})

export type ReservationFormValues = z.infer<typeof reservationSchema>
