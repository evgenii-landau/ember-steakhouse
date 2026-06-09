'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useMenuBook } from '@/components/ui/MenuBookProvider'
import { NAV_LINKS } from '@/lib/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openMenu } = useMenuBook()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ember-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="font-display text-2xl font-bold tracking-[0.15em] text-white uppercase"
        >
          Ember
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) =>
            link.label === 'Menu' ? (
              <button
                key={link.href}
                type="button"
                onClick={openMenu}
                className="font-sans text-xs uppercase tracking-[0.15em] text-white/80 hover:text-ember-gold transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs uppercase tracking-[0.15em] text-white/80 hover:text-ember-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden bg-ember-black/98 absolute top-20 left-0 right-0 px-6 py-10 flex flex-col gap-8">
          {NAV_LINKS.map((link) =>
            link.label === 'Menu' ? (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  openMenu()
                }}
                className="text-left font-sans text-sm uppercase tracking-[0.2em] text-white hover:text-ember-gold transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-sm uppercase tracking-[0.2em] text-white hover:text-ember-gold transition-colors"
              >
                {link.label}
              </Link>
            ),
          )}
          <Button variant="outline" href="#reservations" onClick={() => setMenuOpen(false)}>
            Reserve a Table
          </Button>
        </div>
      )}
    </header>
  )
}
