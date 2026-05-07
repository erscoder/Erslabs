export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-space-700/50 relative">
      <div className="absolute inset-0 noise" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="ErsLabs" className="h-7 w-auto" />
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8 text-sm text-slate-500">
            <a href="#services" className="hover:text-brand-400 transition-colors">Services</a>
            <a href="#process" className="hover:text-brand-400 transition-colors">Process</a>
            <a href="#case-study" className="hover:text-brand-400 transition-colors">Case Study</a>
            <a href="#contact" className="hover:text-brand-400 transition-colors">Contact</a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-slate-600">
            &copy; {year} ErsLabs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
