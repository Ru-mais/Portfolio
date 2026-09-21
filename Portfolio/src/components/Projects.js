'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { projects } from '@/data/projects';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/TextReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            end: 'top 60%',
            scrub: 0.5
          }
        }
      );
    });
  }, { scope: containerRef });

  const openOverlay = (project, e) => {
    if (e) e.preventDefault();
    console.log("Opening overlay for:", project.title);
    setActiveProject(project);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeOverlay = () => {
    setActiveProject(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeProject) closeOverlay();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  return (
    <>
      <section id="projects" ref={containerRef} className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full border-t border-textMain/10 relative z-10">
        <div className="section-header-row flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-textMain/10 pb-8">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent uppercase mb-4 opacity-80">
              <TextReveal>[ 02 // SELECTED EXHIBITION ]</TextReveal>
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-medium tracking-tight text-textMain uppercase">
              <TextReveal delay={0.1}>Featured Products</TextReveal><br className="hidden md:block"/>
              <TextReveal delay={0.2}>& Systems</TextReveal>
            </h2>
          </div>
          <div className="max-w-sm text-left md:text-right">
            <TextReveal delay={0.3}>
              <p className="text-sm md:text-base font-jakarta text-textSecondary">
                A curated index of production applications, experimental 3D web spaces, and cross-platform tools.
              </p>
            </TextReveal>
          </div>
        </div>

        <div id="project-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
          {projects.map((project, index) => (
            <div 
              key={index} 
              onClick={(e) => openOverlay(project, e)}
              className="project-card bg-transparent p-8 rounded-3xl border border-textMain/10 hover:border-textMain/30 hover:bg-textMain/5 transition-all duration-300 relative group overflow-hidden h-full flex flex-col justify-between cursor-pointer"
            >
              <div className="card-content flex flex-col h-full relative z-10 pointer-events-none">
                <span className="font-mono text-xs tracking-widest text-[#FF5500] uppercase mb-8 block font-bold">[ REF. 0{index + 1} ]</span>
                <h3 className="text-3xl font-syne font-medium tracking-tight text-textMain uppercase mb-4 leading-none">{project.title}</h3>
                <p className="font-jakarta text-sm text-textSecondary leading-relaxed mb-8 flex-1">{project.description}</p>
                <div className="tags flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-textSecondary uppercase tracking-widest border border-textMain/10 px-3 py-1 rounded-full bg-textMain/5">{tag}</span>
                  ))}
                </div>
                <div className="flex justify-end items-center mt-8 border-t border-textMain/10 pt-6 pointer-events-auto">
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="nav-spec font-mono text-[10px] text-textSecondary uppercase tracking-widest hover:text-[#FF5500] transition-colors no-underline relative z-20 flex items-center gap-2"
                    >
                      Source Code ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Overlay */}
      {activeProject && (
        <div id="project-overlay" className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8 bg-[#EAE8E1]/95 backdrop-blur-xl opacity-100 pointer-events-auto transition-opacity duration-300" role="dialog" aria-modal="true">
          <button 
            type="button" 
            className="absolute top-6 right-8 text-4xl text-textMain/70 hover:text-[#FF5500] transition-colors bg-transparent border-none cursor-pointer z-[100000]" 
            onClick={closeOverlay}
            aria-label="Close details"
          >
            ×
          </button>
          
          <div className="overlay-content w-full max-w-[1200px] h-full max-h-[85vh] bg-[#F4F3ED] rounded-[30px] border border-textMain/10 shadow-2xl flex flex-col md:flex-row overflow-hidden transform scale-100 transition-transform duration-500 delay-100 relative z-[99999]">
            <div className="overlay-left w-full md:w-[55%] h-64 md:h-full bg-textMain/5 border-b md:border-b-0 md:border-r border-textMain/10 relative p-8 md:p-12 flex items-center justify-center">
              <div id="overlay-3d-container" className="w-full h-full relative flex items-center justify-center">
                {activeProject.image && (
                  <Image 
                    src={activeProject.image} 
                    alt={activeProject.title} 
                    width={800} 
                    height={500} 
                    className="rounded-xl shadow-lg w-full h-auto object-contain max-h-full transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>
            </div>
            
            <div className="overlay-right w-full md:w-[45%] h-full p-8 md:p-12 lg:p-16 overflow-y-auto flex flex-col justify-start custom-scrollbar">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#FF5500] uppercase mb-4 font-bold">[ SPECIFICATION DOSSIER ]</p>
              <h2 id="overlay-title" className="text-4xl lg:text-5xl font-syne font-medium tracking-tight text-textMain uppercase mb-6">{activeProject.title}</h2>
              <div id="overlay-tags" className="tags flex flex-wrap gap-2 mb-10">
                {activeProject.tags.map(tag => <span key={tag} className="font-mono text-[10px] text-textSecondary uppercase tracking-widest border border-textMain/10 px-3 py-1 rounded-full bg-textMain/5">{tag}</span>)}
              </div>

              <div className="case-study-section mb-10">
                <p className="font-mono text-[10px] tracking-[0.2em] text-textSecondary uppercase mb-4 block">CHALLENGE</p>
                <p id="overlay-challenge" className="font-jakarta text-sm leading-relaxed text-textMain/80">{activeProject.challenge}</p>
              </div>

              <div className="case-study-section mb-10">
                <p className="font-mono text-[10px] tracking-[0.2em] text-textSecondary uppercase mb-4 block">OUTCOME</p>
                <p id="overlay-outcome" className="font-jakarta text-sm leading-relaxed text-textMain/80">{activeProject.outcome}</p>
              </div>

              <div className="flex gap-8 my-2 pt-6 border-t border-textMain/10 mb-10">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-textSecondary uppercase mb-2 block">ROLE</span>
                  <span className="font-mono text-xs font-bold text-textMain">{activeProject.role}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-textSecondary uppercase mb-2 block">STATUS</span>
                  <span className="font-mono text-xs font-bold text-[#FF5500]">PRODUCTION-READY</span>
                </div>
              </div>

              <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="primary-btn flex items-center justify-center gap-3 px-8 py-4 bg-textMain text-[#EAE8E1] font-mono text-xs uppercase tracking-widest hover:bg-[#FF5500] hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-sm mt-auto self-start w-full md:w-auto">
                Open Repository ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
