import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import BenefitsSection from './components/BenefitsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import SpaceLoader from './components/SpaceLoader';

// Lazy load heavy animation components
const Starfield = lazy(() => import('./components/Starfield'));
const HeroSection = lazy(() => import('./components/HeroSection'));
const TimelineSection = lazy(() => import('./components/TimelineSection'));

// Pages
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

// Loading fallback component
const AnimationFallback = () => (
  <div className="w-full h-screen bg-gradient-to-b from-slate-900 to-slate-950 animate-pulse" />
);

// Home component
const Home = ({ gsapReady }) => (
  <div className="relative">
    {/* Starfield Background - Lazy loaded */}
    <Suspense fallback={<div className="fixed inset-0 bg-slate-950" />}>
      <Starfield />
    </Suspense>

    {/* Content */}
    <div className="relative z-10">
      <Navbar />
      <Suspense fallback={<AnimationFallback />}>
        <HeroSection />
      </Suspense>
      <AboutSection />
      <Suspense fallback={<div className="h-screen bg-gradient-to-b from-slate-900 to-slate-950" />}>
        {gsapReady && <TimelineSection />}
      </Suspense>
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  </div>
);

function App() {
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    // Simulate GSAP loading with a small delay to show loader
    const timer = setTimeout(() => setGsapLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <SpaceLoader isLoading={!gsapLoaded} />
      <Router>
        <Routes>
          <Route path="/" element={<Home gsapReady={gsapLoaded} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/mentor/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
