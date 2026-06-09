'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { STORY_STATS } from '@/lib/content'

function CountUp({ target, from, duration = 1400 }: { target: number; from: number; duration?: number }) {
  const [value, setValue] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, from, target, duration])

  return <span ref={ref}>{value}</span>
}

export default function Story() {
  return (
    <section id="story" className="bg-ember-cream py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text column */}
          <FadeIn>
            <SectionEyebrow light>Our Story</SectionEyebrow>
            <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-ember-warm leading-tight mb-8">
              A Story Told Through Fire
            </h2>
            <p className="font-sans text-[17px] text-ember-warm/70 leading-relaxed mb-6">
              Ember was born from a singular obsession: the perfect cut of beef, coaxed to its highest expression by live fire. Chef Marco Rodriguez spent a decade sourcing the finest ranches across the United States before opening our doors in 2019.
            </p>
            <p className="font-sans text-[17px] text-ember-warm/70 leading-relaxed mb-12">
              Every plate tells the story of the land it came from. We work exclusively with local farms, dry-age our own cuts in-house, and let the fire speak for itself.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
              {STORY_STATS.map((stat, i) => {
                const numeric = !isNaN(Number(stat.value)) ? Number(stat.value) : null
                return (
                  <div key={i} className="flex items-center gap-x-8 sm:gap-x-10">
                    {i > 0 && <div className="hidden h-10 w-px shrink-0 bg-ember-warm/20 sm:block" />}
                    <div>
                      <div className="font-display text-[34px] sm:text-[40px] font-bold text-ember-gold leading-none mb-1">
                        {numeric !== null ? (
                          <CountUp
                            target={numeric}
                            from={numeric > 100 ? numeric - 10 : 0}
                          />
                        ) : (
                          stat.value
                        )}
                      </div>
                      <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-ember-muted">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </FadeIn>

          {/* Image column */}
          <FadeIn delay={0.15}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=900&q=80"
                alt="Chef Marco Rodriguez"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
