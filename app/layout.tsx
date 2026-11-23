import type { Metadata, Viewport } from 'next'
import { Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Manrope is the typeface of the ErsLabs wordmark, so the whole site speaks
// in the logo's voice: light for statements, medium for emphasis.
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const title = 'ErsLabs | Raw problem in. Shipped software out.'
const description =
  'ErsLabs builds custom web apps, SaaS platforms, dashboards, internal tools, AI features and integrations. Senior engineers, production in weeks, a direct line to the founders.'

export const metadata: Metadata = {
  metadataBase: new URL('https://erslabs.net'),
  title,
  description,
  keywords: [
    'custom software development',
    'web application development',
    'SaaS development',
    'internal tools',
    'business automation',
    'AI integration',
    'dashboards',
    'software studio',
  ],
  openGraph: {
    title,
    description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ErsLabs, a software lab' }],
    type: 'website',
    url: 'https://erslabs.net',
    locale: 'en_US',
    siteName: 'ErsLabs',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://erslabs.net' },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = {
  themeColor: '#030806',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'ErsLabs',
              url: 'https://erslabs.net',
              logo: 'https://erslabs.net/logo.svg',
              email: 'hello@erslabs.net',
              founder: { '@type': 'Person', name: 'Enrique Rubio', url: 'https://erscoder.com' },
              description:
                'Custom software development for businesses and operators. Web apps, SaaS, dashboards, internal tools, AI integrations.',
              serviceType: [
                'Web Application Development',
                'SaaS Development',
                'Internal Tools & Automation',
                'AI Integration',
                'Dashboards & Analytics',
                'Custom Software Development',
              ],
              areaServed: 'Worldwide',
              priceRange: '€1,000 to €30,000+',
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
