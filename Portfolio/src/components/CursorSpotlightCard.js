'use client';
import { useRef, useState } from 'react';

export default function CursorSpotlightCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    // Calculate parallax relative to center of the card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const parallaxX = ((x - centerX) / centerX) * 5; // max 5px shift
    const parallaxY = ((y - centerY) / centerY) * 5;
    setParallax({ x: parallaxX, y: parallaxY });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => {
    setOpacity(0);
    setParallax({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ perspective: "1000px" }}
    >
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out mix-blend-screen"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,85,0,0.06), transparent 40%)`,
        }}
      />
      <div 
        className="relative z-10 h-full flex flex-col transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0px) rotateX(${-parallax.y * 0.5}deg) rotateY(${parallax.x * 0.5}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
