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
      start: 'top -10%',
      onEnter: () => gsap.to('#header', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }),
      onLeaveBack: () => gsap.to('#header', { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' })
    });
  }, []);

  return (
    <header id="header">
      <nav aria-label="Primary">
        <div className="nav-brand">
          <span className="status-dot" title="System Live / Available for Work"></span>
          <div className="logo">RUMAIS P P</div>
        </div>
        <ul>
          <li><a href="#hero">01 // INDEX</a></li>
          <li><a href="#projects">02 // WORK</a></li>
          <li><a href="#about">03 // ABOUT</a></li>
          <li><a href="#contact">04 // CONTACT</a></li>
          <li><span className="nav-spec">SYS.2026</span></li>
        </ul>
      </nav>
    </header>
  );
}
