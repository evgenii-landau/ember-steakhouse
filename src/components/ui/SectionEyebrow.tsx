// src/components/ui/SectionEyebrow.tsx
interface SectionEyebrowProps {
  children: React.ReactNode
  light?: boolean
}

export default function SectionEyebrow({ children, light = false }: SectionEyebrowProps) {
  return (
    <span
      className={`block font-sans text-[11px] font-medium uppercase tracking-[0.2em] mb-4 ${
        light ? 'text-ember-muted' : 'text-ember-gold'
      }`}
    >
      {children}
    </span>
  )
}
