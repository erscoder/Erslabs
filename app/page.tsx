import { ContactForm } from '@/components/ContactForm'
import { Logo } from '@/components/Logo'
import { Reactor } from '@/components/Reactor'
import { SceneRail } from '@/components/SceneRail'

// One entry per scene. The order is the order of the [data-scene] sections
// and of SCENES in lib/reactor/engine.ts.
const scenes = [
  { id: 'top', label: 'Reagent' },
  { id: 'studio', label: 'Studio' },
  { id: 'f1', label: 'F1 ULTIMATE' },
  { id: 'capline', label: 'Capline' },
  { id: 'synapseia', label: 'Synapseia Network' },
  { id: 'menhir', label: 'Menhir' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

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

const menhirFigures = [
  { value: '16,224', label: 'bytes in one signature, against 64 for Schnorr' },
  { value: '237', label: 'payments in a full block of 4,000,000 weight units' },
  { value: '253.59 µs', label: 'to verify one signature' },
  { value: '278.83 ms', label: 'to sign one payment' },
  { value: '66 / 66', label: 'NIST ACVP vectors passed' },
  { value: '100 / 100', label: 'signatures cross-checked with OpenSSL, in each direction' },
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

function Flask() {
  return (
    <svg className="flask-still" viewBox="0 0 112 150" fill="none" aria-hidden="true">
      <g stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 32 38 L 64 38 M 38 38 L 38 66 L 12 124 Q 8 138 22 138 L 90 138 Q 104 138 100 124 L 64 66 L 64 38" />
        <path d="M 22 102 Q 32 96 50 98 T 88 102" strokeWidth="1.2" />
      </g>
      <path
        d="M 22 102 Q 32 96 50 98 T 88 102 L 96 124 Q 96 134 86 134 L 24 134 Q 14 134 14 124 Z"
        fill="#10B981"
        fillOpacity="0.18"
      />
      <circle cx="32" cy="86" r="2" fill="#10B981" fillOpacity="0.7" />
      <circle cx="48" cy="74" r="1.5" fill="#10B981" fillOpacity="0.6" />
      <circle cx="42" cy="58" r="1.2" fill="#10B981" fillOpacity="0.5" />
      <circle cx="56" cy="48" r="1" fill="#10B981" fillOpacity="0.4" />
      <circle cx="52" cy="32" r="1.1" fill="#10B981" fillOpacity="0.3" />
    </svg>
  )
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <Reactor />
      <div className="veil" aria-hidden="true" />

      <header className="top">
        <a href="#top" className="logo-link" aria-label="ErsLabs, back to top">
          <Logo className="logo" />
        </a>
        <a href="#contact" className="btn btn-primary btn-small">
          Book a free call
        </a>
      </header>

      <SceneRail items={scenes} />

      <p className="hud" aria-hidden="true">
        <span data-hud-scene>00 / Reagent</span>
        <span data-hud-count>WebGL2</span>
        <span className="hud-hint">move to stir · click to pulse</span>
      </p>

      <main id="main">
        <section id="top" data-scene="Reagent" className="scene scene-l hero">
          <Flask />
          <div className="col">
            <p className="tag">
              <span>00</span> ErsLabs, a software lab
            </p>
            <h1>
              Raw problem in. <strong>Shipped software</strong> out.
            </h1>
            <p className="lead">
              Custom web apps, SaaS, dashboards, internal tools, AI features and integrations. Built by senior
              engineers, in production in weeks.
            </p>
            <div className="actions">
              <a href="#contact" className="btn btn-primary">
                Book a free call
              </a>
              <a href="#f1" className="btn btn-ghost">
                See what the lab shipped
              </a>
            </div>
            <p className="cue">Scroll to run the reaction</p>
          </div>
        </section>

        <section id="studio" data-scene="Studio" className="scene scene-r">
          <div className="col">
            <p className="tag">
              <span>01</span> The studio, for clients
            </p>
            <h2>
              You describe the bottleneck. <strong>We give it a structure and ship it.</strong>
            </h2>
            <ul className="services">
              {services.map((s, i) => (
                <li key={s.title}>
                  <span className="idx">{'0' + (i + 1)}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
            <ul className="claims" aria-label="How we work with clients">
              <li>
                <strong>Senior engineers</strong> own your project from the first call.
              </li>
              <li>
                Production <strong>in weeks, not quarters</strong>.
              </li>
              <li>
                A <strong>direct line to the founders</strong>, with no account manager in between.
              </li>
            </ul>
          </div>
        </section>

        <section id="f1" data-scene="F1 ULTIMATE" className="scene scene-l">
          <div className="col">
            <p className="tag">
              <span>02</span> Lab product · Playable online
            </p>
            <h2>
              F1 ULTIMATE. <strong>A Formula 1 simulator in a browser tab.</strong>
            </h2>
            <p>
              A racing simulator in Three.js and TypeScript. A rigid-body vehicle model with Pacejka tyres,
              aero, an 8-speed gearbox, tyre temperature and wear, and damage runs in a Web Worker, shared by
              the player and 21 AI drivers. The circuits are generated from OpenStreetMap and DEM/LiDAR
              elevation data.
            </p>
            <p>
              Built by AI coding agents orchestrated through specs, cross-model review and automated merge
              gates.
            </p>
            <dl className="figures">
              {f1Figures.map((f) => (
                <div key={f.value}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="note">
              The circuit beside this text is a sketch drawn for this page: 22 cars on a small lap simulation.
              It is not footage of the game.
            </p>
            <a className="text-link" href="https://f1.erslabs.net">
              f1.erslabs.net
            </a>
          </div>
        </section>

        <section id="capline" data-scene="Capline" className="scene scene-r">
          <div className="col">
            <p className="tag">
              <span>03</span> Lab product · Launching
            </p>
            <h2>
              Capline. <strong>Captions written on the phone, so no audio leaves it.</strong>
            </h2>
            <p>
              An Android video editor that writes the captions on the device. Speech recognition runs locally
              with whisper.cpp.
            </p>
            <p className="stack">Kotlin · Jetpack Compose · Media3 · Hilt</p>
            <a className="shot" href="https://capline.erslabs.net" aria-label="Open the Capline website">
              <img
                src="/screenshots/capline-landing-1200.webp"
                srcSet="/screenshots/capline-landing-720.webp 720w, /screenshots/capline-landing-1200.webp 1200w"
                sizes="(min-width: 960px) 44vw, 92vw"
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                alt="The Capline website: captions that write themselves, on your phone"
              />
            </a>
            <a className="text-link" href="https://capline.erslabs.net">
              capline.erslabs.net
            </a>
          </div>
        </section>

        <section id="synapseia" data-scene="Synapseia Network" className="scene scene-l">
          <div className="col">
            <p className="tag">
              <span>04</span> Lab product · Shipped engineering
            </p>
            <h2>
              Synapseia Network. <strong>Peers lend compute to autonomous research agents.</strong>
            </h2>
            <p>
              A peer-to-peer compute network where operators lend CPU and GPU to autonomous AI research
              agents.
            </p>
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
            <div className="shot">
              <img
                src="/screenshots/synapseia-dashboard-1720.webp"
                srcSet="/screenshots/synapseia-dashboard-960.webp 960w, /screenshots/synapseia-dashboard-1720.webp 1720w"
                sizes="(min-width: 960px) 44vw, 92vw"
                width={1720}
                height={950}
                loading="lazy"
                decoding="async"
                alt="The Synapseia Network dashboard: compute units, active nodes, the peer-to-peer network and a node graph"
              />
            </div>
          </div>
        </section>

        <section id="menhir" data-scene="Menhir" className="scene scene-r">
          <div className="col">
            <p className="tag">
              <span>05</span> Lab product · Prototype, measured
            </p>
            <h2>
              Menhir. <strong>Bitcoin&apos;s design, rebuilt for the quantum era.</strong>
            </h2>
            <p>
              A large quantum computer breaks the elliptic-curve signatures that guard today&apos;s coins. Menhir
              has none. It is a fork of Bitcoin Core in which coins are spent with stateless hash-based
              signatures (SLH-DSA, FIPS 205). Mining, commitments and signatures rest on one family of hash functions, SHA-2, and no
              elliptic curve is reachable from the ledger. Outputs that are not post-quantum are rejected by
              consensus from the first block.
            </p>
            <p>
              The price is size. The prototype measures what a signature of that size costs before any capacity
              decision is taken.
            </p>
            <dl className="figures">
              {menhirFigures.map((f) => (
                <div key={f.value}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="note">
              No network exists and no coin is offered: this is a prototype on a private test chain. The block
              beside this text is a sketch drawn for this page.
            </p>
            <a className="text-link" href="https://menhir.erslabs.net">
              menhir.erslabs.net
            </a>
          </div>
        </section>

        <section id="process" data-scene="Process" className="scene scene-l">
          <div className="col">
            <p className="tag">
              <span>06</span> Process
            </p>
            <h2>
              From first call <strong>to production.</strong>
            </h2>
            <ol className="steps">
              {steps.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" data-scene="Contact" className="scene scene-wide contact">
          <div className="col">
            <p className="tag">
              <span>07</span> Contact
            </p>
            <h2>
              Pour your problem in. <strong>Book a free call.</strong>
            </h2>
            <p className="lead">Tell us what is slowing you down. We reply within 24 hours with next steps.</p>
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

      <footer className="foot">
        <Logo className="logo" />
        <nav aria-label="Footer">
          <a href="#studio">Studio</a>
          <a href="#f1">Lab</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
          <a href="https://erscoder.com">erscoder.com</a>
        </nav>
        <p>© 2026 ErsLabs</p>
      </footer>
    </>
  )
}
