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

// Home component - receives wrapper components
const Home = ({ StarfieldWrapper, HeroSectionWrapper, TimelineSectionWrapper }) => (
  <div className="relative">
    {/* Starfield Background - Lazy loaded */}
    <Suspense fallback={<div className="fixed inset-0 bg-slate-950" />}>
      <StarfieldWrapper />
    </Suspense>

    {/* Content */}
    <div className="relative z-10">
      <Navbar />
      <Suspense fallback={<AnimationFallback />}>
        <HeroSectionWrapper />
      </Suspense>
      <AboutSection />
      <Suspense fallback={<div className="h-screen bg-gradient-to-b from-slate-900 to-slate-950" />}>
        <TimelineSectionWrapper />
      </Suspense>
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  </div>
);

function App() {
  const [loadedComponents, setLoadedComponents] = useState({
    starfield: false,
    hero: false,
    timeline: false,
  });

  // Mark components as loaded when they mount
  const markLoaded = (component) => {
    setLoadedComponents(prev => ({
      ...prev,
      [component]: true,
    }));
  };

  // All loaded when all components are true
  const allLoaded = Object.values(loadedComponents).every(loaded => loaded);

  // Wrapper components that report when they're mounted
  const StarfieldWrapper = () => {
    useEffect(() => {
      markLoaded('starfield');
    }, []);
    return <Starfield />;
  };

  const HeroSectionWrapper = () => {
    useEffect(() => {
      markLoaded('hero');
    }, []);
    return <HeroSection />;
  };

  const TimelineSectionWrapper = () => {
    useEffect(() => {
      markLoaded('timeline');
    }, []);
    return <TimelineSection />;
  };

  return (
    <>
      <SpaceLoader isLoading={!allLoaded} />
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                StarfieldWrapper={StarfieldWrapper}
                HeroSectionWrapper={HeroSectionWrapper}
                TimelineSectionWrapper={TimelineSectionWrapper}
              />
            } 
          />
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
