import { useEffect, useRef } from 'react';
import '../styles/SpaceLoader.css';

const SpaceLoader = ({ isLoading = true }) => {
  const starsRef = useRef([]);

  useEffect(() => {
    if (!isLoading) return;

    // Create random stars
    const container = document.querySelector('.space-loader-container');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'space-loader-star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.width = Math.random() * 3 + 1 + 'px';
      star.style.height = star.style.width;
      star.style.animation = `twinkle ${Math.random() * 3 + 1}s infinite`;
      star.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(star);
      starsRef.current.push(star);
    }

    return () => {
      starsRef.current.forEach(star => star.remove());
      starsRef.current = [];
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="space-loader-container">
      {/* Animated orbiting planets */}
      <div className="planet-orbit">
        <div className="planet planet-1"></div>
        <div className="planet planet-2"></div>
        <div className="planet planet-3"></div>
      </div>

      {/* Central loading sphere */}
      <div className="center-sphere">
        <div className="sphere-pulse"></div>
        <div className="sphere-ring ring-1"></div>
        <div className="sphere-ring ring-2"></div>
      </div>

      {/* Loading text */}
      <div className="loader-text">
        <p>Launching Mission...</p>
        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Shooting stars */}
      <div className="shooting-star shooting-star-1"></div>
      <div className="shooting-star shooting-star-2"></div>
    </div>
  );
};

export default SpaceLoader;
