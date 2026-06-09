'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import Button from '@/components/ui/Button'
import { useMenuBook } from '@/components/ui/MenuBookProvider'
import { MENU_ITEMS } from '@/lib/content'

export default function MenuHighlights() {
  const { openMenu } = useMenuBook()

  return (
    <section id="menu" className="bg-ember-black py-16 md:py-32">

      {/* Heading */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <FadeIn className="text-center mb-10 md:mb-16">
          <SectionEyebrow>What We Serve</SectionEyebrow>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-bold text-white">
            Signature Dishes
          </h2>
        </FadeIn>
      </div>

      {/* Desktop: full-bleed auto-scrolling, draggable marquee */}
      <DesktopMarquee />

      {/* Mobile: one dish at a time, swipe + pagination dots */}
      <MobileSlider />

      {/* Button — opens the same full menu modal as the navbar */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <FadeIn className="text-center mt-8 md:mt-14">
          <Button variant="outline" onClick={openMenu}>
            View Full Menu
          </Button>
        </FadeIn>
      </div>

    </section>
  )
}

// Doubled so the track can loop seamlessly: when scroll passes the first copy
// we wrap back by exactly its width, which is invisible since the second copy
// is identical. Two copies are enough — one already exceeds the viewport.
const LOOP_ITEMS = [...MENU_ITEMS, ...MENU_ITEMS]

function DesktopMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  // Refs (not state) so the animation loop reads live values without re-rendering.
  const pausedRef = useRef(false)
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })

  // Continuous auto-scroll via scrollLeft. Manual drag (mouse) and native swipe
  // (touch) move the same scrollLeft, so they compose with the auto-scroll.
  useEffect(() => {
    const scroller = scrollerRef.current
    const track = trackRef.current
    if (!scroller || !track) return

    // Left edge of the first card of the duplicate copy — the exact loop period.
    const loopWidth = () => {
      const dup = track.children[MENU_ITEMS.length] as HTMLElement | undefined
      return dup ? dup.offsetLeft : track.scrollWidth / 2
    }

    // Keep scrollLeft inside [0, P) so the loop is seamless and dragging never
    // hits the native scroll clamp at 0.
    const wrap = () => {
      const p = loopWidth()
      if (p <= 0) return
      if (scroller.scrollLeft >= p) scroller.scrollLeft -= p
      else if (scroller.scrollLeft < 0) scroller.scrollLeft += p
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = now - last
      last = now
      // offsetParent is null while hidden at the mobile breakpoint — skip work.
      if (scroller.offsetParent !== null && !reduceMotion && !pausedRef.current && !drag.current.active) {
        // Match the previous marquee cadence: one full copy over n * 5.5s.
        const speedPerMs = loopWidth() / (MENU_ITEMS.length * 5500)
        scroller.scrollLeft += speedPerMs * dt
        wrap()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch swipe is handled natively by the scroll container; only drive mouse.
    if (e.pointerType !== 'mouse') return
    const scroller = scrollerRef.current
    if (!scroller) return
    drag.current = { active: true, startX: e.clientX, startScroll: scroller.scrollLeft }
    scroller.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const scroller = scrollerRef.current
    const track = trackRef.current
    if (!scroller || !track) return
    const dup = track.children[MENU_ITEMS.length] as HTMLElement | undefined
    const p = dup ? dup.offsetLeft : track.scrollWidth / 2
    let target = drag.current.startScroll - (e.clientX - drag.current.startX)
    // Shift the anchor alongside the wrap so dragging stays continuous both ways.
    while (p > 0 && target < 0) { target += p; drag.current.startScroll += p }
    while (p > 0 && target >= p) { target -= p; drag.current.startScroll -= p }
    scroller.scrollLeft = target
  }

  const endDrag = () => {
    drag.current.active = false
  }

  return (
    <div className="relative hidden md:block">
      {/* Left fade to ember-black */}
      <div
        className="absolute left-0 top-0 h-full w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0A0806, transparent)' }}
      />

      {/* Scrollable track: auto-scrolls, drag with mouse, swipe on touch */}
      <div
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto cursor-grab select-none active:cursor-grabbing"
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') pausedRef.current = true }}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') pausedRef.current = false }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTouchStart={() => { pausedRef.current = true }}
        onTouchEnd={() => { pausedRef.current = false }}
      >
        <div ref={trackRef} className="flex gap-5 w-max">
          {LOOP_ITEMS.map((item, i) => (
            <div
              key={i}
              className="relative w-[300px] h-[400px] shrink-0 overflow-hidden group"
            >
              {/* Dish image — zooms under hover blur */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="300px"
                draggable={false}
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
      </div>

      {/* Right fade to ember-black */}
      <div
        className="absolute right-0 top-0 h-full w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0A0806, transparent)' }}
      />
    </div>
  )
}

function MobileSlider() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Active dot follows the snapped slide; width === one slide so index is exact.
  const onScroll = () => {
    const s = scrollerRef.current
    if (!s) return
    const i = Math.round(s.scrollLeft / s.clientWidth)
    setActive((prev) => (prev === i ? prev : i))
  }

  const goTo = (i: number) => {
    const s = scrollerRef.current
    if (!s) return
    s.scrollTo({ left: i * s.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="md:hidden px-6">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {MENU_ITEMS.map((item) => (
          <div key={item.id} className="w-full shrink-0 snap-center">
            {/* Photo — fully visible, nothing on top of it but the category badge */}
            <div className="relative h-[44svh] max-h-[400px] min-h-[260px] w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="100vw"
                draggable={false}
                className="object-cover"
              />
              <div className="absolute top-4 right-4 z-20 bg-ember-gold px-2 py-1 flex items-center justify-center">
                <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-ember-black font-medium leading-none">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Info — below the photo, on the section's dark background */}
            <div className="pt-5">
              <h3 className="font-display text-[24px] font-semibold text-white leading-tight mb-1.5">
                {item.name}
              </h3>
              <p className="font-sans text-[14px] text-white/70 leading-relaxed mb-3">
                {item.description}
              </p>
              <span className="font-sans text-[20px] text-ember-gold font-medium">
                {item.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="mt-6 flex items-center justify-center gap-2.5">
        {MENU_ITEMS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${item.name}`}
            aria-current={active === i ? 'true' : undefined}
            className="group p-2"
          >
            <span
              className={`block h-1.5 transition-all duration-300 ${
                active === i ? 'w-6 bg-ember-gold' : 'w-1.5 bg-white/30 group-hover:bg-white/50'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
