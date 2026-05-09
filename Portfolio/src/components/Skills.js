'use client';
import { useRef } from 'react';
import { skillCategories } from '@/data/info';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SkillMarqueeRow = ({ skills, direction = 1 }) => {
  const innerRef = useRef(null);
  const tl = useRef(null);

  useGSAP(() => {
    const duration = 20 + Math.random() * 10;
    tl.current = gsap.to(innerRef.current, {
      xPercent: direction > 0 ? -33.33 : 33.33,
      duration,
      repeat: -1,
      ease: 'none'
    });

    if (direction < 0) gsap.set(innerRef.current, { xPercent: -33.33 });
  }, { dependencies: [direction] });

  const onMouseEnter = () => tl.current?.pause();
  const onMouseLeave = () => tl.current?.play();

  const tripleSkills = [...skills, ...skills, ...skills];

  return (
    <div className="skills-marquee-row" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="marquee-inner" ref={innerRef}>
        {tripleSkills.map((skill, i) => (
          <div key={i} className="skill-card">
            <img 
              src={`https://skillicons.dev/icons?i=${skill.icon}`} 
              alt={skill.name} 
              className="skill-icon" 
              width={50} 
              height={50} 
            />
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <section id="skills">
      <p className="section-label">EXPERTISE</p>
      <h2>Technical Toolkit</h2>
      <div id="skills-container">
        {skillCategories.map((cat, index) => (
          <div key={cat.title} className="skill-category-wrapper">
            <h3>{cat.title}</h3>
            <SkillMarqueeRow 
              skills={cat.skills} 
              direction={index % 2 === 0 ? 1 : -1} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
