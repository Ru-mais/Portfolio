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
    <div ref={containerRef} className="hero-wrapper">
      <div className="page-overlay">
        <div className="loader-text">
          RUMAIS P P
          <div className="overlay-bar"></div>
        </div>
        <div className="loader-sub">[ CREATIVE TECHNOLOGIST // 2026 ]</div>
      </div>

      <section id="hero" aria-labelledby="hero-title">
        <div className="hero-split-grid">
          {/* Left Column: Asymmetric Typography & Action */}
          <div className="hero-left-content">
            <div className="hero-spec-tag">
              <span className="pulsing-led"></span>
              SPEC: FULL-STACK & MOBILE DEVELOPER // 2026
            </div>
            <h1 id="hero-title">
              CRAFTING <em>IMMERSIVE</em> DIGITAL SYSTEMS.
            </h1>
            <p className="hero-desc">
              Creative engineer specializing in <strong>Flutter mobile architectures</strong>, 
              <strong>AI-integrated intelligent platforms</strong>, and high-performance <strong>full-stack MERN systems</strong> with tactile precision.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="primary-btn">
                Explore Selected Works <span className="btn-arrow">→</span>
              </a>
              <a id="cv-link" className="secondary-btn" href="/resume.pdf">
                Download Full Dossier
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive Developer Bento Dashboard */}
          <div className="hero-bento-dashboard">
            <div className="dashboard-header">
              <div className="dashboard-status">
                <span className="live-dot"></span>
                <span className="status-text">AVAILABLE FOR COMMISSIONS</span>
              </div>
              <span className="dashboard-tag">SYS.REF // 01</span>
            </div>

            <div className="dashboard-clock-widget">
              <span className="widget-label">LOCAL TELEMETRY / TIME (IST)</span>
              <div className="clock-time">{timeString || '03:17:39 AM'}</div>
              <span className="location-tag">📍 KERALA, INDIA [11.87°N, 75.37°E]</span>
            </div>

            <div className="dashboard-focus-widget">
              <span className="widget-label">CURRENT ACTIVE FOCUS</span>
              <p className="focus-title">Datie: Community Dating Platform</p>
              <span className="focus-sub">Next.js • Node.js • MongoDB • MERN Stack</span>
            </div>

            <div className="dashboard-metrics-grid">
              <div className="metric-box">
                <span className="metric-num">03+</span>
                <span className="metric-label">Years Craft</span>
              </div>
              <div className="metric-box">
                <span className="metric-num">04+</span>
                <span className="metric-label">Shipped Products</span>
              </div>
              <div className="metric-box">
                <span className="metric-num">100%</span>
                <span className="metric-label">Code Precision</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seamless Running Marquee Strip */}
        <div className="hero-marquee-strip">
          <div className="hero-marquee-track">
            <span>✦ CREATIVE COMPUTING</span>
            <span>✦ REACT & NEXT.JS</span>
            <span>✦ FLUTTER ARCHITECTURE</span>
            <span>✦ FULL-STACK MERN</span>
            <span>✦ AI & INTELLIGENT SYSTEMS</span>
            <span>✦ TYPESCRIPT</span>
            <span>✦ CREATIVE COMPUTING</span>
            <span>✦ REACT & NEXT.JS</span>
            <span>✦ FLUTTER ARCHITECTURE</span>
            <span>✦ FULL-STACK MERN</span>
            <span>✦ AI & INTELLIGENT SYSTEMS</span>
            <span>✦ TYPESCRIPT</span>
          </div>
        </div>
      </section>
    </div>
  );
}
