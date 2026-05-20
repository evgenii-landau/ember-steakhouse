// src/components/sections/Hero.tsx
import Image from 'next/image'
import Button from '@/components/ui/Button'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&q=80"
        alt="Ember steakhouse — fire and steak"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <SectionEyebrow>EST. 2019 · NEW YORK CITY</SectionEyebrow>

        <h1 className="font-display text-[clamp(80px,14vw,160px)] font-bold leading-none text-white tracking-[0.05em] mb-6">
          EMBER
        </h1>

        <p className="font-display italic text-[clamp(18px,2.5vw,28px)] text-white/80 mb-10">
          Where fire meets flavor
        </p>

        <Button href="#reservations">Reserve Your Table</Button>
      </div>
    </section>
  )
}
