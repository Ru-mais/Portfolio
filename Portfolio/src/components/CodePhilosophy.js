'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CodePhilosophy() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.philosophy-text', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 max-w-[1200px] mx-auto w-full relative z-10 border-t border-white/5">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-24 pb-8 border-b border-white/5">
        <div>
          <p className="font-mono text-xs tracking-widest text-accent uppercase mb-4 opacity-80">[ 04 // ENGINEERING MINDSET ]</p>
          <h2 className="text-4xl md:text-5xl font-syne font-medium tracking-tight text-textMain uppercase">My Approach</h2>
        </div>
      </div>

      <div className="w-full bg-[radial-gradient(ellipse_at_center,_rgba(255,85,0,0.08)_0%,_transparent_70%)] rounded-3xl p-8 md:p-16 border border-white/10 shadow-2xl relative text-center flex flex-col items-center justify-center min-h-[400px]">
        <h3 className="philosophy-text text-4xl md:text-6xl lg:text-7xl font-syne font-bold tracking-tighter text-textMain leading-tight mb-8">
          Do I even code?
        </h3>
        <p className="philosophy-text font-jakarta text-xl md:text-2xl text-textSecondary max-w-3xl leading-relaxed mb-8">
          I don't just write code. I build systems. My philosophy is simple: engineer for scale, design for humans, and <span className="text-accent font-bold">delete every line of code</span> that doesn't strictly justify its existence.
        </p>
        <div className="philosophy-text flex gap-4 text-sm font-mono tracking-widest uppercase text-[#FF5500] font-bold">
          <span>SLEEP: 404 NOT FOUND</span>
          <span>//</span>
          <span>CAFFEINE: 100%</span>
        </div>
      </div>
    </section>
  );
}
