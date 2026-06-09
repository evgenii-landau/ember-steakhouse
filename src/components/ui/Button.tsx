// src/components/ui/Button.tsx
import Link from 'next/link'

type ButtonVariant = 'primary' | 'outline'

interface ButtonProps {
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
}

export default function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
  loading = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-sans text-xs font-medium uppercase tracking-[0.2em] px-8 py-4 transition-all duration-200 ease-in-out cursor-pointer'
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-ember-gold text-ember-black hover:bg-ember-gold-hover',
    outline:
      'border border-ember-gold text-ember-gold hover:bg-ember-gold hover:text-ember-black',
  }
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  const isBlocked = disabled || loading
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isBlocked}
      aria-busy={loading}
      className={`${classes} ${isBlocked ? 'cursor-not-allowed opacity-60' : ''}`}
    >
      {loading ? (
        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : (
        children
      )}
    </button>
  )
}
