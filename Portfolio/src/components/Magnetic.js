'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Magnetic({ children, strength = 0.5, className = "" }) {
  const magnetic = useRef(null);

  useGSAP(() => {
    if (!magnetic.current) return;
    
    // Create quick setters for smooth performance
    const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current.getBoundingClientRect();
      
      // Calculate distance from center
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Apply magnetic pull
      xTo(x * strength);
      yTo(y * strength);
    };

    const mouseLeave = () => {
      // Return to center
      xTo(0);
      yTo(0);
    };

    const current = magnetic.current;
    current.addEventListener("mousemove", mouseMove);
    current.addEventListener("mouseleave", mouseLeave);

    return () => {
      current.removeEventListener("mousemove", mouseMove);
      current.removeEventListener("mouseleave", mouseLeave);
    };
  });

  return (
    <div ref={magnetic} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
