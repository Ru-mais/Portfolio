import { experience } from '@/data/info';

export default function Experience() {
  return (
    <section id="experience" className="py-32">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-14 pb-6 border-b border-white/5">
        <div>
          <p className="section-label">[ 05 // LOGBOOK & TRACK RECORD ]</p>
          <h2>Professional Experience</h2>
        </div>
        <p className="text-base text-textSecondary max-w-lg lg:text-right">
          Building and maintaining production-level applications in fast-paced collaborative environments.
        </p>
      </div>

      <div id="experience-timeline">
        {experience.map((exp) => (
          <div key={exp.id} className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-14 py-8 border-b border-white/5">
            <div className="font-mono text-base font-bold text-secondary">{exp.year}</div>
            <div className="exp-content">
              <h3 className="text-2xl font-syne font-bold text-textMain mb-1">{exp.role}</h3>
              <h4 className="text-lg font-jakarta text-textSecondary mb-4">{exp.company}</h4>
              <p className="text-base text-textSecondary leading-relaxed">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
