'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Journey() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  const waypoints = [
    { year: "2021 — 2023", title: "Foundation", desc: "12th Grade / Systems Fundamentals & Advanced Mathematics.", bgNumber: "21" },
    { year: "2023 — 2026", title: "Computer Science", desc: "BCA Degree / Data Structures & Software Engineering.", bgNumber: "23" },
    { year: "2025 — Present", title: "The Now", desc: "Freelance Creative Developer / Building full-stack systems and 3D web applications.", bgNumber: "NOW" }
  ];

  useGSAP(() => {
    // Calculate how far to move the container to the left
    const getScrollAmount = () => -(scrollWrapperRef.current.scrollWidth - window.innerWidth);

    const horizontalScroll = gsap.to(scrollWrapperRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWrapperRef.current.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      }
    });

    // Sub-animations for cards appearing as they enter the screen horizontally
    const cards = gsap.utils.toArray('.journey-card');
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0.3,
        scale: 0.9,
        scrollTrigger: {
          trigger: card,
          containerAnimation: horizontalScroll,
          start: 'left 80%',
          end: 'left 20%',
          scrub: true,
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section id="journey" ref={containerRef} className="h-screen w-full overflow-hidden flex items-center bg-background relative z-10 border-t border-white/5">
      
      {/* Pinned Header inside the container */}
      <div className="absolute top-12 md:top-24 left-6 md:left-12 z-20 pointer-events-none">
        <p className="font-mono text-xs tracking-widest text-accent uppercase mb-4 opacity-80">[ 05 // THE TIMELINE ]</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-medium tracking-tight text-textMain uppercase">My Journey</h2>
      </div>

      <div ref={scrollWrapperRef} className="flex h-full items-center gap-12 md:gap-24 px-6 md:px-[10vw] w-max pt-32 md:pt-0">
        
        {/* Intro Slide */}
        <div className="w-[80vw] md:w-[40vw] flex-shrink-0 flex items-center pr-8 md:pr-0">
          <p className="text-2xl md:text-4xl lg:text-5xl font-syne font-medium text-textSecondary leading-tight">
            A continuous flow from academic fundamentals to production-ready software architecture. <br/><br/>
            <span className="text-accent text-lg md:text-xl font-mono tracking-widest uppercase inline-block animate-pulse">Scroll to explore →</span>
          </p>
        </div>

        {/* Waypoint Cards */}
        {waypoints.map((point, idx) => (
          <div key={idx} className="journey-card w-[85vw] md:w-[45vw] lg:w-[35vw] flex-shrink-0 bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-16 flex flex-col justify-center min-h-[45vh] md:h-[60vh] relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
            {/* Massive Background Typography */}
            <span className="font-syne text-[150px] md:text-[250px] font-bold text-white/[0.03] absolute -top-10 -right-10 pointer-events-none select-none leading-none">
              {point.bgNumber}
            </span>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="font-mono text-xs md:text-sm tracking-widest text-accent mb-6 block font-bold border border-accent/20 bg-accent/10 w-fit px-4 py-2 rounded-full">
                {point.year}
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-syne font-bold tracking-tight text-textMain mb-6 uppercase">
                {point.title}
              </h3>
              <p className="font-jakarta text-base md:text-xl text-textSecondary leading-relaxed">
                {point.desc}
              </p>
            </div>
          </div>
        ))}
        
        {/* Outro padding */}
        <div className="w-[10vw] flex-shrink-0"></div>
      </div>
    </section>
  );
}
