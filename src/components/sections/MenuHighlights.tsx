import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import Button from '@/components/ui/Button'
import { MENU_ITEMS } from '@/lib/content'

export default function MenuHighlights() {
  return (
    <section id="menu" className="bg-ember-black py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeIn className="text-center mb-16">
          <SectionEyebrow>What We Serve</SectionEyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white">
            Signature Dishes
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {MENU_ITEMS.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.1}>
              <div className="bg-ember-warm group overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-ember-gold px-2 py-1">
                    <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-ember-black font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-[19px] font-semibold text-white leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-sans text-[15px] text-ember-gold font-medium ml-4 shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="font-sans text-[13px] text-ember-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center">
          <Button variant="outline">View Full Menu</Button>
        </FadeIn>

      </div>
    </section>
  )
}
