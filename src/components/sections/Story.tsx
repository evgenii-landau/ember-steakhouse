import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { STORY_STATS } from '@/lib/content'

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
            <div className="flex gap-10">
              {STORY_STATS.map((stat, i) => (
                <div key={i} className={`${i > 0 ? 'pl-10 border-l border-ember-warm/20' : ''}`}>
                  <div className="font-display text-[40px] font-bold text-ember-gold leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-ember-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
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
