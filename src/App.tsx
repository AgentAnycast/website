import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhySection from './components/WhySection'
import Features from './components/Features'
import Architecture from './components/Architecture'
import GetStarted from './components/GetStarted'
import Ecosystem from './components/Ecosystem'
import Repositories from './components/Repositories'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />
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
