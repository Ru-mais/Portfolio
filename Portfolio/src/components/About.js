export default function About() {
  const pillars = [
    {
      num: "01",
      title: "Systems Precision",
      desc: "Architecting clean, type-safe, and scalable codebases in Flutter, TypeScript, and Node.js with production reliability."
    },
    {
      num: "02",
      title: "Tactile Interaction",
      desc: "Transforming static interfaces into living experiences using Three.js, shaders, GSAP, and fluid physics."
    },
    {
      num: "03",
      title: "Full Product Mindset",
      desc: "Bridging the gap between raw backend architecture, elegant UI design, and actual user business goals."
    }
  ];

  return (
    <section id="about">
      <div className="section-header-row">
        <div>
          <p className="section-label">[ 03 // PERSONAL IDENTITY & PHILOSOPHY ]</p>
          <h2>Who I Am & How I Build</h2>
        </div>
        <p className="section-header-desc">
          Balancing obsessive attention to visual craft with deep algorithmic and architectural fundamentals.
        </p>
      </div>

      <div className="about-bento">
        <div className="about-main-card">
          <span className="mono-sub">[ MANIFESTO // 2026 ]</span>
          <h3>Engineering rigor meets creative intuition.</h3>
          <p>
            I am a Creative Software Developer based in Kerala, India. I specialize in building
            immersive digital applications where high-performance engineering meets fluid visual
            storytelling.
          </p>
          <p style={{marginTop: '1rem'}}>
            Whether developing offline-first retail ERPs with Flutter, crafting web-based 3D
            simulations with Three.js, or building intelligent full-stack applications with Next.js, I
            focus on zero-compromise speed, intuitive ergonomics, and unmistakable visual identity.
          </p>
          <div className="about-actions" style={{marginTop: '2rem'}}>
            <a href="/resume.pdf" className="primary-btn">Download Full CV / Dossier ↗</a>
            <a href="#contact" className="secondary-btn">Let's Discuss a Project</a>
          </div>
        </div>

        <div className="about-pillars-grid">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="pillar-card">
              <span className="pillar-num">{pillar.num}</span>
              <h4>{pillar.title}</h4>
              <p>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
