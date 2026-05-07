'use client'

import { Search, Palette, Code2, Rocket } from 'lucide-react'
import { useInView } from './useInView'

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We learn your business, users, and goals. Deep understanding before a single line of code.',
  },
  {
    num: '02',
    icon: Palette,
    title: 'Design',
    description: 'UI/UX design that your users will love. Wireframes, prototypes, and visual identity.',
  },
  {
    num: '03',
    icon: Code2,
    title: 'Build',
    description: 'Agile development with weekly demos. You see progress every step of the way.',
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Launch',
    description: 'Deploy, monitor, and iterate. We stay with you after launch to ensure success.',
  },
]

export function Process() {
  const { ref, isVisible } = useInView()

  return (
    <section id="process" className="py-24 md:py-32 bg-space-900/30 relative">
      <div className="absolute inset-0 noise" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-brand-400 font-mono text-sm tracking-wider uppercase mb-3">
            Process
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            How We <span className="text-gradient-brand">Work</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 md:gap-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`relative text-center md:text-left transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : '0ms' }}
            >
              {/* Step number */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-brand-500/10 text-brand-400 font-semibold">
                  {step.num}
                </span>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto md:mx-0 mb-4">
                <step.icon className="w-6 h-6 text-brand-400" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>

              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[5.5rem] -right-2 w-[calc(100%-3rem)] h-px">
                  <div className="w-full h-px bg-gradient-to-r from-brand-500/30 to-brand-500/5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
