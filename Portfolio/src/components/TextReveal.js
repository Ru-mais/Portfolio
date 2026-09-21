'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TextReveal({ children, className = '', delay = 0 }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(textRef.current, 
      { y: '110%', opacity: 0 }, 
      { 
        y: '0%', 
        opacity: 1,
        duration: 1.2, 
        ease: 'power4.out',
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`overflow-hidden inline-block ${className}`}>
      <div ref={textRef} className="will-change-transform block opacity-0" style={{ transform: 'translateY(110%)' }}>
        {children}
      </div>
    </div>
  );
}
