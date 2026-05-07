'use client'

import { useState, FormEvent } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useInView } from './useInView'

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE'

export function ContactForm() {
  const { ref, isVisible } = useInView()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)
    data.append('access_key', WEB3FORMS_KEY)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        window.location.href = '/thankyou'
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-space-900/30 relative overflow-hidden">
      <div className="absolute inset-0 noise" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/[0.04] rounded-full blur-[120px]" />

      <div ref={ref} className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-brand-400 font-mono text-sm tracking-wider uppercase mb-3">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Let&apos;s Build Something <span className="text-gradient-brand">Great</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div
          className={`glass-card p-8 md:p-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div aria-live="polite">
          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-brand-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-slate-400">
                We&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-brand-400 hover:text-brand-300 font-medium transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name <span className="text-brand-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-space-800/80 border border-space-700/50 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email <span className="text-brand-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-space-800/80 border border-space-700/50 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                    Company / Project
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-lg bg-space-800/80 border border-space-700/50 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-slate-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-4 py-3 rounded-lg bg-space-800/80 border border-space-700/50 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                  >
                    <option value="">Select a range</option>
                    <option value="1k-3k">€1,000 to €3,000</option>
                    <option value="3k-7k">€3,000 to €7,000</option>
                    <option value="7k-15k">€7,000 to €15,000</option>
                    <option value="15k-30k">€15,000 to €30,000</option>
                    <option value="30k+">€30,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Tell us about your project <span className="text-brand-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-space-800/80 border border-space-700/50 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all resize-none"
                  placeholder="Describe the problem you're trying to solve, your timeline, and any technical requirements..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-3.5 bg-brand-500 hover:bg-brand-400 disabled:bg-brand-700 disabled:cursor-not-allowed text-space-950 font-bold rounded-lg transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-space-950/30 border-t-space-950 rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
          </div>
        </div>
      </div>
    </section>
  )
}
