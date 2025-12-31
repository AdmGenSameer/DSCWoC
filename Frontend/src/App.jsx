import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Starfield from './components/Starfield';
import Starships from './components/Starships';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TimelineSection from './components/TimelineSection';
import BenefitsSection from './components/BenefitsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Pages
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Rewards from './pages/Rewards';

// Home component
const Home = () => (
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/mentor/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;
