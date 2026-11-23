import { ContactForm } from '@/components/ContactForm'
import { Logo } from '@/components/Logo'
import { TyreLab } from '@/components/TyreLab'

const services = [
  {
    title: 'Web applications',
    text: 'Full-stack apps your customers log into. Fast on a phone and ready for real traffic.',
  },
  {
    title: 'SaaS platforms',
    text: 'Multi-tenant products with billing, auth and analytics in place from the first release.',
  },
  {
    title: 'Dashboards and analytics',
    text: 'Live views of the numbers you run the business on, fed straight from your own data.',
  },
  {
    title: 'Internal tools and automation',
    text: 'Custom tools that replace the spreadsheet and the manual step your team repeats every week.',
  },
  {
    title: 'APIs and integrations',
    text: 'Your systems talking to each other through APIs, webhooks and third-party services.',
  },
  {
    title: 'AI features',
    text: 'Language-model features wired into your product, with tests around them.',
  },
]

const f1Figures = [
  { value: '500 Hz', label: 'rigid-body physics step, in a Web Worker' },
  { value: '21', label: 'AI drivers on the same vehicle model as the player' },
  { value: '15', label: 'real 2026-calendar circuits, each within ±1% of official length' },
  { value: '19 days', label: 'to build it, start to finish' },
  { value: '858', label: 'commits through automated merge gates' },
  { value: '~2,300', label: 'unit tests, plus 233 end-to-end tests' },
]

const steps = [
  {
    title: 'Discover',
    text: 'A free call about the business, the users and the bottleneck. No code until we understand it.',
  },
  {
    title: 'Design',
    text: 'Wireframes and a prototype you can click, so we agree on what gets built.',
  },
  {
    title: 'Build',
    text: 'Weekly demos of working software. You see progress every week.',
  },
  {
    title: 'Launch',
    text: 'Deploy, monitor, iterate. We stay with you after launch.',
  },
]

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="wrap site-header-row">
          <a href="#top" className="logo-link" aria-label="ErsLabs, back to top">
            <Logo className="logo" />
          </a>
          <nav aria-label="Primary" className="site-nav">
            <a href="#services">Services</a>
            <a href="#projects">Lab</a>
            <a href="#process">Process</a>
          </nav>
          <a href="#contact" className="btn btn-primary btn-small">
            Book a free call
          </a>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero wrap">
          <div className="hero-copy">
            <h1>
              A software lab <strong>that ships.</strong>
            </h1>
            <p className="lead">
              Custom web apps, SaaS, dashboards, internal tools and AI features. Built by senior engineers,
              in production in weeks.
            </p>
            <div className="actions">
              <a href="#contact" className="btn btn-primary">
                Book a free call
              </a>
              <a href="#projects" className="btn btn-ghost">
                See what we shipped
              </a>
            </div>
          </div>
          <TyreLab />
        </section>

        <section id="services" className="section wrap">
          <h2 className="reveal">What we build for clients</h2>
          <p className="section-lead reveal">
            You describe the bottleneck. We ship the software that removes it.
          </p>
          <ul className="services">
            {services.map((s) => (
              <li key={s.title} className="reveal">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="statement" aria-label="How we work with clients">
          <p className="wrap reveal">
            <strong>Senior engineers</strong> own your project from the first call. Production{' '}
            <strong>in weeks, not quarters</strong>. And a <strong>direct line to the founders</strong>, with
            no account manager in between.
          </p>
        </section>

        <section id="projects" className="section wrap">
          <h2 className="reveal">What the lab ships</h2>
          <p className="section-lead reveal">Products we design, build and run ourselves.</p>

          <article className="product product-f1 reveal">
            <div className="product-copy">
              <h3>F1 ULTIMATE</h3>
              <p className="status">No public URL yet</p>
              <p>
                A browser Formula 1 racing simulator in Three.js and TypeScript. The vehicle model covers
                Pacejka tyres, aero, an 8-speed gearbox, tyre temperature and wear, and damage. Circuits are
                generated from OpenStreetMap and DEM/LiDAR elevation data.
              </p>
              <p>
                Built by AI coding agents orchestrated through specs, cross-model review and automated merge
                gates.
              </p>
            </div>
            <dl className="figures">
              {f1Figures.map((f) => (
                <div key={f.value}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="product product-capline reveal">
            <a className="shot" href="https://capline.erslabs.net" aria-label="Open the Capline website">
              <img
                src="/screenshots/capline-landing-1200.webp"
                srcSet="/screenshots/capline-landing-720.webp 720w, /screenshots/capline-landing-1200.webp 1200w"
                sizes="(min-width: 900px) 56vw, 100vw"
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                alt="The Capline website: captions that write themselves, on your phone"
              />
            </a>
            <div className="product-copy">
              <h3>Capline</h3>
              <p className="status">Launching</p>
              <p>
                An Android video editor that writes the captions on the device. Speech recognition runs
                locally with whisper.cpp, so no audio leaves the phone.
              </p>
              <p className="stack">Kotlin, Jetpack Compose, Media3, Hilt</p>
              <a className="text-link" href="https://capline.erslabs.net">
                capline.erslabs.net
              </a>
            </div>
          </article>

          <article className="product product-synapseia reveal">
            <div className="product-head">
              <div className="product-copy">
                <h3>Synapseia Network</h3>
                <p className="status">Shipped engineering</p>
                <p>
                  A peer-to-peer compute network where operators lend CPU and GPU to autonomous AI research
                  agents.
                </p>
              </div>
              <ul className="parts">
                <li>NestJS coordinator</li>
                <li>LangGraph agents on Ollama, over a libp2p mesh</li>
                <li>Tauri and Rust desktop app</li>
                <li>Four Solana Anchor programs</li>
                <li>Next.js dashboard</li>
              </ul>
              <dl className="figures figures-pair">
                <div>
                  <dt>commits</dt>
                  <dd>2,300+</dd>
                </div>
                <div>
                  <dt>automated tests</dt>
                  <dd>9,300+</dd>
                </div>
              </dl>
            </div>
            <div className="shot">
              <img
                src="/screenshots/synapseia-dashboard-1720.webp"
                srcSet="/screenshots/synapseia-dashboard-960.webp 960w, /screenshots/synapseia-dashboard-1720.webp 1720w"
                sizes="(min-width: 1400px) 1320px, 94vw"
                width={1720}
                height={950}
                loading="lazy"
                decoding="async"
                alt="The Synapseia Network dashboard: compute units, active nodes, the peer-to-peer network and a node graph"
              />
            </div>
          </article>
        </section>

        <section id="process" className="section wrap">
          <h2 className="reveal">From first call to production</h2>
          <ol className="steps">
            {steps.map((s) => (
              <li key={s.title} className="reveal">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="section contact wrap">
          <div className="contact-copy">
            <h2>Book a free call</h2>
            <p className="section-lead">
              Tell us what is slowing you down. We reply within 24 hours with next steps.
            </p>
            <dl className="contact-facts">
              <div>
                <dt>Email</dt>
                <dd>
                  <a className="text-link" href="mailto:hello@erslabs.net">
                    hello@erslabs.net
                  </a>
                </dd>
              </div>
              <div>
                <dt>Founder</dt>
                <dd>
                  Enrique Rubio,{' '}
                  <a className="text-link" href="https://erscoder.com">
                    erscoder.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap site-footer-row">
          <Logo className="logo" />
          <nav aria-label="Footer">
            <a href="#services">Services</a>
            <a href="#projects">Lab</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
            <a href="https://erscoder.com">erscoder.com</a>
          </nav>
          <p>© 2026 ErsLabs</p>
        </div>
      </footer>
    </>
  )
}
