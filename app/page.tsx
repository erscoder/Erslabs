import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Process } from '@/components/Process'
import { CaseStudy } from '@/components/CaseStudy'
import { TechStack } from '@/components/TechStack'
import { WhyUs } from '@/components/WhyUs'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Process />
      <CaseStudy />
      <TechStack />
      <WhyUs />
      <ContactForm />
      <Footer />
    </main>
  )
}
