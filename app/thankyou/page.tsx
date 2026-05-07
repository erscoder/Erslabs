import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thank You | ErsLabs',
  description: 'Your project request was received. Our team will reply within 24 hours.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 noise" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-brand-500/[0.08] blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-brand-400/[0.04] blur-[100px]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center py-20">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 animate-slide-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
          </span>
          <span className="text-xs font-mono text-brand-300 tracking-wide">
            Request Received
          </span>
        </div>

        <div className="w-20 h-20 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto mb-8 animate-slide-up">
          <CheckCircle className="w-10 h-10 text-brand-400" />
        </div>

        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95] mb-6 animate-slide-up">
          Got it. <span className="text-gradient-brand">Talk soon.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-4 leading-relaxed animate-fade-in">
          Your request landed in our inbox. A senior engineer will reply within
          <span className="text-white font-semibold"> 24 hours</span> with next steps.
        </p>

        <p className="text-sm text-slate-500 max-w-md mx-auto mb-12 animate-fade-in">
          No bots. No sales pitch. Just a real conversation about whether we can solve your problem.
        </p>

        <div className="grid sm:grid-cols-3 max-w-2xl mx-auto gap-4 mb-12 animate-fade-in">
          {[
            { step: '01', label: 'We read your brief' },
            { step: '02', label: 'Reply within 24h' },
            { step: '03', label: 'Free intro call' },
          ].map((s) => (
            <div
              key={s.step}
              className="glass-card p-5 text-left"
            >
              <div className="text-xs font-mono text-brand-400 mb-1">{s.step}</div>
              <div className="text-sm text-slate-300 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
          <Link
            href="/"
            className="group px-8 py-3.5 border border-space-600 hover:border-brand-500/50 text-slate-300 hover:text-white font-medium rounded-lg transition-all"
          >
            <ArrowLeft className="mr-2 w-4 h-4 inline-block transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
          <a
            href="mailto:hello@erslabs.net"
            className="group px-8 py-3.5 bg-brand-500 hover:bg-brand-400 text-space-950 font-bold rounded-lg transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            <Mail className="mr-2 w-4 h-4 inline-block" />
            Email us directly
          </a>
        </div>

        <p className="mt-12 text-xs font-mono text-slate-600">
          ErsLabs · Custom Software Engineering · erslabs.net
        </p>
      </div>
    </main>
  )
}
