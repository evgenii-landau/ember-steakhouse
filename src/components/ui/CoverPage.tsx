import { forwardRef } from 'react'

interface CoverPageProps {
  variant: 'front' | 'back'
}

const CoverPage = forwardRef<HTMLDivElement, CoverPageProps>(function CoverPage(
  { variant },
  ref,
) {
  return (
    // data-density="hard" tells react-pageflip to treat the cover as rigid board
    <div
      ref={ref}
      data-density="hard"
      className="cover-matte relative h-full w-full overflow-hidden"
    >
      {/* Binding spine accent */}
      <span
        aria-hidden
        className={`absolute inset-y-0 w-[6px] ${variant === 'front' ? 'left-0' : 'right-0'}`}
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.5), rgba(200,151,58,0.25), transparent)',
        }}
      />

      {variant === 'front' ? (
        <>
          <div className="flex h-full flex-col justify-between p-10 md:p-12">
            <span className="font-display text-[15px] tracking-[0.28em] text-ember-gold">
              EMBER
            </span>
            <span className="font-display text-[13px] uppercase tracking-[0.42em] text-ember-cream/80">
              Menu
            </span>
          </div>

          {/* "Open" affordance near the lifted corner */}
          <span className="absolute bottom-7 right-10 font-sans text-[9px] uppercase tracking-[0.3em] text-ember-cream/40">
            Open
          </span>

          {/* Peeled bottom-right corner — signals an interactive book */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0"
            style={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 0 52px 52px',
              borderColor: 'transparent transparent rgba(242,237,228,0.12) transparent',
              filter: 'drop-shadow(-3px -3px 5px rgba(0,0,0,0.45))',
            }}
          />
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
          <span className="font-display text-[13px] tracking-[0.3em] text-ember-gold">
            EMBER
          </span>
          <span className="h-px w-8 bg-ember-gold/40" />
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-ember-cream/40">
            Est. 2019 · New York
          </span>
        </div>
      )}
    </div>
  )
})

export default CoverPage
