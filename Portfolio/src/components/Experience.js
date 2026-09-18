import { experience } from '@/data/info';

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-header-row">
        <div>
          <p className="section-label">[ 05 // LOGBOOK & TRACK RECORD ]</p>
          <h2>Professional Experience</h2>
        </div>
        <p className="section-header-desc">
          Building and maintaining production-level applications in fast-paced collaborative environments.
        </p>
      </div>

      <div id="experience-timeline">
        {experience.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="exp-year">{exp.year}</div>
            <div className="exp-content">
              <h3>{exp.role}</h3>
              <h4>{exp.company}</h4>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
