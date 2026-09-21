export default function About() {
  const pillars = [
    {
      num: "01",
      title: "Systems Precision",
      desc: "Architecting clean, type-safe, and scalable codebases in TypeScript, Next.js, and Node.js with production reliability."
    },
    {
      num: "02",
      title: "Tactile Interaction",
      desc: "Transforming static interfaces into living experiences using React, Next.js, GSAP, and modern web APIs."
    },
    {
      num: "03",
      title: "Full Product Mindset",
      desc: "Bridging the gap between raw backend architecture, elegant UI design, and actual user business goals."
    }
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full relative z-10 border-t border-white/5">
      <div className="section-header-row flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-8">
        <div>
          <p className="font-mono text-xs tracking-widest text-textSecondary uppercase mb-4 opacity-80">[ 03 // PERSONAL IDENTITY & PHILOSOPHY ]</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-medium tracking-tight text-textMain uppercase">Who I Am & How I Build</h2>
        </div>
        <p className="text-sm md:text-base font-jakarta text-textSecondary max-w-sm text-left md:text-right">
          Balancing obsessive attention to visual craft with deep algorithmic and architectural fundamentals.
        </p>
      </div>

      <div className="about-bento grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-min">
        <div className="about-main-card col-span-1 lg:col-span-8 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,85,0,0.05)_0%,_transparent_60%)] bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
          <span className="font-mono text-[10px] text-accent tracking-widest uppercase block mb-8 font-bold">[ MANIFESTO // 2026 ]</span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-syne font-medium text-textMain mb-6 leading-[1.1] max-w-2xl">Engineering rigor meets creative intuition.</h3>
          <p className="font-jakarta text-textSecondary text-base md:text-lg max-w-2xl leading-relaxed mb-4">
            I am a Creative Software Developer based in Kerala, India. I specialize in building
            immersive digital applications where high-performance engineering meets fluid visual
            storytelling.
          </p>
          <p className="font-jakarta text-textSecondary text-base md:text-lg max-w-2xl leading-relaxed">
            Whether developing robust enterprise web applications, crafting web-based 3D
            interfaces with React, or building intelligent full-stack applications with Next.js, I
            focus on zero-compromise speed, intuitive ergonomics, and unmistakable visual identity.
          </p>
          <div className="about-actions flex flex-col sm:flex-row gap-6 mt-12">
            <a href="/resume.pdf" className="primary-btn flex items-center justify-center gap-3 px-8 py-4 bg-textMain text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-sm w-fit">Download Full CV / Dossier ↗</a>
            <a href="#contact" className="secondary-btn flex items-center justify-center px-8 py-4 bg-transparent text-textMain border border-textMain/20 font-mono text-xs uppercase tracking-widest hover:bg-white/5 hover:border-textMain/40 transition-all duration-300 rounded-sm w-fit">Let's Discuss a Project</a>
          </div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/20 blur-[80px] rounded-full group-hover:bg-accent/30 transition-colors duration-500"></div>
        </div>

        <div className="about-pillars-grid col-span-1 lg:col-span-4 grid grid-cols-1 gap-4">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="pillar-card bg-white/5 p-6 rounded-2xl border border-white/10 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 group">
              <span className="font-mono text-2xl text-textSecondary opacity-30 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 block mb-4">{pillar.num}</span>
              <h4 className="font-syne text-xl text-textMain mb-2 tracking-wide uppercase font-medium">{pillar.title}</h4>
              <p className="font-jakarta text-sm text-textSecondary leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
