'use client';
import { useRef } from 'react';
import { experience } from '@/data/info';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';
import CursorSpotlightCard from './CursorSpotlightCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function ExperienceItem({ exp }) {
  return (
    <div className="exp-card relative flex flex-col lg:flex-row gap-8 lg:gap-16 z-10 pl-6 sm:pl-12 lg:pl-0">
      {/* Timeline Node */}
      <div className="absolute left-[-16px] md:left-[-11px] lg:left-[210px] top-8 hidden sm:block z-20">
        <Magnetic strength={0.3}>
          <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_rgba(255,85,0,0.8)] border-2 border-background pointer-events-auto cursor-none"></div>
        </Magnetic>
      </div>

      <div className="font-mono text-sm md:text-base tracking-widest text-accent uppercase font-bold lg:w-[200px] pt-6 flex-shrink-0">
        {exp.year}
      </div>

      <CursorSpotlightCard className="flex-1 group bg-white/5 border border-white/10 hover:border-white/20 p-8 md:p-10 rounded-3xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl w-full">
        <div className="relative z-10 flex flex-col h-full pointer-events-auto">
          <div className="flex flex-col mb-4">
            <h3 className="text-2xl md:text-3xl font-syne font-medium text-textMain mb-1 leading-[1.1]">{exp.role}</h3>
            <h4 className="text-xl md:text-2xl font-serif italic text-textSecondary opacity-80 lowercase">{exp.company}</h4>
          </div>
          
          <div className="flex-1 flex flex-col">
            <p className="text-base md:text-lg font-jakarta text-textSecondary leading-relaxed max-w-3xl mb-8">
              {exp.description}
            </p>
            
            {exp.skills && exp.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                {exp.skills.map(skill => (
                  <Magnetic key={skill} strength={0.2} className="cursor-pointer">
                    <span className="font-mono text-[10px] text-textSecondary uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-full bg-white/5 group-hover:border-white/20 transition-colors duration-300 block">
                      {skill}
                    </span>
                  </Magnetic>
                ))}
              </div>
            )}
          </div>
        </div>
      </CursorSpotlightCard>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.exp-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full relative z-10 border-t border-white/5">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-20 border-b border-white/5 pb-8">
        <div>
          <p className="font-mono text-xs tracking-widest text-textSecondary uppercase mb-4 opacity-80">[ 05 // LOGBOOK & TRACK RECORD ]</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-medium tracking-tight text-textMain uppercase leading-tight">Professional<br className="block sm:hidden" /> Experience</h2>
        </div>
        <p className="text-sm md:text-base font-jakarta text-textSecondary max-w-sm text-left lg:text-right">
          Building and maintaining production-level applications in fast-paced collaborative environments.
        </p>
      </div>

      <div id="experience-timeline" className="relative flex flex-col gap-12 lg:gap-16">
        <div className="absolute left-[8px] md:left-[11px] lg:left-[216px] top-4 bottom-4 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent hidden sm:block"></div>
        {experience.map((exp) => (
          <ExperienceItem key={exp.id} exp={exp} />
        ))}
      </div>
    </section>
  );
}
