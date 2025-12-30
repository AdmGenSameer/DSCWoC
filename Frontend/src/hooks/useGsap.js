import { useEffect, useRef } from 'react';

/**
 * Custom hook to lazy-load and initialize GSAP
 * GSAP is only loaded when this hook is actually used
 */
export const useGsap = () => {
  const gsapRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    // Dynamic import - GSAP only loads when component mounts
    import('gsap').then((module) => {
      gsapRef.current = module.default;
    });

    import('gsap/ScrollTrigger').then((module) => {
      scrollTriggerRef.current = module.ScrollTrigger;
      if (gsapRef.current) {
        gsapRef.current.registerPlugin(module.ScrollTrigger);
      }
    });

    return () => {
      // Cleanup
      if (gsapRef.current && scrollTriggerRef.current) {
        gsapRef.current.getAll().forEach(animation => animation.kill());
      }
    };
  }, []);

  return { gsap: gsapRef.current, ScrollTrigger: scrollTriggerRef.current };
};
