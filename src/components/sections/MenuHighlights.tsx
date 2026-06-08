'use client'

import { useState } from 'react'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import Button from '@/components/ui/Button'
import MenuModal from '@/components/ui/MenuModal'
import { MENU_ITEMS } from '@/lib/content'

// Double the items for a seamless infinite loop
const LOOP_ITEMS = [...MENU_ITEMS, ...MENU_ITEMS]

export default function MenuHighlights() {
  const [isPaused, setIsPaused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section id="menu" className="bg-ember-black py-24 md:py-32">

      {/* Heading */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <FadeIn className="text-center mb-16">
          <SectionEyebrow>What We Serve</SectionEyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white">
            Signature Dishes
          </h2>
        </FadeIn>
      </div>

      {/* Carousel — full-bleed, outside the content container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left fade to ember-black */}
        <div
          className="absolute left-0 top-0 h-full w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A0806, transparent)' }}
        />

        {/* Scrolling track */}
        <div
          className="flex gap-5 w-fit"
          style={{
            animation: `marqueeScroll ${MENU_ITEMS.length * 5500}ms linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {LOOP_ITEMS.map((item, i) => (
            <div
              key={i}
              className="relative w-[300px] h-[400px] shrink-0 overflow-hidden group cursor-default"
            >
              {/* Dish image — zooms under hover blur */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Category badge — always visible, above overlay */}
              <div className="absolute top-4 right-4 z-20 bg-ember-gold px-2 py-1 flex items-center justify-center">
                <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-ember-black font-medium leading-none">
                  {item.category}
                </span>
              </div>

              {/* Hover overlay: blur + dark tint + info */}
              <div
                className="absolute inset-0 z-10 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,0.52)' }}
              >
                {/* Info lifts up on reveal */}
                <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-[22px] font-semibold text-white leading-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="font-sans text-[13px] text-white/75 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <span className="font-sans text-[20px] text-ember-gold font-medium">
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right fade to ember-black */}
        <div
          className="absolute right-0 top-0 h-full w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A0806, transparent)' }}
        />
      </div>

      {/* Button */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <FadeIn className="text-center mt-14">
          <Button variant="outline" onClick={() => setMenuOpen(true)}>
            View Full Menu
          </Button>
        </FadeIn>
      </div>

      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />

    </section>
  )
}
