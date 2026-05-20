import Link from 'next/link'
import { NAV_LINKS, CONTACT_INFO } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="bg-ember-black border-t border-ember-border">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-14">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-10">

          {/* Logo */}
          <Link href="#" className="font-display text-2xl font-bold tracking-[0.15em] text-white uppercase">
            Ember
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[11px] uppercase tracking-[0.15em] text-ember-muted hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-5">
            <a href={CONTACT_INFO.social.instagram} target="_blank" rel="noopener noreferrer"
              aria-label="Instagram" className="text-ember-muted hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={CONTACT_INFO.social.facebook} target="_blank" rel="noopener noreferrer"
              aria-label="Facebook" className="text-ember-muted hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-ember-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[12px] text-ember-muted">
            Crafted with passion in New York City
          </p>
          <p className="font-sans text-[12px] text-ember-muted">
            &copy; {new Date().getFullYear()} Ember Restaurant. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
