'use client'

import { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { AnimatePresence, motion } from 'framer-motion'
import { FULL_MENU } from '@/lib/menu'
import MenuPage from '@/components/ui/MenuPage'
import CoverPage from '@/components/ui/CoverPage'

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
  flippingTime: 750,
  usePortrait: true,
  startZIndex: 0,
  autoSize: true,
  maxShadowOpacity: 0.6,
  showCover: true,
  mobileScrollSupport: true,
  clickEventForward: true,
  useMouseEvents: true,
  swipeDistance: 30,
  showPageCorners: true,
  disableFlipByClick: false,
} as const

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={direction === 'left' ? 'M10 2L4 8L10 14' : 'M6 2L12 8L6 14'}
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  )
}

export default function MenuModal({ open, onClose }: MenuModalProps) {
  const [mounted, setMounted] = useState(false)

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
      if (e.key === 'ArrowLeft') {
        bookRef.current?.pageFlip().flipPrev()
        return
      }
      if (e.key === 'ArrowRight') {
        bookRef.current?.pageFlip().flipNext()
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

  const flipPrev = () => bookRef.current?.pageFlip().flipPrev()
  const flipNext = () => bookRef.current?.pageFlip().flipNext()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 bg-ember-black/75"
            style={{ backdropFilter: 'blur(10px)' }}
            onClick={onClose}
            aria-hidden
          />

          {/* Floating close */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="absolute right-6 top-6 z-20 p-2 text-ember-cream/60 transition-colors hover:text-ember-gold md:right-10 md:top-10"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>

          {/* Frameless book floating over the backdrop */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Full menu"
            className="relative z-10 w-full max-w-[940px]"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Side arrows (desktop) */}
            <button
              type="button"
              onClick={flipPrev}
              aria-label="Previous page"
              className="absolute -left-12 top-1/2 z-20 hidden -translate-y-1/2 p-2 text-ember-cream/50 transition-colors hover:text-ember-gold md:block"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={flipNext}
              aria-label="Next page"
              className="absolute -right-12 top-1/2 z-20 hidden -translate-y-1/2 p-2 text-ember-cream/50 transition-colors hover:text-ember-gold md:block"
            >
              <ChevronIcon direction="right" />
            </button>

            {mounted && (
              <HTMLFlipBook
                ref={bookRef}
                {...FLIP_SETTINGS}
                renderOnlyPageLengthChange
                className="mx-auto"
                style={{}}
              >
                <CoverPage variant="front" />
                {FULL_MENU.map((section, i) => (
                  <MenuPage
                    key={section.section}
                    section={section}
                    dense
                    pageNumber={i + 1}
                    side={i % 2 === 0 ? 'left' : 'right'}
                  />
                ))}
                <CoverPage variant="back" />
              </HTMLFlipBook>
            )}

            {/* Arrows (mobile) + hint */}
            <div className="mt-7 flex items-center justify-center gap-10 md:hidden">
              <button
                type="button"
                onClick={flipPrev}
                aria-label="Previous page"
                className="p-2 text-ember-cream/50 transition-colors hover:text-ember-gold"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={flipNext}
                aria-label="Next page"
                className="p-2 text-ember-cream/50 transition-colors hover:text-ember-gold"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
            <p className="mt-5 text-center font-sans text-[10px] tracking-[0.18em] text-ember-cream/35">
              Drag a corner or use the arrows to turn the page
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
