'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { REVIEWS } from '@/lib/content'

function StarRating({ count, cardDelay }: { count: number; cardDelay: number }) {
  const [visible, setVisible] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    // Wait for the card fade-in to complete before revealing stars
    const baseMs = cardDelay * 1000 + 700
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < count; i++) {
      timers.push(setTimeout(() => setVisible(i + 1), baseMs + i * 220))
    }
    return () => timers.forEach(clearTimeout)
  }, [inView, count, cardDelay])

  return (
    <div ref={ref} className="flex gap-1.5 mb-6 h-[14px]">
      {Array.from({ length: count }).map((_, j) => (
        <svg
          key={j}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-ember-gold transition-opacity duration-300 shrink-0"
          style={{ opacity: j < visible ? 1 : 0 }}
        >
          <path
            d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.895l-3.09 1.605L4.5 7.07 2 4.635l3.455-.505L7 1z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="bg-ember-black py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeIn className="text-center mb-16">
          <SectionEyebrow>Guest Voices</SectionEyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white">
            What Our Guests Say
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <FadeIn key={review.id} delay={i * 0.12} className="h-full">
              <div className="relative p-8 border border-ember-border h-full flex flex-col">

                <StarRating count={review.stars} cardDelay={i * 0.12} />

                {/* Quote mark */}
                <div className="absolute top-4 right-6 font-display text-[80px] leading-none text-ember-gold/10 select-none pointer-events-none">
                  &#34;
                </div>

                <p className="font-display italic text-[17px] text-white/85 leading-relaxed mb-8 flex-1">
                  &ldquo;{review.quote}&rdquo;
                </p>

                <div>
                  <div className="font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-white">
                    {review.author}
                  </div>
                  <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-ember-muted mt-1">
                    {review.context}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
