'use client'

import { Zap, Shield, Handshake } from 'lucide-react'
import { useInView } from './useInView'

const differentiators = [
  {
    icon: Zap,
    title: 'Speed',
    description: 'From concept to production in weeks, not months. We move fast without cutting corners.',
  },
  {
    icon: Shield,
    title: 'Quality',
    description: 'Production-grade code with security, testing, and code review built into every sprint.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description: "We're not just vendors. We're your tech team, invested in your success long after launch.",
  },
]

export function WhyUs() {
  const { ref, isVisible } = useInView()

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 noise" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/[0.02] rounded-full blur-[120px]" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-brand-400 font-mono text-sm tracking-wider uppercase mb-3">
            Why ErsLabs
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Built Different, <span className="text-gradient-brand">On Purpose</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We combine startup speed with enterprise quality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((item, i) => (
            <div
              key={item.title}
              className={`glass-card p-8 text-center transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : '0ms' }}
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-brand-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
