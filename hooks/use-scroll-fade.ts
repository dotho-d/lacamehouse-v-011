import { useState, useEffect } from 'react';

export function useScrollFade(threshold = 200) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        if (Math.abs(scrollPosition - lastScrollY) > 5) {
          const fadeRatio = Math.min(scrollPosition / threshold, 0.5);
          const newOpacity = 1 - (fadeRatio * 1.2);
          setOpacity(Math.max(newOpacity, 0.5));
          lastScrollY = scrollPosition;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return opacity;
}