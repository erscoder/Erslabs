import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export const metadata: Metadata = {
  title: 'Thank You | ErsLabs',
  description: 'Your project request was received. Our team will reply within 24 hours.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <main className="thanks wrap">
      <Link href="/" className="logo-link" aria-label="ErsLabs, back to home">
        <Logo className="logo" />
      </Link>

      <h1>
        Got it. <strong>Talk soon.</strong>
      </h1>
      <p className="lead">
        Your request landed in our inbox. A senior engineer will reply within 24 hours with next steps.
      </p>

      <ol className="steps steps-three">
        <li>
          <h2>We read your brief</h2>
          <p>A person reads it, not a bot.</p>
        </li>
        <li>
          <h2>Reply within 24 hours</h2>
          <p>With questions or a time to talk.</p>
        </li>
        <li>
          <h2>Free intro call</h2>
          <p>A conversation about whether we can solve your problem.</p>
        </li>
      </ol>

      <div className="actions">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <a href="mailto:hello@erslabs.net" className="btn btn-ghost">
          Email us directly
        </a>
      </div>
    </main>
  )
}
