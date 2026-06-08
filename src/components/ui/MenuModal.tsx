'use client'

import { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { AnimatePresence, motion } from 'framer-motion'
import { FULL_MENU } from '@/lib/menu'
import MenuPage from '@/components/ui/MenuPage'

interface MenuModalProps {
  open: boolean
  onClose: () => void
}

interface PageFlipApi {
  flipNext: () => void
  flipPrev: () => void
}
interface FlipBookRef {
  pageFlip: () => PageFlipApi
}

// react-pageflip requires every FlipSetting field; defined once and reused.
const FLIP_SETTINGS = {
  startPage: 0,
  size: 'stretch',
  width: 440,
  height: 600,
  minWidth: 300,
  maxWidth: 460,
  minHeight: 400,
  maxHeight: 640,
  drawShadow: true,
  flippingTime: 700,
  usePortrait: true,
  startZIndex: 0,
  autoSize: true,
  maxShadowOpacity: 0.5,
  showCover: false,
  mobileScrollSupport: true,
  clickEventForward: true,
  useMouseEvents: true,
  swipeDistance: 30,
  showPageCorners: true,
  disableFlipByClick: false,
} as const

export default function MenuModal({ open, onClose }: MenuModalProps) {
  const [mounted, setMounted] = useState(false)
  const [page, setPage] = useState(0)

  const bookRef = useRef<FlipBookRef | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return

    restoreFocusRef.current = document.activeElement as HTMLElement | null
    closeBtnRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      restoreFocusRef.current?.focus?.()
    }
  }, [open, onClose])

  const currentSection = FULL_MENU[page]?.section ?? ''

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ember-black/80"
            style={{ backdropFilter: 'blur(8px)' }}
            onClick={onClose}
            aria-hidden
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Full menu"
            className="relative z-10 flex max-h-[92vh] w-full max-w-[1000px] flex-col border border-ember-border bg-ember-warm"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Header */}
            <header className="flex items-center justify-between border-b border-ember-border px-6 py-5 md:px-8">
              <div>
                <span className="block font-sans text-[10px] uppercase tracking-[0.3em] text-ember-gold">
                  Ember Steakhouse
                </span>
                <h2 className="font-display text-[26px] font-bold leading-tight text-white">
                  The Full Menu
                </h2>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="border border-ember-border p-2 text-ember-muted transition-colors hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </header>

            {/* Body */}
            <div className="relative flex-1 overflow-y-auto bg-ember-black px-4 py-8 md:px-10 md:py-12">
              <div className="mx-auto w-full max-w-[940px]">
                {mounted && (
                  <HTMLFlipBook
                    ref={bookRef}
                    {...FLIP_SETTINGS}
                    renderOnlyPageLengthChange
                    className="mx-auto"
                    style={{}}
                    onFlip={(e: { data: number }) => setPage(e.data)}
                  >
                    {FULL_MENU.map((section, i) => (
                      <MenuPage key={section.section} section={section} dense pageNumber={i + 1} />
                    ))}
                  </HTMLFlipBook>
                )}

                {/* Book navigation */}
                <div className="mt-8 flex items-center justify-center gap-8">
                  <button
                    type="button"
                    onClick={() => bookRef.current?.pageFlip().flipPrev()}
                    aria-label="Previous page"
                    className="border border-ember-border p-3 text-ember-muted transition-colors hover:border-ember-gold hover:text-ember-gold"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                  <span className="min-w-[120px] text-center font-sans text-[11px] uppercase tracking-[0.2em] text-ember-muted">
                    {currentSection}
                  </span>
                  <button
                    type="button"
                    onClick={() => bookRef.current?.pageFlip().flipNext()}
                    aria-label="Next page"
                    className="border border-ember-border p-3 text-ember-muted transition-colors hover:border-ember-gold hover:text-ember-gold"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </div>
                <p className="mt-4 text-center font-sans text-[10px] tracking-[0.15em] text-ember-muted/60">
                  Drag a corner or use the arrows to turn the page
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
