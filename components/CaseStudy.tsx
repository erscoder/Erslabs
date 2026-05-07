'use client'

import { useInView } from './useInView'
import { Globe, Network, Activity, Shield, Server, BarChart3 } from 'lucide-react'

const features = [
  { icon: Globe, text: 'Real-time globe visualization of node distribution' },
  { icon: Network, text: 'Interactive network topology graph' },
  { icon: Activity, text: 'Live node monitoring and health tracking' },
  { icon: Shield, text: 'Staking management and economic layer' },
  { icon: Server, text: 'P2P gossip protocol with auto-discovery' },
  { icon: BarChart3, text: 'Comprehensive analytics dashboard' },
]

const techTags = ['Next.js', 'React', 'TypeScript', 'WebSocket', 'P2P', 'Node.js', 'PostgreSQL', 'Redis']

export function CaseStudy() {
  const { ref, isVisible } = useInView()

  return (
    <section id="case-study" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 noise" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-500/[0.03] rounded-full blur-[100px]" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-400 font-mono text-sm tracking-wider uppercase mb-3">
            Case Study
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Real Projects, <span className="text-gradient-brand">Real Results</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            See what we built for our clients.
          </p>
        </div>

        {/* Case study card */}
        <div
          className={`max-w-5xl mx-auto rounded-2xl border border-space-700/50 bg-space-900/80 backdrop-blur-sm overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Header bar */}
          <div className="px-6 py-4 border-b border-space-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 p-[1px]">
                <div className="w-full h-full rounded-xl bg-space-900 flex items-center justify-center">
                  <Network className="w-5 h-5 text-brand-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Synapseia Network</h3>
                <p className="text-xs font-mono text-slate-500">Decentralized P2P Network Platform</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              SHIPPED
            </span>
          </div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Screenshot */}
            <div className="p-6 md:p-8">
              <div className="rounded-xl border border-space-700/50 overflow-hidden bg-space-950 group">
                {/* Browser chrome */}
                <div className="px-4 py-2.5 bg-space-800/80 border-b border-space-700/50 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="ml-2 flex-1 px-3 py-1 rounded-md bg-space-900/80 text-xs font-mono text-slate-500">
                    synapseia.network
                  </div>
                </div>
                {/* Screenshot image */}
                <div className="overflow-hidden">
                  <img
                    src="/screenshots/synapseia-dashboard.png"
                    alt="Synapseia Network Dashboard - P2P network management platform with globe visualization and network graph"
                    width={1200}
                    height={750}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h4 className="text-xs font-mono text-brand-400 uppercase tracking-wider mb-4">
                The Challenge
              </h4>
              <p className="text-slate-400 leading-relaxed mb-6">
                Build a full-stack platform for managing a decentralized peer-to-peer
                network. Real-time node monitoring, geographic visualization on a 3D
                globe, interactive network topology, staking economics, and a
                comprehensive admin dashboard, all with sub-second latency.
              </p>

              <h4 className="text-xs font-mono text-brand-400 uppercase tracking-wider mb-4">
                Key Features
              </h4>
              <div className="grid grid-cols-1 gap-2.5 mb-6">
                {features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <feature.icon className="w-4 h-4 text-brand-400 flex-shrink-0" />
                    {feature.text}
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-mono text-brand-400 uppercase tracking-wider mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-[11px] font-mono text-brand-300/80 bg-brand-500/5 border border-brand-500/15 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer stats */}
          <div className="px-6 py-4 border-t border-space-700/50 bg-space-800/30 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-white">20</div>
              <div className="text-[11px] font-mono text-slate-500">Nodes Capacity</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">24/7</div>
              <div className="text-[11px] font-mono text-slate-500">Uptime Monitoring</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">&lt;1s</div>
              <div className="text-[11px] font-mono text-slate-500">Data Latency</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
