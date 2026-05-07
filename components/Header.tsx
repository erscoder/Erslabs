'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Case Study', href: '#case-study' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-space-950/80 backdrop-blur-md border-b border-brand-900/30'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" aria-label="ErsLabs" className="flex items-center gap-2">
          <img src="/logo.svg" alt="ErsLabs" className="h-8 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-brand-400 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-5 py-2 bg-brand-500 hover:bg-brand-400 text-space-950 text-sm font-semibold rounded-lg transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          Get in Touch
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-space-950/95 backdrop-blur-md border-b border-space-700/50">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-brand-400 transition-colors text-lg"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 px-5 py-2.5 bg-brand-500 text-space-950 font-semibold rounded-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
