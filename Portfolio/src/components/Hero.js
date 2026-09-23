'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef(null);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC+5:30
      const istTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now);
      setTimeString(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Initial entrance for overlay text
    const tl = gsap.timeline();
    
    tl.from('.page-overlay .loader-text', {
      opacity: 0,
      y: 30,
      filter: 'blur(10px)',
      duration: 1,
      ease: 'power3.out'
    })
    .from('.page-overlay .loader-sub', {
      opacity: 0,
      y: 10,
      letterSpacing: '0.1em',
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');

    // Dismiss overlay on scroll
    gsap.to('.page-overlay', {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top -5',
        toggleActions: 'play none none none'
      }
    });

    // Animate hero left and right columns
    gsap.from(['.hero-left-content', '.hero-bento-dashboard'], {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 1.1,
      ease: 'power4.out',
      delay: 0.4,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top -5',
        toggleActions: 'play none none none'
      }
    });

    // Parallax
    const heroScrub = { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 };
    gsap.to('.hero-left-content h1', { y: -30, opacity: 0.85, ease: 'none', scrollTrigger: heroScrub });
    gsap.to('.hero-bento-dashboard', { y: 25, ease: 'none', scrollTrigger: heroScrub });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-background text-textMain overflow-hidden font-jakarta w-full">
      
      {/* Loading Overlay */}
      <div className="page-overlay fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center pointer-events-none" style={{ clipPath: 'inset(0 0 0 0)' }}>
        <div className="loader-text text-5xl md:text-[5vw] font-syne font-bold tracking-tight text-textMain relative mb-4">
          RUMAIS P P
          <div className="overlay-bar absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-left animate-pulse"></div>
        </div>
        <div className="loader-sub text-xs md:text-sm font-mono tracking-widest text-textSecondary uppercase">
          [ CREATIVE TECHNOLOGIST // 2026 ]
        </div>
      </div>

      <section id="hero" aria-labelledby="hero-title" className="min-h-screen pt-24 md:pt-[12vh] pb-12 flex flex-col justify-between">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-8 lg:items-center flex-1">
          
          {/* Left Column: Asymmetric Typography & Action */}
          <div className="hero-left-content pr-0 lg:pr-12">
            <div className="hero-spec-tag flex items-center gap-3 font-mono text-xs tracking-widest text-textSecondary uppercase mb-8 border border-white/10 w-max px-4 py-2 bg-white/5 backdrop-blur-md rounded-full shadow-lg">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent-color)] animate-pulse"></span>
              SPEC: FULL-STACK & SOFTWARE ENGINEER // 2026
            </div>
            
            <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-syne font-bold leading-[1.05] tracking-tight uppercase mb-8 text-textMain text-shadow-sm">
              CRAFTING <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/80 font-serif font-light">IMMERSIVE</em> DIGITAL SYSTEMS.
            </h1>
            
            <p className="hero-desc text-lg md:text-xl leading-relaxed text-textSecondary max-w-xl font-light mb-12">
              Creative engineer specializing in <strong className="font-semibold text-textMain">full-stack web architectures</strong>, 
              <strong className="font-semibold text-textMain">complex interactive frontend systems</strong>, and high-performance <strong className="font-semibold text-textMain">scalable web products</strong> with tactile precision.
            </p>
            
            <div className="hero-btns flex flex-col sm:flex-row gap-6">
              <a href="#projects" className="primary-btn flex items-center justify-center gap-3 px-8 py-4 bg-textMain text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-sm">
                Explore Selected Works <span>→</span>
              </a>
              <a id="cv-link" className="secondary-btn flex items-center justify-center px-8 py-4 bg-transparent text-textMain border border-textMain/20 font-mono text-xs uppercase tracking-widest hover:bg-white/5 hover:border-textMain/40 transition-all duration-300 rounded-sm" href="/resume.pdf">
                Download Full Dossier
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive Developer Bento Dashboard */}
          <div className="hero-bento-dashboard grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-min bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] p-4 md:p-8 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-lg">
            
            <div className="dashboard-header col-span-1 sm:col-span-2 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/5 p-4 rounded-xl border border-white/10 mb-2 shadow-inner">
              <div className="dashboard-status flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></span>
                <span className="font-mono text-xs tracking-widest text-textMain uppercase">AVAILABLE FOR COMMISSIONS</span>
              </div>
              <span className="font-mono text-[10px] text-textSecondary mt-2 sm:mt-0 tracking-[0.2em]">SYS.REF // 01</span>
            </div>

            <div className="dashboard-clock-widget col-span-1 bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col justify-between min-h-[140px] hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group">
              <span className="font-mono text-[10px] text-textSecondary uppercase tracking-widest mb-4">LOCAL TELEMETRY / TIME (IST)</span>
              <div className="text-3xl font-syne font-medium text-textMain tracking-tight mb-2 relative z-10">{timeString || '03:17:39 AM'}</div>
              <span className="font-mono text-[10px] text-accent opacity-80 uppercase tracking-wider block border-t border-white/10 pt-2 mt-auto">📍 KERALA, INDIA [11.87°N, 75.37°E]</span>
            </div>

            <div className="dashboard-focus-widget col-span-1 bg-accent/10 p-6 rounded-xl border border-accent/20 flex flex-col justify-between min-h-[140px] relative overflow-hidden group hover:bg-accent/20 transition-all duration-300">
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 font-bold">CURRENT ACTIVE FOCUS</span>
              <p className="text-xl font-syne font-medium text-textMain leading-tight mb-2">Datie: Community Dating Platform</p>
              <span className="font-mono text-[10px] text-textSecondary block mt-auto">Next.js • Node.js • MongoDB • MERN Stack</span>
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
            </div>

            <div className="dashboard-metrics-grid col-span-1 sm:col-span-2 grid grid-cols-3 gap-4 mt-2">
              <div className="metric-box bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
                <span className="text-2xl md:text-3xl font-syne font-bold text-textMain mb-1 group-hover:text-accent transition-colors">04+</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-textSecondary">Years Craft</span>
              </div>
              <div className="metric-box bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
                <span className="text-2xl md:text-3xl font-syne font-bold text-textMain mb-1 group-hover:text-accent transition-colors">04+</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-textSecondary">Shipped Products</span>
              </div>
              <div className="metric-box bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
                <span className="text-2xl md:text-3xl font-syne font-bold text-textMain mb-1 group-hover:text-accent transition-colors">100%</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-textSecondary">Code Precision</span>
              </div>
            </div>
            
          </div>
        </div>

        {/* Seamless Running Marquee Strip */}
        <div className="hero-marquee-strip w-full overflow-hidden whitespace-nowrap mt-24 py-4 border-y border-white/5 bg-white/5 backdrop-blur-md rotate-1 transform-origin-center">
          <div className="hero-marquee-track inline-block font-mono text-[11px] tracking-widest text-textSecondary uppercase animate-[marquee_20s_linear_infinite]">
            <span className="mx-6">✦ CREATIVE COMPUTING</span>
            <span className="mx-6">✦ REACT & NEXT.JS</span>
            <span className="mx-6">✦ FULL-STACK & SCALABLE WEB ARCHITECTURES</span>
            <span className="mx-6">✦ FULL-STACK MERN</span>
            <span className="mx-6">✦ AI & INTELLIGENT SYSTEMS</span>
            <span className="mx-6">✦ TYPESCRIPT</span>
            <span className="mx-6">✦ CREATIVE COMPUTING</span>
            <span className="mx-6">✦ REACT & NEXT.JS</span>
            <span className="mx-6">✦ FULL-STACK & SCALABLE WEB ARCHITECTURES</span>
            <span className="mx-6">✦ FULL-STACK MERN</span>
            <span className="mx-6">✦ AI & INTELLIGENT SYSTEMS</span>
            <span className="mx-6">✦ TYPESCRIPT</span>
          </div>
        </div>
        
      </section>
    </div>
  );
}
