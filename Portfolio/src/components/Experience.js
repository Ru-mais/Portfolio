import { experience } from '@/data/info';

export default function Experience() {
  return (
    <section id="experience">
      <p className="section-label">JOURNAL</p>
      <h2>Work Experience</h2>
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
