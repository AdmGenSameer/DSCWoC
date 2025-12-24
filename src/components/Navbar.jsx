import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Timeline', 'Tracks', 'Projects', 'Rewards'];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-effect shadow-lg shadow-cosmic-purple/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-cosmic-purple to-nebula-pink glow-effect"></div>
          <span className="text-lg sm:text-xl font-bold text-white">DSC WoC</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 hover:text-cosmic-purple transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-cosmic-purple transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cosmic-purple to-nebula-pink group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <button className="hidden md:block retro-button bg-gradient-to-r from-cosmic-purple to-nebula-pink hover:from-galaxy-violet hover:to-nebula-pink text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cosmic-purple/50 hover:-translate-y-0.5">
          JOIN MISSION
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-cosmic-purple/20">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-cosmic-purple transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-cosmic-purple/10"
              >
                {item}
              </a>
            ))}
            <button className="w-full retro-button bg-gradient-to-r from-cosmic-purple to-nebula-pink text-white px-6 py-2.5 rounded-full font-semibold mt-3">
              JOIN MISSION
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
