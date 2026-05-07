'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'

const ROTATING_WORDS = [
  'Fixes Your Problem',
  'Unblocks Your Team',
  'Ships Your Idea',
  'Grows Revenue',
  'Replaces 5 Tools',
]

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 noise" />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full bg-brand-500/[0.07] blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-400/[0.04] blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-500/[0.03] blur-[140px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/20 bg-brand-500/5 animate-slide-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
          </span>
          <span className="text-xs font-mono text-brand-300 tracking-wide">
            Custom Software Engineering · Booking Q3
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6 animate-slide-up">
          We Build Whatever{' '}
          <span className="text-gradient-brand relative inline-block min-w-[280px] md:min-w-[560px]">
            <span
              className={`transition-all duration-300 inline-block ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed animate-fade-in">
          Web apps, SaaS, dashboards, internal tools, AI features, integrations.
          Whatever it takes to solve the problem.{' '}
          <span className="text-slate-200 font-semibold">
            Senior engineers. Production in weeks, not quarters.
          </span>
        </p>
        <p className="text-sm text-slate-500 max-w-xl mx-auto mb-12 animate-fade-in">
          You describe the bottleneck. We ship the software that removes it.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
          <a
            href="#contact"
            className="group relative px-8 py-3.5 bg-brand-500 hover:bg-brand-400 text-space-950 font-bold rounded-lg transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            Book a Free Call
            <ArrowRight className="ml-2 w-4 h-4 inline-block transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#case-study"
            className="px-8 py-3.5 border border-space-600 hover:border-brand-500/50 text-slate-300 hover:text-white font-medium rounded-lg transition-all"
          >
            See Recent Work
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 max-w-lg mx-auto gap-8 animate-fade-in">
          {[
            { value: 'Weeks', label: 'To Production' },
            { value: 'Senior', label: 'Engineers Only' },
            { value: 'Direct', label: 'Line to Founders' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white tracking-tight">{stat.value}</div>
              <div className="text-xs text-slate-500 font-mono mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDown className="w-5 h-5 text-slate-600" />
      </div>
    </section>
  )
}
