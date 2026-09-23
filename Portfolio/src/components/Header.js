'use client';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      <header id="header">
        <nav aria-label="Primary">
          <div className="nav-brand">
            <span className="status-dot" title="System Live / Available for Work"></span>
            <div className="logo">RUMAIS P P</div>
          </div>
          
          {/* Desktop Nav */}
          <ul className="hidden md:flex">
            <li><a href="#hero">01 // INDEX</a></li>
            <li><a href="#projects">02 // WORK</a></li>
            <li><a href="#about">03 // ABOUT</a></li>
            <li><a href="#contact">04 // CONTACT</a></li>
            <li><span className="nav-spec">SYS.2026</span></li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[1001]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`bg-textMain block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
            <span className={`bg-textMain block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-textMain block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 min-h-screen bg-background/95 backdrop-blur-xl z-[1000] flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-8 text-2xl font-syne font-bold uppercase tracking-widest text-textMain">
          <li><a href="#hero" onClick={() => setIsMobileMenuOpen(false)}>01 // Index</a></li>
          <li><a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>02 // Work</a></li>
          <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>03 // About</a></li>
          <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>04 // Contact</a></li>
        </ul>
        <div className="mt-12 font-mono text-xs tracking-widest text-accent">
          SYS.2026 // RUMAIS P P
        </div>
      </div>
    </>
  );
}
