import './lib/gsap' // registers GSAP + ScrollTrigger once
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import SystemIntro from './components/SystemIntro'
import StoryStyles from './story/StoryStyles'
import ComponentShowcase from './components/ComponentShowcase'
import ExplodedAssembly from './components/ExplodedAssembly'
import ProductReveal from './components/ProductReveal'
import DataFlow from './components/DataFlow'
import AIEngine from './components/AIEngine'
import FaultDetection from './components/FaultDetection'
import RealVsFault from './components/RealVsFault'
import FaultSimulator from './components/FaultSimulator'
import LiveDashboard from './components/LiveDashboard'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

// Storytelling order. Replace one placeholder per phase.
export default function App() {
  return (
    <>
      <StoryStyles />
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SystemIntro />
        <ComponentShowcase />
        <ExplodedAssembly />
        <ProductReveal />
        <DataFlow />
        <AIEngine />
        <FaultDetection />
        <RealVsFault />
        <FaultSimulator />
        <LiveDashboard />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
