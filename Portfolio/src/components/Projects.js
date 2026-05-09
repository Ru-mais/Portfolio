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
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 72,
          rotationX: 24,
          z: -150,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: -9,
          z: 52,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            end: 'top 30%',
            scrub: 0.7
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
        <p className="section-label">PORTFOLIO</p>
        <h2>Featured Projects</h2>
        <div id="project-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="card-content">
                <span className="index">0{index + 1}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <button 
                  onClick={() => openOverlay(project)} 
                  className="project-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Exploration →
                </button>
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
              <p className="overlay-label">PROJECT SPEC</p>
              <h2 id="overlay-title">{activeProject.title}</h2>
              <div id="overlay-tags">
                {activeProject.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>

              <div className="case-study-section">
                <p className="section-label">THE CHALLENGE</p>
                <p id="overlay-challenge">{activeProject.challenge}</p>
              </div>

              <div className="case-study-section">
                <p className="section-label">KEY OUTCOME</p>
                <p id="overlay-outcome">{activeProject.outcome}</p>
              </div>

              <div className="overlay-stats">
                <div className="stat"><span className="label">MY ROLE</span><span className="val">{activeProject.role}</span></div>
                <div className="stat"><span className="label">Architecture</span><span className="val">Modular</span></div>
              </div>
              <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="primary-btn">
                View Live Project
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
