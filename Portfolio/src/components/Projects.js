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
      <section id="projects" ref={containerRef}>
        <div className="section-header-row">
          <div>
            <p className="section-label">[ 02 // SELECTED EXHIBITION ]</p>
            <h2>Featured Products & Systems</h2>
          </div>
          <p className="section-header-desc">
            A curated index of production applications, experimental 3D web spaces, and cross-platform tools.
          </p>
        </div>

        <div id="project-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="card-content">
                <span className="index">[ REF. 0{index + 1} ]</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem'}}>
                  <button 
                    type="button"
                    onClick={() => openOverlay(project)} 
                    className="project-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    Inspect Dossier →
                  </button>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="nav-spec"
                      style={{textDecoration: 'none'}}
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
        <div id="project-overlay" className="active" role="dialog" aria-modal="true">
          <button type="button" className="close-overlay" onClick={closeOverlay}>×</button>
          <div className="overlay-content">
            <div className="overlay-left">
              <div id="overlay-3d-container">
                {activeProject.image && (
                  <Image 
                    src={activeProject.image} 
                    alt={activeProject.title} 
                    id="overlay-img" 
                    width={800} 
                    height={500} 
                    className="rounded-xl shadow-2xl"
                  />
                )}
              </div>
            </div>
            <div className="overlay-right">
              <p className="section-label">[ SPECIFICATION DOSSIER ]</p>
              <h2 id="overlay-title" style={{marginBottom: '1rem', fontSize: '2.2rem'}}>{activeProject.title}</h2>
              <div id="overlay-tags" className="tags">
                {activeProject.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>

              <div className="case-study-section">
                <p className="section-label">CHALLENGE</p>
                <p id="overlay-challenge">{activeProject.challenge}</p>
              </div>

              <div className="case-study-section">
                <p className="section-label">OUTCOME</p>
                <p id="overlay-outcome">{activeProject.outcome}</p>
              </div>

              <div style={{display: 'flex', gap: '2rem', margin: '0.5rem 0'}}>
                <div>
                  <span className="section-label" style={{display: 'block', fontSize: '0.7rem'}}>ROLE</span>
                  <span style={{fontWeight: 700, fontFamily: 'var(--font-mono)'}}>{activeProject.role}</span>
                </div>
                <div>
                  <span className="section-label" style={{display: 'block', fontSize: '0.7rem'}}>STATUS</span>
                  <span style={{fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--secondary-color)'}}>PRODUCTION-READY</span>
                </div>
              </div>

              <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="primary-btn" style={{alignSelf: 'flex-start'}}>
                Open Repository / Deployment ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
