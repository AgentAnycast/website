import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhySection from '../components/WhySection'
import Features from '../components/Features'
import Architecture from '../components/Architecture'
import GetStarted from '../components/GetStarted'
import Ecosystem from '../components/Ecosystem'
import Repositories from '../components/Repositories'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'

interface Props {
  onSearchOpen: () => void
}

export default function LandingPage({ onSearchOpen }: Props) {
  return (
    <div className="min-h-screen bg-navy-950">
      <SEOHead />
      <Navbar onSearchOpen={onSearchOpen} />
      <Hero />
      <WhySection />
      <Features />
      <Architecture />
      <GetStarted />
      <Ecosystem />
      <Repositories />
      <Footer />
    </div>
  )
}
