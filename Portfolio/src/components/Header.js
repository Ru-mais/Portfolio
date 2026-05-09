'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  useEffect(() => {
    gsap.set('#header', { opacity: 0, y: -20 });
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top -20%',
      onEnter: () => gsap.to('#header', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
      onLeaveBack: () => gsap.to('#header', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
    });
  }, []);

  return (
    <header id="header">
      <nav aria-label="Primary">
        <div className="logo">Rumais p p</div>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#projects">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
