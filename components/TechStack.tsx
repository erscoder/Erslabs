'use client'

import { useInView } from './useInView'

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native',
  'Node.js', 'Python', 'Rust',
  'PostgreSQL', 'Redis', 'MongoDB',
  'Docker', 'AWS', 'Cloudflare', 'Vercel', 'Stripe',
]

export function TechStack() {
  const { ref, isVisible } = useInView()

  return (
    <section className="py-24 md:py-32 bg-space-900/30 relative overflow-hidden">
      <div className="absolute inset-0 noise" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-brand-400 font-mono text-sm tracking-wider uppercase mb-3">
            Tech Stack
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Technologies We <span className="text-gradient-brand">Master</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We pick the right tool for each project. Here are some of our favorites.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech, i) => (
            <div
              key={tech}
              className={`px-5 py-2.5 rounded-lg border border-space-700/50 bg-space-900/60 backdrop-blur-sm
                text-sm font-medium text-slate-300 hover:border-brand-500/40 hover:text-brand-300
                transition-all duration-300 cursor-default
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: isVisible ? `${i * 50}ms` : '0ms' }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
