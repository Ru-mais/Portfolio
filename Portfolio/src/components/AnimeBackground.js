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

        // 1. Create a Precision Blueprint Grid & Crosshair SVG
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.opacity = "0.7";
        container.appendChild(svg);

        const gridSpacing = 90;
        const dots = [];
        const crosshairs = [];

        for (let x = 40; x < width + gridSpacing; x += gridSpacing) {
            for (let y = 40; y < height + gridSpacing; y += gridSpacing) {
                // Precision crosshairs (+) at selected intersections
                if ((x + y) % (gridSpacing * 2) === 0) {
                    const cross = document.createElementNS(svgNamespace, "path");
                    const size = 3;
                    cross.setAttribute("d", `M${x - size},${y} L${x + size},${y} M${x},${y - size} L${x},${y + size}`);
                    cross.setAttribute("stroke", "#FF5500");
                    cross.setAttribute("stroke-width", "1");
                    cross.setAttribute("stroke-opacity", "0.35");
                    svg.appendChild(cross);
                    crosshairs.push(cross);
                } else {
                    const dot = document.createElementNS(svgNamespace, "circle");
                    dot.setAttribute("cx", x);
                    dot.setAttribute("cy", y);
                    dot.setAttribute("r", "1");
                    dot.setAttribute("fill", "#19191B");
                    dot.setAttribute("fill-opacity", "0.15");
                    svg.appendChild(dot);
                    dots.push(dot);
                }
            }
        }

        // 2. Technical Hairline Coordinate Strands
        const strandCount = 6;
        const strands = [];
        for (let i = 0; i < strandCount; i++) {
            const path = document.createElementNS(svgNamespace, "path");
            const d = `M${random(0, width)},${height + 50} Q${random(0, width)},${height / 2} ${random(0, width)},-50`;
            path.setAttribute("d", d);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", i % 2 === 0 ? "#FF5500" : "#586958");
            path.setAttribute("stroke-width", "1");
            path.setAttribute("stroke-dasharray", "4 8");
            path.setAttribute("stroke-opacity", "0.2");
            svg.appendChild(path);
            strands.push(path);
        }

        // 3. Autonomous subtle pulse animations
        animate(crosshairs, {
            scale: () => [1, 1.3],
            opacity: () => [0.2, 0.6],
            duration: () => random(2500, 4500),
            delay: () => random(0, 1500),
            direction: 'alternate',
            loop: true,
            ease: 'inOutQuad'
        });

        animate(strands, {
            strokeDashoffset: [200, 0],
            duration: () => random(14000, 24000),
            loop: true,
            ease: 'linear'
        });

        // 4. Scroll Timeline for subtle parallax
        const timeline = createTimeline({
            autoplay: false
        });

        timeline.add(svg, {
            translateY: -80,
            duration: 1000,
            ease: 'linear'
        }, 0);

        timelineRef.current = timeline;

        const handleScroll = () => {
            const scrollPercent = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            if (timelineRef.current) {
                timelineRef.current.seek(scrollPercent * 1000);
            }
        };

        const handleMouseMove = (e) => {
            const x = (e.clientX / width) - 0.5;
            const y = (e.clientY / height) - 0.5;

            animate(svg, {
                translateX: x * 20,
                translateY: y * 20,
                duration: 800,
                ease: 'outQuad'
            });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            if (bgRef.current) {
                bgRef.current.innerHTML = '';
            }
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
                background: '#EAE8E1'
            }}
        />
    );
}
