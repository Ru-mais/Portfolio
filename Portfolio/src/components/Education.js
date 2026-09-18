'use client';

export default function Education() {
  const credentials = [
    {
      period: "2023 — 2026",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "SES College, Sreekandapuram",
      focus: "Computer Science, Data Structures, Software Engineering",
      status: "Final Year // In Progress"
    },
    {
      period: "2021 — 2023",
      degree: "Senior Secondary (Computer Science)",
      institution: "Sacred Heart Higher Secondary School",
      focus: "C++, Systems Fundamentals, Advanced Mathematics",
      status: "Graduated with Distinction"
    }
  ];

  return (
    <section id="education">
      <div className="section-header-row">
        <div>
          <p className="section-label">[ 07 // ACADEMIC & FOUNDATION ]</p>
          <h2>Education & Credentials</h2>
        </div>
        <p className="section-header-desc">
          Formal academic training in computer science combined with self-directed software craft.
        </p>
      </div>

      <div className="education-grid">
        {credentials.map((edu, idx) => (
          <div key={idx} className="education-card">
            <div className="education-card-top">
              <span className="year-pill">{edu.period}</span>
              <span className="status-tag">{edu.status}</span>
            </div>
            <h3>{edu.degree}</h3>
            <h4>{edu.institution}</h4>
            <p>{edu.focus}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
