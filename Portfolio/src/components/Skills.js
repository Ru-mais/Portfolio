'use client';
import { useEffect, useRef, useState } from 'react';
import { skills } from '@/data/info';
import Matter from 'matter-js';

export default function Skills() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const [elements, setElements] = useState([]);
  
  // Duplicate skills to fill the box
  const duplicatedSkills = [...skills, ...skills];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Delay initialization slightly to ensure layout is complete and width > 0
    const initTimer = setTimeout(() => {
      if (!sceneRef.current) return;
      const width = sceneRef.current.clientWidth;
      if (width === 0) return; // Still not mounted

      const Engine = Matter.Engine,
            Runner = Matter.Runner,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            World = Matter.World,
            Bodies = Matter.Bodies;

      const engine = Engine.create();
      engineRef.current = engine;
      const world = engine.world;
      engine.world.gravity.y = 1;

      const height = 600;
      const wallOptions = { isStatic: true, render: { visible: false } };
      
      const ground = Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
      const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
      const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
      const ceiling = Bodies.rectangle(width / 2, -500, width * 2, 100, wallOptions);

      World.add(world, [ground, leftWall, rightWall, ceiling]);

      const newElements = duplicatedSkills.map((skill, index) => {
        // Spawn randomly across the top
        const startX = Math.random() * (width - 100) + 50;
        const startY = -Math.random() * 600 - 100;
        const size = 64; 
        
        const body = Bodies.circle(startX, startY, size / 2, {
          restitution: 0.8, // More bouncy
          friction: 0.05,
          frictionAir: 0.01,
          density: 0.005,
        });
        
        World.add(world, body);
        return { id: index, skill, body, size };
      });
      
      setElements(newElements);

      const mouse = Mouse.create(sceneRef.current);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });
      World.add(world, mouseConstraint);
      
      // Prevent scrolling when dragging
      mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
      mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

      const runner = Runner.create();
      Runner.run(runner, engine);

      let animationFrameId;
      const updateDOM = () => {
        newElements.forEach(({ id, body, size }) => {
          const el = document.getElementById(`skill-node-${id}`);
          if (el) {
            const x = body.position.x - size / 2;
            const y = body.position.y - size / 2;
            el.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
          }
        });
        animationFrameId = requestAnimationFrame(updateDOM);
      };
      
      // Start render loop
      updateDOM();

      const handleResize = () => {
        if (!sceneRef.current) return;
        const newWidth = sceneRef.current.clientWidth;
        Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 50 });
        Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: height / 2 });
      };
      window.addEventListener('resize', handleResize);

      // Save cleanup data to refs so we can use them in the effect cleanup
      sceneRef.current._cleanup = () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        Runner.stop(runner);
        Engine.clear(engine);
        World.clear(world);
      };
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (sceneRef.current?._cleanup) {
        sceneRef.current._cleanup();
      }
    };
  }, []); // Run once on mount

  return (
    <section id="skills" className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full border-t border-white/5 relative z-10">
      <div className="section-header-row flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-8 relative z-20">
        <div>
          <p className="font-mono text-xs tracking-widest text-textSecondary uppercase mb-4 opacity-80">[ 06 // TECHNICAL ARSENAL ]</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-medium tracking-tight text-textMain uppercase">Tools & Technologies</h2>
        </div>
        <p className="text-sm md:text-base font-jakarta text-textSecondary max-w-sm text-left md:text-right">
          Grab and toss the modules around. A robust stack powering modern web and mobile architectures.
        </p>
      </div>

      <div 
        ref={sceneRef} 
        className="w-full h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] bg-white/5 border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl backdrop-blur-sm group"
        style={{ touchAction: 'none' }} // Prevent scrolling while dragging on mobile
      >
        {/* Placeholder text indicating interactivity */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity duration-500">
          <span className="font-syne text-4xl md:text-6xl font-bold uppercase tracking-widest text-textSecondary">Interactive Sandbox</span>
        </div>

        {/* Physics DOM Elements */}
        {elements.map(({ id, skill, size }) => (
          <div
            key={id}
            id={`skill-node-${id}`}
            className="absolute top-0 left-0 flex items-center justify-center bg-background border border-white/20 shadow-xl overflow-hidden cursor-grab active:cursor-grabbing hover:border-accent transition-colors duration-200"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%', // Circle to match physics body
            }}
          >
            <img 
              src={`https://skillicons.dev/icons?i=${skill.icon}`} 
              alt={skill.name} 
              className="w-8 h-8 pointer-events-none" 
              draggable="false"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
