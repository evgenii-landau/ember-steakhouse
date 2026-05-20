import FadeIn from '@/components/ui/FadeIn'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { CONTACT_INFO } from '@/lib/content'

export default function Contacts() {
  return (
    <section id="contact" className="bg-ember-black py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeIn className="mb-14">
          <SectionEyebrow>Find Us</SectionEyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white">
            Come Find Us
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-ember-border">

            {/* Address */}
            <div className="md:pr-12">
              <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-ember-gold mb-4">Location</div>
              {CONTACT_INFO.address.split('\n').map((line, i) => (
                <p key={i} className="font-sans text-[16px] text-white/80">{line}</p>
              ))}
            </div>

            {/* Hours */}
            <div className="md:px-12">
              <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-ember-gold mb-4">Hours</div>
              {CONTACT_INFO.hours.split('\n').map((line, i) => (
                <p key={i} className="font-sans text-[15px] text-white/80 leading-relaxed">{line}</p>
              ))}
            </div>

            {/* Contact */}
            <div className="md:pl-12">
              <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-ember-gold mb-4">Contact</div>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                className="block font-sans text-[16px] text-white/80 hover:text-ember-gold transition-colors mb-2"
              >
                {CONTACT_INFO.phone}
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="block font-sans text-[15px] text-white/60 hover:text-ember-gold transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

          </div>
        </FadeIn>

      </div>
    </section>
  )
}
