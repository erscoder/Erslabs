'use client'

import { useState, FormEvent } from 'react'

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE'
const ENDPOINT = 'https://api.web3forms.com/submit'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const data = new FormData(e.currentTarget)
    // The redirect field only serves the no-script fallback; with scripting
    // we read the JSON answer and navigate ourselves.
    data.delete('redirect')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
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
    <form className="form" action={ENDPOINT} method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
      <input type="hidden" name="redirect" value="https://erslabs.net/thankyou" />
      <input type="checkbox" name="botcheck" hidden tabIndex={-1} autoComplete="off" />

      <div className="field">
        <label htmlFor="name">
          Name <span aria-hidden="true">*</span>
        </label>
        <input type="text" id="name" name="name" required autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="email">
          Email <span aria-hidden="true">*</span>
        </label>
        <input type="email" id="email" name="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="company">Company or project</label>
        <input type="text" id="company" name="company" autoComplete="organization" />
      </div>

      <div className="field">
        <label htmlFor="budget">Budget range</label>
        <select id="budget" name="budget" defaultValue="">
          <option value="">Select a range</option>
          <option value="1k-3k">€1,000 to €3,000</option>
          <option value="3k-7k">€3,000 to €7,000</option>
          <option value="7k-15k">€7,000 to €15,000</option>
          <option value="15k-30k">€15,000 to €30,000</option>
          <option value="30k+">€30,000+</option>
        </select>
      </div>

      <div className="field field-wide">
        <label htmlFor="message">
          What needs fixing? <span aria-hidden="true">*</span>
        </label>
        <textarea id="message" name="message" required rows={6} aria-describedby="message-help" />
        <p id="message-help" className="help">
          The problem, your timeline and any technical constraints.
        </p>
      </div>

      <div className="form-foot field-wide">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {status === 'error' && (
            <span className="form-error">
              That did not go through. Try again, or write to{' '}
              <a href="mailto:hello@erslabs.net">hello@erslabs.net</a>.
            </span>
          )}
        </p>
      </div>
    </form>
  )
}
