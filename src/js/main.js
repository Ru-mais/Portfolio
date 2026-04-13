import { Scene3D } from './three/Scene.js';
import { InteractiveObjects } from './three/InteractiveObjects.js';
import { projects } from '../data/projects.js';
import { experience, services, skillCategories } from '../data/info.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';

gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

// Utility to split text into spans
const splitText = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const text = el.innerText;
    el.innerHTML = text.split('').map(char => 
        `<span class="char" style="display: inline-block; min-width: ${char === ' ' ? '0.3em' : 'auto'}">${char}</span>`
    ).join('');
};

// Utility for magnetic effect
const initMagnetic = (selector) => {
    const items = document.querySelectorAll(selector);
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(item, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: "power2.out"
            });
            
            const icon = item.querySelector('.skill-icon');
            if (icon) {
                gsap.to(icon, {
                    scale: 1.2,
                    filter: "drop-shadow(0 0 15px var(--secondary-color))",
                    duration: 0.3
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
            const icon = item.querySelector('.skill-icon');
            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    filter: "none",
                    duration: 0.5
                });
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 1. Initialize 3D Scene
    const scene3D = new Scene3D('three-canvas');
    const objects = new InteractiveObjects(scene3D.scene);
    
    const heroObject = objects.createHeroObject();
    const particles = objects.createParticles(3000);

    // 2. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    // 3. Render Loop
    let time = 0;
    scene3D.render(() => {
        time += 0.01;
        objects.update(time, mouseX, mouseY);
    });

    // 4. Populate Projects
    const projectGrid = document.getElementById('project-grid');
    if (projectGrid) {
        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="card-content">
                    <span class="index">0${index + 1}</span>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.link}" target="_blank" class="project-link">Exploration →</a>
                </div>
            `;
            projectGrid.appendChild(card);
            
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            });
        });
    }

    // 5. Populate Services
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        services.forEach(service => {
            const el = document.createElement('div');
            el.className = 'service-card';
            el.innerHTML = `
                <div class="service-icon">${service.icon === 'cubic' ? '🧊' : service.icon === 'mobile' ? '📱' : '🧠'}</div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            servicesGrid.appendChild(el);
        });
    }

    // 6. Populate Experience
    const experienceTimeline = document.getElementById('experience-timeline');
    if (experienceTimeline) {
        experience.forEach(exp => {
            const el = document.createElement('div');
            el.className = 'experience-item';
            el.innerHTML = `
                <div class="exp-year">${exp.year}</div>
                <div class="exp-content">
                    <h3>${exp.role}</h3>
                    <h4>${exp.company}</h4>
                    <p>${exp.description}</p>
                </div>
            `;
            experienceTimeline.appendChild(el);
        });
    }

    // 7. Populate Skills (Categorized Marquees)
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        const createMarqueeRow = (skills, direction = 1) => {
            const row = document.createElement('div');
            row.className = 'skills-marquee-row';
            const inner = document.createElement('div');
            inner.className = 'marquee-inner';
            
            // Triple the skills for seamless loop
            const tripleSkills = [...skills, ...skills, ...skills];
            
            inner.innerHTML = tripleSkills.map(skill => `
                <div class="skill-card">
                    <img src="https://skillicons.dev/icons?i=${skill.icon}" alt="${skill.name}" class="skill-icon">
                    <span class="skill-name">${skill.name}</span>
                </div>
            `).join('');
            
            row.appendChild(inner);
            
            const duration = 20 + Math.random() * 10;
            const tl = gsap.to(inner, {
                xPercent: direction > 0 ? -33.33 : 33.33, 
                duration: duration,
                repeat: -1,
                ease: "none"
            });
            
            if (direction < 0) gsap.set(inner, { xPercent: -33.33 });

            row.addEventListener('mouseenter', () => tl.pause());
            row.addEventListener('mouseleave', () => tl.play());
            
            return row;
        };

        skillsContainer.innerHTML = '';
        skillCategories.forEach((cat, index) => {
            const catWrapper = document.createElement('div');
            catWrapper.className = 'skill-category-wrapper';
            catWrapper.innerHTML = `<h3>${cat.title}</h3>`;
            
            const direction = index % 2 === 0 ? 1 : -1;
            catWrapper.appendChild(createMarqueeRow(cat.skills, direction));
            skillsContainer.appendChild(catWrapper);
        });
        
        initMagnetic('.skill-card');
    }

    // 8. Cinematic Intro Sequence
    splitText('.reveal-name');
    
    const introTL = gsap.timeline({
        scrollTrigger: {
            trigger: "#intro-section",
            start: "top top",
            end: "+=70%",
            pin: true,
            scrub: true,
            onLeave: () => {
                gsap.set("#main-wrapper", { visibility: 'visible' });
                gsap.to("#main-wrapper", { opacity: 1, duration: 1 });
            },
            onEnterBack: () => {
                gsap.to("#main-wrapper", { opacity: 0, duration: 0.5, onComplete: () => {
                    gsap.set("#main-wrapper", { visibility: 'hidden' });
                }});
            }
        }
    });

    introTL.from('.reveal-name .char', {
        opacity: 0,
        y: 100,
        rotateX: -90,
        filter: 'blur(20px)',
        scale: 2,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out"
    })
    .to('.reveal-name .char', {
        opacity: 0,
        y: -100,
        rotateX: 90,
        filter: 'blur(10px)',
        scale: 0.5,
        stagger: {
            each: 0.03,
            from: "random"
        },
        duration: 0.5,
        ease: "power2.in"
    });

    // 9. Hero Animations (Triggered after Intro)
    gsap.to('#hero h1', {
        scrollTrigger: {
            trigger: "#hero",
            start: "top center"
        },
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out"
    });

    gsap.to('.hero-sub', {
        scrollTrigger: {
            trigger: "#hero",
            start: "top center"
        },
        opacity: 1,
        duration: 1.5,
        delay: 0.2,
        ease: "power4.out"
    });

    gsap.to('.hero-btns', {
        scrollTrigger: {
            trigger: "#hero",
            start: "top center"
        },
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.4,
        ease: "power4.out"
    });

    // 10. Camera & Network Scroll Interaction
    gsap.to(scene3D.camera.position, {
        scrollTrigger: {
            trigger: "#main-wrapper",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        z: 8,
        y: -1
    });

    gsap.to(objects.mainObject.scale, {
        scrollTrigger: {
            trigger: "#main-wrapper",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        x: 0.5,
        y: 0.5,
        z: 0.5
    });

    // 11. Project Overlay Logic
    const overlay = document.getElementById('project-overlay');
    const closeOverlay = document.querySelector('.close-overlay');
    
    const openProjectOverlay = (project) => {
        const overlayImg = document.getElementById('overlay-img');
        document.getElementById('overlay-title').innerText = project.title;
        document.getElementById('overlay-challenge').innerText = project.challenge;
        document.getElementById('overlay-outcome').innerText = project.outcome;
        document.getElementById('overlay-role').innerText = project.role;
        document.getElementById('overlay-tags').innerHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join('');
        document.getElementById('overlay-link').href = project.link;
        
        if (project.image) {
            overlayImg.src = project.image;
            overlayImg.style.display = 'block';
        } else {
            overlayImg.style.display = 'none';
        }

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 

        // 3D Tilt Logic
        const container = document.getElementById('overlay-3d-container');
        const handleTilt = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = x - xc;
            const dy = y - yc;
            
            gsap.to(overlayImg, {
                rotateY: dx / 10,
                rotateX: -dy / 10,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        container.addEventListener('mousemove', handleTilt);
        container.addEventListener('mouseleave', () => {
            gsap.to(overlayImg, { rotateX: 0, rotateY: 0, duration: 1 });
        });
        
        gsap.from('.overlay-content > *', {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
            ease: "power4.out"
        });
    };

    closeOverlay.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable background scroll
    });

    // Intercept project links
    document.querySelectorAll('.project-link').forEach((link, i) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectData = projects[i];
            if (projectData) openProjectOverlay(projectData);
        });
    });

    // 12. Adaptive Lighting ScrollTriggers
    const sections = [
        { id: '#about', primary: '#38bdf8', secondary: '#8b5cf6' },
        { id: '#services', primary: '#f43f5e', secondary: '#fbbf24' },
        { id: '#experience', primary: '#10b981', secondary: '#3b82f6' },
        { id: '#skills', primary: '#8b5cf6', secondary: '#38bdf8' },
        { id: '#projects', primary: '#f59e0b', secondary: '#ef4444' }
    ];

    sections.forEach(config => {
        ScrollTrigger.create({
            trigger: config.id,
            start: "top center",
            onEnter: () => scene3D.updateSceneAtmosphere(config.primary, config.secondary),
            onEnterBack: () => scene3D.updateSceneAtmosphere(config.primary, config.secondary)
        });
    });

    // 13. Contact Form Submission Logic
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Create "Data Transmission" animation
            gsap.to(contactForm, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    contactForm.classList.add('hidden');
                    formStatus.classList.add('active');
                    
                    gsap.from('#form-status > *', {
                        opacity: 0,
                        y: 30,
                        stagger: 0.2,
                        duration: 1,
                        ease: "power4.out",
                        onComplete: () => {
                            // Automatically hide success message and reset after 4 seconds
                            setTimeout(() => {
                                gsap.to(contactContainer, {
                                    opacity: 0,
                                    y: 20,
                                    duration: 0.8,
                                    onComplete: () => {
                                        contactContainer.classList.add('hidden');
                                        formStatus.classList.remove('active');
                                        contactForm.classList.remove('hidden');
                                        contactForm.style.opacity = 1;
                                        
                                        contactIntro.classList.remove('hidden');
                                        gsap.to(contactIntro, { opacity: 1, y: 0, duration: 0.5 });
                                    }
                                });
                            }, 4000);
                        }
                    });
                }
            });

            // Pulse the 3D Neural Network as if "receiving data"
            gsap.to(objects.mainObject.scale, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                duration: 0.2,
                repeat: 3,
                yoyo: true,
                ease: "power2.inOut"
            });
        });
    }

    // 14. Contact Form Trigger Logic
    const connectTrigger = document.getElementById('connect-trigger');
    const contactIntro = document.getElementById('contact-intro');
    const contactContainer = document.getElementById('contact-container');

    if (connectTrigger) {
        connectTrigger.addEventListener('click', () => {
            gsap.to(contactIntro, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    contactIntro.classList.add('hidden');
                    contactContainer.classList.remove('hidden');
                    gsap.from(contactContainer, {
                        opacity: 0,
                        y: 30,
                        duration: 1,
                        ease: "power4.out"
                    });
                }
            });
        });
    }

    console.log('God-Tier Portfolio Initialized.');
});
