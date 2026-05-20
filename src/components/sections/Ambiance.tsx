import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { AMBIANCE_IMAGES } from '@/lib/content'

export default function Ambiance() {
  return (
    <section className="bg-ember-warm py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeIn className="mb-14">
          <SectionEyebrow>The Space</SectionEyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white">
            The Experience
          </h2>
          <p className="font-sans text-[17px] text-ember-muted mt-4 max-w-xl leading-relaxed">
            Low light, warm leather, the scent of oak smoke. Every corner of Ember is designed to disappear into the meal.
          </p>
        </FadeIn>

        {/* Gallery grid — 3 rows, fully filled */}
        <div className="grid grid-cols-12 gap-3">

          {/* Row 1: landscape (8) + portrait (4) */}
          <FadeIn className="col-span-12 md:col-span-8">
            <div className="relative h-[400px] overflow-hidden">
              <Image
                src={AMBIANCE_IMAGES[0].src}
                alt={AMBIANCE_IMAGES[0].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </FadeIn>

          <FadeIn className="col-span-12 md:col-span-4" delay={0.1}>
            <div className="relative h-[400px] overflow-hidden">
              <Image
                src={AMBIANCE_IMAGES[1].src}
                alt={AMBIANCE_IMAGES[1].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </FadeIn>

          {/* Row 2: three equal squares (4+4+4) */}
          {AMBIANCE_IMAGES.slice(2, 5).map((img, i) => (
            <FadeIn key={i} className="col-span-12 md:col-span-4" delay={i * 0.08}>
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </FadeIn>
          ))}

          {/* Row 3: portrait (4) + landscape (8) — mirrors row 1 */}
          <FadeIn className="col-span-12 md:col-span-4" delay={0.08}>
            <div className="relative h-[400px] overflow-hidden">
              <Image
                src={AMBIANCE_IMAGES[5].src}
                alt={AMBIANCE_IMAGES[5].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </FadeIn>

          <FadeIn className="col-span-12 md:col-span-8" delay={0.16}>
            <div className="relative h-[400px] overflow-hidden">
              <Image
                src={AMBIANCE_IMAGES[6].src}
                alt={AMBIANCE_IMAGES[6].alt}
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
