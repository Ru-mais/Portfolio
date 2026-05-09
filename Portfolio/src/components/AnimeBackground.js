'use client';
import { useEffect, useRef } from 'react';
import { animate, createTimeline, random } from 'animejs';

export default function AnimeBackground() {
    const bgRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        if (!bgRef.current) return;

        const container = bgRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // 1. Create a Deep Mesh Grid (SVG)
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.opacity = "0.3";
        container.appendChild(svg);

        const gridSpacing = 80;
        const dots = [];
        for (let x = 0; x < width + gridSpacing; x += gridSpacing) {
            for (let y = 0; y < height + gridSpacing; y += gridSpacing) {
                const dot = document.createElementNS(svgNamespace, "circle");
                dot.setAttribute("cx", x);
                dot.setAttribute("cy", y);
                dot.setAttribute("r", "1");
                dot.setAttribute("fill", "var(--secondary-color)");
                dot.setAttribute("fill-opacity", "0.2");
                svg.appendChild(dot);
                dots.push(dot);
            }
        }

        // 2. Create "Energy Strands" (Bezier Curves)
        const strandCount = 12;
        const strands = [];
        for (let i = 0; i < strandCount; i++) {
            const path = document.createElementNS(svgNamespace, "path");
            const d = `M${random(0, width)},${height + 100} Q${random(0, width)},${height / 2} ${random(0, width)},-100`;
            path.setAttribute("d", d);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", i % 2 === 0 ? "var(--secondary-color)" : "var(--accent-color)");
            path.setAttribute("stroke-width", random(1, 3));
            path.setAttribute("stroke-opacity", "0.1");
            svg.appendChild(path);
            strands.push(path);
        }

        // 3. Create Floating Digital Particles (Divs)
        const particleCount = 40;
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'anime-bg-element particle';
            const size = random(2, 6);
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${random(0, 100)}%`;
            p.style.top = `${random(0, 100)}%`;
            p.style.background = i % 2 === 0 ? 'var(--secondary-color)' : 'var(--accent-color)';
            p.style.boxShadow = `0 0 10px ${p.style.background}`;
            p.style.borderRadius = '50%';
            p.style.opacity = random(0.1, 0.5).toString();
            container.appendChild(p);
            particles.push(p);
        }

        // 4. Autonomous Animations
        animate(dots, {
            scale: () => [1, 2],
            opacity: () => [0.2, 0.5],
            duration: () => random(2000, 4000),
            delay: () => random(0, 2000),
            direction: 'alternate',
            loop: true,
            ease: 'inOutQuad'
        });

        animate(strands, {
            strokeDashoffset: [2000, 0],
            opacity: [0.1, 0.3],
            duration: () => random(10000, 20000),
            loop: true,
            ease: 'linear'
        });

        // 5. Scroll Timeline (God-Tier Motion)
        const timeline = createTimeline({
            autoplay: false
        });

        // Parallax Grid
        timeline.add(svg, {
            translateY: -200,
            rotate: 5,
            duration: 1000,
            ease: 'linear'
        }, 0);

        // Particles float upwards and fade out
        timeline.add(particles, {
            translateY: (el, i) => -random(500, 1500),
            translateX: (el, i) => random(-200, 200),
            opacity: 0,
            duration: 1000,
            ease: 'linear'
        }, 0);

        // Strands morph/shift
        timeline.add(strands, {
            scaleX: 1.5,
            translateX: (el, i) => (i % 2 === 0 ? 100 : -100),
            duration: 1000,
            ease: 'linear'
        }, 0);

        // Global background color transition
        timeline.add(container, {
            backgroundColor: ['#020617', '#000000'],
            duration: 1000,
            ease: 'linear'
        }, 0);

        timelineRef.current = timeline;

        const handleScroll = () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            if (timelineRef.current) {
                timelineRef.current.seek(scrollPercent * 1000);
            }
        };

        const handleMouseMove = (e) => {
            const x = (e.clientX / width) - 0.5;
            const y = (e.clientY / height) - 0.5;
            
            animate(particles, {
                translateX: (el, i) => x * (i + 1) * 20,
                translateY: (el, i) => y * (i + 1) * 20,
                duration: 600,
                ease: 'outQuad'
            });

            animate(svg, {
                translateX: x * 30,
                translateY: y * 30,
                duration: 1000,
                ease: 'outQuad'
            });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div 
            ref={bgRef} 
            id="anime-background" 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                overflow: 'hidden',
                pointerEvents: 'none',
                background: '#020617'
            }}
        />
    );
}
