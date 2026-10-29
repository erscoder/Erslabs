'use client'

import { useInView } from './useInView'
import {
  Globe,
  Network,
  Activity,
  Shield,
  Server,
  BarChart3,
  Captions,
  Mic,
  Languages,
  Scissors,
  ScrollText,
  Smartphone,
  Lock,
  ArrowUpRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ProjectFeature = { icon: LucideIcon; text: string }

type ProjectStat = { value: string; label: string }

type Project = {
  name: string
  tagline: string
  badge: string
  urlLabel: string
  href?: string
  icon: LucideIcon
  screenshot: { src: string; alt: string; width: number; height: number }
  challenge: string
  features: ProjectFeature[]
  techTags: string[]
  stats: ProjectStat[]
}

const projects: Project[] = [
  {
    name: 'Synapseia Network',
    tagline: 'Decentralized P2P Network Platform',
    badge: 'SHIPPED',
    urlLabel: 'synapseia.network',
    icon: Network,
    screenshot: {
      src: '/screenshots/synapseia-dashboard.png',
      alt: 'Synapseia Network Dashboard - P2P network management platform with globe visualization and network graph',
      width: 1200,
      height: 750,
    },
    challenge:
      'Build a full-stack platform for managing a decentralized peer-to-peer network. Real-time node monitoring, geographic visualization on a 3D globe, interactive network topology, staking economics, and a comprehensive admin dashboard, all with sub-second latency.',
    features: [
      { icon: Globe, text: 'Real-time globe visualization of node distribution' },
      { icon: Network, text: 'Interactive network topology graph' },
      { icon: Activity, text: 'Live node monitoring and health tracking' },
      { icon: Shield, text: 'Staking management and economic layer' },
      { icon: Server, text: 'P2P gossip protocol with auto-discovery' },
      { icon: BarChart3, text: 'Comprehensive analytics dashboard' },
    ],
    techTags: ['Next.js', 'React', 'TypeScript', 'WebSocket', 'P2P', 'Node.js', 'PostgreSQL', 'Redis'],
    stats: [
      { value: '20', label: 'Nodes Capacity' },
      { value: '24/7', label: 'Uptime Monitoring' },
      { value: '<1s', label: 'Data Latency' },
    ],
  },
  {
    name: 'Capline',
    tagline: 'On-device captions & video editor for Android',
    badge: 'LAUNCHING',
    urlLabel: 'capline.erslabs.net',
    href: 'https://capline.erslabs.net',
    icon: Captions,
    screenshot: {
      src: '/screenshots/capline-landing.png',
      alt: 'Capline landing page - on-device captions and video editor for Android',
      width: 1200,
      height: 750,
    },
    challenge:
      'Build a mobile video editor that turns a raw clip into a captioned, ready-to-post vertical video without sending audio or text to any server. Speech recognition, translation, caption rendering and export all run on the phone, plus a full-screen teleprompter and voiceover for creators who record their own scripts.',
    features: [
      { icon: Mic, text: 'On-device speech-to-text captions with whisper.cpp' },
      { icon: Languages, text: 'Caption templates and bilingual subtitles, translated on the phone' },
      { icon: Scissors, text: 'AI Cut: removes silences and dead air automatically' },
      { icon: ScrollText, text: 'Full-screen teleprompter with voiceover recording' },
      { icon: Smartphone, text: 'Vertical 9:16 export ready for Reels, Shorts and TikTok' },
      { icon: Lock, text: 'Capline Pro through Google Play Billing' },
    ],
    techTags: ['Kotlin', 'Jetpack Compose', 'Media3', 'whisper.cpp', 'ML Kit', 'Hilt', 'Coroutines', 'Play Billing'],
    stats: [
      { value: '100%', label: 'On-device AI' },
      { value: '0 bytes', label: 'Audio Uploaded' },
      { value: 'Android 8+', label: 'Compatibility' },
    ],
  },
]

function ProjectCard({ project }: { project: Project }) {
  const { ref, isVisible } = useInView()

  const screenshotBlock = (
    <div className="rounded-xl border border-space-700/50 overflow-hidden bg-space-950 group">
      {/* Browser chrome */}
      <div className="px-4 py-2.5 bg-space-800/80 border-b border-space-700/50 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="ml-2 flex-1 px-3 py-1 rounded-md bg-space-900/80 text-xs font-mono text-slate-500">
          {project.urlLabel}
        </div>
      </div>
      {/* Screenshot image */}
      <div className="overflow-hidden">
        <img
          src={project.screenshot.src}
          alt={project.screenshot.alt}
          width={project.screenshot.width}
          height={project.screenshot.height}
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </div>
  )

  return (
    <div
      ref={ref}
      className={`max-w-5xl mx-auto rounded-2xl border border-space-700/50 bg-space-900/80 backdrop-blur-sm overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-space-700/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 p-[1px]">
            <div className="w-full h-full rounded-xl bg-space-900 flex items-center justify-center">
              <project.icon className="w-5 h-5 text-brand-400" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{project.name}</h3>
            <p className="text-xs font-mono text-slate-500">{project.tagline}</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
          {project.badge}
        </span>
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Screenshot */}
        <div className="p-6 md:p-8">
          {project.href ? (
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
              {screenshotBlock}
            </a>
          ) : (
            screenshotBlock
          )}
        </div>

        {/* Details */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <h4 className="text-xs font-mono text-brand-400 uppercase tracking-wider mb-4">
            The Challenge
          </h4>
          <p className="text-slate-400 leading-relaxed mb-6">{project.challenge}</p>

          <h4 className="text-xs font-mono text-brand-400 uppercase tracking-wider mb-4">
            Key Features
          </h4>
          <div className="grid grid-cols-1 gap-2.5 mb-6">
            {project.features.map((feature) => (
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
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[11px] font-mono text-brand-300/80 bg-brand-500/5 border border-brand-500/15 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-400 hover:text-brand-300"
            >
              Visit {project.urlLabel}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Footer stats */}
      <div className="px-6 py-4 border-t border-space-700/50 bg-space-800/30 grid grid-cols-3 gap-4 text-center">
        {project.stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-[11px] font-mono text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 noise" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-500/[0.03] rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-400 font-mono text-sm tracking-wider uppercase mb-3">
            Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Real Projects, <span className="text-gradient-brand">Real Results</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Platforms we build for clients and products we ship ourselves.
          </p>
        </div>

        {/* Project cards */}
        <div className="space-y-10">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
