'use client'

import { Globe, Workflow, Cloud, BarChart3, Plug, Brain } from 'lucide-react'
import { useInView } from './useInView'

const services = [
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Full-stack web apps built with modern frameworks. Fast, responsive, and ready for scale.',
  },
  {
    icon: Workflow,
    title: 'Automations & Internal Tools',
    description: 'Replace spreadsheets and manual ops with custom internal tools that save your team hours every week.',
  },
  {
    icon: Cloud,
    title: 'SaaS Platforms',
    description: 'Multi-tenant platforms with billing, auth, and analytics built in from day one.',
  },
  {
    icon: BarChart3,
    title: 'Dashboards & Analytics',
    description: 'Real-time data visualization and monitoring tools that turn data into decisions.',
  },
  {
    icon: Plug,
    title: 'APIs & Integrations',
    description: 'Connect your systems with robust APIs, webhooks, and third-party integrations.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Tools',
    description: 'Intelligent features powered by machine learning and large language models.',
  },
]

export function Services() {
  const { ref, isVisible } = useInView()

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 noise" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-500/[0.03] rounded-full blur-[120px]" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-brand-400 font-mono text-sm tracking-wider uppercase mb-3">
            Services
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            What We <span className="text-gradient-brand">Build</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            From web apps to AI-powered platforms, we build software that solves
            real business problems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`glass-card hover-lift p-6 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : '0ms' }}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
