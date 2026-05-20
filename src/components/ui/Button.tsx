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
}

export default function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-block font-sans text-xs font-medium uppercase tracking-[0.2em] px-8 py-4 transition-all duration-200 cursor-pointer'
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
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
