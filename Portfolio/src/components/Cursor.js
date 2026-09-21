'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is touch or small screen
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 
                  ('ontouchstart' in window) || 
                  (navigator.maxTouchPoints > 0));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return; // Don't run cursor logic on mobile

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set up high-performance GSAP quickTo setters
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Hover effect for links and buttons
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .magnetic');
      if (target) {
        gsap.to(cursor, {
          scale: 3,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderColor: 'transparent',
          mixBlendMode: 'difference',
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .magnetic');
      if (target) {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(25, 25, 27, 0.5)', 
          mixBlendMode: 'normal',
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Initial styles
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      opacity: 1
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 border-2 border-textMain/50 rounded-full pointer-events-none z-[10000] hidden md:block"
      style={{ opacity: 0 }}
    ></div>
  );
}
