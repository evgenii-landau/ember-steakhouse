// src/components/sections/SpecialEvents.tsx
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import Button from '@/components/ui/Button'

export default function SpecialEvents() {
  return (
    <section id="events" className="bg-ember-cream py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <FadeIn>
            <SectionEyebrow light>Private Dining</SectionEyebrow>
            <h2 className="font-display text-[clamp(40px,6vw,72px)] font-bold text-ember-warm leading-tight">
              Host Your Next Event
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="font-sans text-[17px] text-ember-warm/70 leading-relaxed mb-6">
              From intimate corporate dinners to milestone celebrations, Ember&#39;s private dining rooms are designed for moments that matter. We handle every detail — menu curation, florals, wine pairings — so you can focus on your guests.
            </p>
            <ul className="font-sans text-[15px] text-ember-warm/60 space-y-2 mb-10">
              {['Corporate & client entertainment', 'Birthday & anniversary dinners', 'Wedding rehearsal events', 'Buyouts for up to 120 guests'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-ember-gold shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button href="mailto:events@ember-nyc.com">Enquire About Events</Button>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
