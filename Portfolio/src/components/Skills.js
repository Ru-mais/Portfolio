'use client';
import { skillCategories } from '@/data/info';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import TextReveal from '@/components/TextReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Skills() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray('.skill-row');
    rows.forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          duration: 1.2,
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full border-t border-textMain/10 relative z-10">
      <div className="section-header-row flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-24 pb-8 relative z-20">
        <div>
          <div className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4 font-bold">
            <TextReveal>[ 06 // TECHNICAL SPECIFICATIONS ]</TextReveal>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-syne font-medium tracking-tight text-textMain uppercase">
            <TextReveal delay={0.1}>System Architecture</TextReveal>
          </h2>
        </div>
        <div className="max-w-sm text-left md:text-right">
          <div className="text-sm md:text-base font-jakarta text-textSecondary">
            <TextReveal delay={0.2}>
              <span className="block">A high-performance technical stack optimized for scalability, resilience, and fluid user experiences.</span>
            </TextReveal>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-t border-textMain/10 relative z-20">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-row border-b border-textMain/10 py-12 md:py-20 flex flex-col lg:flex-row gap-8 lg:gap-24 group">
            <div className="lg:w-1/4 shrink-0 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-textSecondary uppercase mb-4 block group-hover:text-accent transition-colors duration-500">
                  VOL. 0{index + 1}
                </span>
                <h3 className="font-syne text-2xl md:text-3xl text-textMain uppercase tracking-tight">
                  {category.title}
                </h3>
              </div>
            </div>
            
            <div className="lg:w-3/4 flex flex-wrap gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-4 items-center">
              {category.skills.map((skill, i) => (
                <div key={i} className="flex items-center">
                  <span className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-textMain/30 hover:text-[#FF5500] hover:scale-105 transition-all duration-300 cursor-default magnetic">
                    {skill.name}
                  </span>
                  {/* Separator Slash */}
                  {i < category.skills.length - 1 && (
                    <span className="font-syne text-4xl md:text-5xl lg:text-6xl font-light text-textMain/10 mx-2 md:mx-4 select-none">
                      /
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
