import { forwardRef } from 'react'
import type { MenuSection } from '@/lib/menu'

interface MenuPageProps {
  section: MenuSection
  dense?: boolean
  pageNumber: number
}

const MenuPage = forwardRef<HTMLDivElement, MenuPageProps>(function MenuPage(
  { section, dense = false, pageNumber },
  ref,
) {
  return (
    <div ref={ref} className="bg-ember-cream h-full w-full overflow-hidden">
      <div
        className={`flex h-full flex-col ${
          dense ? 'px-7 py-9' : 'px-9 py-11 md:px-12 md:py-14'
        }`}
      >
        <header className="text-center mb-7">
          <h3
            className={`font-sans uppercase text-ember-gold-hover ${
              dense ? 'text-[12px] tracking-[0.28em]' : 'text-[13px] tracking-[0.32em]'
            }`}
          >
            {section.section}
          </h3>
          <span className="mx-auto mt-3 block h-px w-10 bg-ember-gold-hover/50" />
        </header>

        <ul className={`flex-1 ${dense ? 'space-y-4' : 'space-y-5'}`}>
          {section.items.map((item) => (
            <li key={item.name}>
              <div className="flex items-baseline gap-3">
                <span
                  className={`whitespace-nowrap font-sans font-medium uppercase tracking-[0.1em] text-ember-warm ${
                    dense ? 'text-[12px]' : 'text-[13px]'
                  }`}
                >
                  {item.name}
                </span>
                <span
                  aria-hidden
                  className="-translate-y-[3px] flex-1 border-b border-dotted border-ember-warm/30"
                />
                <span
                  className={`whitespace-nowrap font-sans text-ember-gold-hover ${
                    dense ? 'text-[12px]' : 'text-[13px]'
                  }`}
                >
                  {item.price}
                </span>
              </div>
              <p
                className={`mt-1 font-sans italic leading-relaxed text-ember-warm/55 ${
                  dense ? 'text-[10.5px]' : 'text-[11px]'
                }`}
              >
                {item.composition}
              </p>
            </li>
          ))}
        </ul>

        <footer className="mt-6 text-center">
          <span className="font-sans text-[10px] tracking-[0.2em] text-ember-warm/40">
            {String(pageNumber).padStart(2, '0')}
          </span>
        </footer>
      </div>
    </div>
  )
})

export default MenuPage
