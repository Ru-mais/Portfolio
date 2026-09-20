'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { projects } from '@/data/projects';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  const openOverlay = (project) => {
    setActiveProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeOverlay = () => {
    setActiveProject(null);
    document.body.style.overflow = '';
  };

  return (
    <>
      <section id="projects" ref={containerRef} className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full border-t border-white/5">
        <div className="section-header-row flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-8">
          <div>
            <p className="font-mono text-xs tracking-widest text-textSecondary uppercase mb-4 opacity-80">[ 02 // SELECTED EXHIBITION ]</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-medium tracking-tight text-textMain uppercase">Featured Products & Systems</h2>
          </div>
          <p className="text-sm md:text-base font-jakarta text-textSecondary max-w-sm text-left md:text-right">
            A curated index of production applications, experimental 3D web spaces, and cross-platform tools.
          </p>
        </div>

        <div id="project-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="project-card bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden h-full flex flex-col justify-between">
              <div className="card-content flex flex-col h-full relative z-10">
                <span className="font-mono text-xs tracking-widest text-accent uppercase mb-8 block font-bold">[ REF. 0{index + 1} ]</span>
                <h3 className="text-3xl font-syne font-medium tracking-tight text-textMain uppercase mb-4 leading-none">{project.title}</h3>
                <p className="font-jakarta text-sm text-textSecondary leading-relaxed mb-8 flex-1">{project.description}</p>
                <div className="tags flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-textSecondary uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full bg-white/5">{tag}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8 border-t border-white/10 pt-6">
                  <button 
                    type="button"
                    onClick={() => openOverlay(project)} 
                    className="project-link font-syne text-xs uppercase tracking-widest text-textMain hover:text-accent transition-colors bg-transparent border-none cursor-pointer p-0"
                  >
                    Inspect Dossier →
                  </button>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="nav-spec font-mono text-[10px] text-textSecondary uppercase tracking-widest hover:text-textMain transition-colors no-underline"
                    >
                      Source Code ↗
                    </a>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Overlay */}
      {activeProject && (
        <div id="project-overlay" className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl opacity-100 pointer-events-auto transition-opacity duration-300" role="dialog" aria-modal="true">
          <button type="button" className="absolute top-6 right-8 text-4xl text-white/70 hover:text-white transition-colors bg-transparent border-none cursor-pointer z-[1001]" onClick={closeOverlay}>×</button>
          
          <div className="overlay-content w-full max-w-[1200px] h-full max-h-[85vh] bg-[#19191B] rounded-[30px] border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden transform scale-100 transition-transform duration-500 delay-100">
            <div className="overlay-left w-full md:w-[55%] h-64 md:h-full bg-black/50 border-b md:border-b-0 md:border-r border-white/10 relative p-8 md:p-12 flex items-center justify-center">
              <div id="overlay-3d-container" className="w-full h-full relative perspective-[1000px] flex items-center justify-center">
                {activeProject.image && (
                  <Image 
                    src={activeProject.image} 
                    alt={activeProject.title} 
                    id="overlay-img" 
                    width={800} 
                    height={500} 
                    className="rounded-xl shadow-2xl w-full h-auto object-contain max-h-full transition-transform duration-[2s] ease-[cubic-bezier(0.19,1,0.22,1)]"
                  />
                )}
              </div>
            </div>
            
            <div className="overlay-right w-full md:w-[45%] h-full p-8 md:p-12 lg:p-16 overflow-y-auto flex flex-col justify-start custom-scrollbar">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#FF5500] uppercase mb-4 font-bold">[ SPECIFICATION DOSSIER ]</p>
              <h2 id="overlay-title" className="text-4xl lg:text-5xl font-syne font-medium tracking-tight text-[#EAE8E1] uppercase mb-6">{activeProject.title}</h2>
              <div id="overlay-tags" className="tags flex flex-wrap gap-2 mb-10">
                {activeProject.tags.map(tag => <span key={tag} className="font-mono text-[10px] text-white/60 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full bg-white/5">{tag}</span>)}
              </div>

              <div className="case-study-section mb-10">
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase mb-4 block">CHALLENGE</p>
                <p id="overlay-challenge" className="font-jakarta text-sm leading-relaxed text-white/70">{activeProject.challenge}</p>
              </div>

              <div className="case-study-section mb-10">
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase mb-4 block">OUTCOME</p>
                <p id="overlay-outcome" className="font-jakarta text-sm leading-relaxed text-white/70">{activeProject.outcome}</p>
              </div>

              <div className="flex gap-8 my-2 pt-6 border-t border-white/10 mb-10">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase mb-2 block">ROLE</span>
                  <span className="font-mono text-xs font-bold text-[#EAE8E1]">{activeProject.role}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase mb-2 block">STATUS</span>
                  <span className="font-mono text-xs font-bold text-[#FF5500]">PRODUCTION-READY</span>
                </div>
              </div>

              <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="primary-btn flex items-center justify-center gap-3 px-8 py-4 bg-[#EAE8E1] text-[#19191B] font-mono text-xs uppercase tracking-widest hover:bg-[#FF5500] hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-sm mt-auto self-start w-full md:w-auto">
                Open Repository / Deployment ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
