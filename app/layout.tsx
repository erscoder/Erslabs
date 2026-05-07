import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://erslabs.net'),
  title: 'ErsLabs | We Build Whatever Fixes Your Problem',
  description: 'ErsLabs ships custom web apps, SaaS platforms, dashboards, internal tools, AI features and integrations. Senior engineers, production in weeks not quarters.',
  keywords: ['custom software development', 'web application development', 'SaaS development', 'internal tools', 'business automation', 'AI integration', 'dashboards', 'software development agency', 'custom software', 'Next.js development', 'React development'],
  openGraph: {
    title: 'ErsLabs | We Build Whatever Fixes Your Problem',
    description: 'Custom web apps, SaaS, dashboards, internal tools, AI features and integrations. Senior engineers shipping production in weeks, not quarters.',
    images: ['/og-image.png'],
    type: 'website',
    url: 'https://erslabs.net',
    locale: 'en_US',
    siteName: 'ErsLabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErsLabs | We Build Whatever Fixes Your Problem',
    description: 'Custom software that removes the bottleneck. Senior engineers, production in weeks.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://erslabs.net' },
  icons: { icon: '/favicon.svg' },
  other: { 'theme-color': '#05080F' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'ErsLabs',
              url: 'https://erslabs.net',
              description: 'Custom software development for businesses and operators. Web apps, SaaS, dashboards, internal tools, AI integrations.',
              serviceType: ['Web Application Development', 'SaaS Development', 'Internal Tools & Automation', 'AI Integration', 'Dashboards & Analytics', 'Custom Software Development'],
              areaServed: 'Worldwide',
              priceRange: '€1,000 to €30,000+',
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
