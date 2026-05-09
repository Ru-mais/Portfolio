'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Initial entrance for overlay text
    const tl = gsap.timeline();
    
    tl.from('.page-overlay .loader-text', {
      opacity: 0,
      y: 40,
      filter: 'blur(20px)',
      duration: 1.2,
      ease: 'power4.out'
    })
    .from('.page-overlay .loader-sub', {
      opacity: 0,
      y: 10,
      letterSpacing: '0.1em',
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6');

    // Dismiss overlay on scroll
    gsap.to('.page-overlay', {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.5,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top -5',
        toggleActions: 'play none none none'
      }
    });

    // Split text effect for title
    const title = containerRef.current.querySelector('#hero-title');
    if (title && !title.querySelector('.char')) {
        const text = title.innerText;
        title.innerHTML = text.split('').map(char => 
            `<span class="char" style="display: inline-block; min-width: ${char === ' ' ? '0.3em' : 'auto'}">${char}</span>`
        ).join('');
    }

    // Animate hero characters
    gsap.from('.char', {
        opacity: 0,
        y: 80,
        rotateX: -90,
        filter: 'blur(20px)',
        stagger: 0.04,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5,
        scrollTrigger: {
            trigger: '#hero',
            start: 'top -5',
            toggleActions: 'play none none none'
        }
    });

    gsap.from(['.hero-sub', '.hero-desc', '.hero-btns'], {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        delay: 1,
        scrollTrigger: {
            trigger: '#hero',
            start: 'top -5',
            toggleActions: 'play none none none'
        }
    });

    // Parallax
    const heroScrub = { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.15 };
    gsap.to('#hero h1', { z: -200, rotationX: 11, x: -18, ease: 'none', scrollTrigger: heroScrub });
    gsap.to('.hero-sub', { y: 76, z: -100, rotationX: 7, ease: 'none', scrollTrigger: heroScrub });
    gsap.to('.hero-desc', { y: 58, z: -78, rotationX: 5, opacity: 0.32, ease: 'none', scrollTrigger: heroScrub });
    gsap.to('.hero-btns', { z: -62, rotationX: 5, x: 12, ease: 'none', scrollTrigger: heroScrub });

  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <div className="page-overlay">
        <div className="loader-text">
          Rumais p p
          <div className="overlay-bar"></div>
        </div>
        <div className="loader-sub">Creative Software Developer</div>
      </div>

      <section id="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">RUMAIS P P </h1>
        <p className="hero-sub">Building <em>Immersive</em> Digital experiences</p>
        <p className="hero-desc">
          Crafting highly interactive, performance-driven web and mobile applications with a
          focus on immersive 3D experiences.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="primary-btn">View My Work</a>
          <a id="cv-link" className="secondary-btn" href="/resume.pdf">Download CV</a>
        </div>
      </section>
    </div>
  );
}
