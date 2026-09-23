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
    <section id="education" className="py-32">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-14 pb-6 border-b border-white/5">
        <div>
          <p className="section-label">[ 07 // ACADEMIC & FOUNDATION ]</p>
          <h2>Education & Credentials</h2>
        </div>
        <p className="text-base text-textSecondary max-w-lg lg:text-right">
          Formal academic training in computer science combined with self-directed software craft.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
