import './App.css'
import { Routes, Route } from 'react-router-dom'
import AboutUs from './components/AboutUs'
import DesignProcess from './components/DesignProcess'
import Hero from './components/Hero'
import LuxuriousFooter from './components/LuxuriousFooter'
import MissionSection from './components/MissionSection'
import Navbar from './components/Navbar'
import ThreeScene from './components/ThreeScene'
import VideoShowcase from './components/VideoShowcase'
import WhyChooseUs from './components/WhyChooseUs'
import AboutPage from './components/About/AboutPage'
import ContactPage from './components/Contact/ContactPage'
import ServicesPage from './components/Service/ServicesPage'
import ServiceDetailPage from './components/Service/ServiceDetailPage'
import CareerPage from './components/Career/CareerPage'

function App() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Three.js */}
      <div className="fixed inset-0 z-0">
        <ThreeScene />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <AboutUs />
              <MissionSection />
              <DesignProcess />
              <WhyChooseUs />
              <VideoShowcase />
            </>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:service" element={<ServiceDetailPage />} />
          <Route path="/projects" element={<VideoShowcase />} />
          {/* <Route path="/careers" element={<CareerPage />} /> */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <LuxuriousFooter />
      </div>
    </main>
  )
}

export default App
