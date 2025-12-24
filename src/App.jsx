import Starfield from './components/Starfield';
import Starships from './components/Starships';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TimelineSection from './components/TimelineSection';
import BenefitsSection from './components/BenefitsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative">
      {/* Starfield Background */}
      <Starfield />

      {/* Roaming Starships */}
      {/* <Starships /> */}

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <BenefitsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
