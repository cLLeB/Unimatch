import CTASection from '../components/CTASection'
import FAQSection from '../components/FAQSection'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import StatsSection from '../components/StatsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import UniversitiesSection from '../components/UniversitiesSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <UniversitiesSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
