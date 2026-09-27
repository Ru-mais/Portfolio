'use client';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo('#header', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  // Wow animation for the mobile menu
  useEffect(() => {
    if (!overlayRef.current) return;
    
    if (isMobileMenuOpen) {
      gsap.fromTo(overlayRef.current, 
        { clipPath: 'circle(0% at 90% 40px)', opacity: 0 },
        { clipPath: 'circle(150% at 90% 40px)', opacity: 1, duration: 0.8, ease: 'power3.inOut', display: 'flex' }
      );
      
      gsap.fromTo(linksRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'back.out(1.2)' }
      );
    } else {
      gsap.to(overlayRef.current, 
        { clipPath: 'circle(0% at 90% 40px)', opacity: 0, duration: 0.6, ease: 'power3.inOut', onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' });
        }}
      );
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Header - Floating Pill */}
      <header id="header" className="fixed top-4 left-0 w-full px-4 sm:px-6 z-[100] pointer-events-none">
        <nav aria-label="Primary" className="max-w-[1200px] mx-auto pointer-events-auto bg-surface/80 backdrop-blur-xl border border-glass-border shadow-lg rounded-full px-5 py-3 sm:px-8 sm:py-4 flex justify-between items-center transition-all duration-300">
          <div className="nav-brand flex items-center gap-3">
            <span className="status-dot w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_var(--secondary-color)]"></span>
            <div className="logo font-mono font-bold text-sm sm:text-base tracking-widest text-primary whitespace-nowrap">RUMAIS P P</div>
          </div>
          
          {/* Desktop Nav - Strictly Hidden on Mobile/Tablet */}
          <ul className="hidden xl:flex items-center gap-8">
            <li><a href="#hero" className="font-mono text-xs font-bold tracking-widest hover:text-secondary transition-colors">01 // INDEX</a></li>
            <li><a href="#projects" className="font-mono text-xs font-bold tracking-widest hover:text-secondary transition-colors">02 // WORK</a></li>
            <li><a href="#about" className="font-mono text-xs font-bold tracking-widest hover:text-secondary transition-colors">03 // ABOUT</a></li>
            <li><a href="#contact" className="font-mono text-xs font-bold tracking-widest hover:text-secondary transition-colors">04 // CONTACT</a></li>
            <li><span className="font-mono text-[10px] tracking-widest text-text-muted border border-glass-border px-3 py-1 rounded-sm bg-black/5">SYS.2026</span></li>
          </ul>

          {/* Mobile Menu Button - Sleek Pill Integration */}
          <button 
            className="xl:hidden relative flex items-center gap-3 bg-white/50 border border-glass-border shadow-sm rounded-full pl-5 pr-4 py-2 transition-transform duration-300 active:scale-95 group hover:border-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-primary group-hover:text-secondary transition-colors uppercase">
              {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
            </span>
            <div className="flex flex-col justify-center items-center w-5 h-5">
              <span className={`bg-primary group-hover:bg-secondary block transition-all duration-300 ease-out h-[2px] w-4 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-[1px]' : '-translate-y-1'}`}></span>
              <span className={`bg-primary group-hover:bg-secondary block transition-all duration-300 ease-out h-[2px] w-4 rounded-sm my-[2px] ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-primary group-hover:bg-secondary block transition-all duration-300 ease-out h-[2px] w-4 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay - Premium Glass Drawer */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 h-[100dvh] bg-surface/90 backdrop-blur-2xl z-[1000] flex-col justify-center items-center lg:hidden hidden pointer-events-auto"
      >
        <ul className="flex flex-col items-center gap-10 text-3xl sm:text-4xl font-syne font-medium uppercase tracking-widest text-textMain w-full px-6">
          <li ref={el => linksRef.current[0] = el}>
            <a href="#hero" onClick={closeMenu} className="hover:text-secondary transition-colors">01 // Index</a>
          </li>
          <li ref={el => linksRef.current[1] = el}>
            <a href="#projects" onClick={closeMenu} className="hover:text-secondary transition-colors">02 // Work</a>
          </li>
          <li ref={el => linksRef.current[2] = el}>
            <a href="#about" onClick={closeMenu} className="hover:text-secondary transition-colors">03 // About</a>
          </li>
          <li ref={el => linksRef.current[3] = el}>
            <a href="#contact" onClick={closeMenu} className="hover:text-secondary transition-colors">04 // Contact</a>
          </li>
        </ul>
        <div 
          ref={el => linksRef.current[4] = el}
          className="mt-16 font-mono text-xs tracking-widest text-secondary border border-secondary/20 px-6 py-2 rounded-full bg-secondary/5"
        >
          SYS.2026 // RUMAIS P P
        </div>
      </div>
    </>
  );
}
