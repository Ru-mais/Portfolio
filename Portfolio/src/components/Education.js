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
    <section id="education" className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full border-t border-textMain/10 relative z-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 border-b border-textMain/10 pb-8">
        <div>
          <p className="font-mono text-xs tracking-widest text-[#FF5500] uppercase mb-4 opacity-80 font-bold">[ 07 // ACADEMIC & FOUNDATION ]</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-medium tracking-tight text-textMain uppercase">Education & Credentials</h2>
        </div>
        <p className="text-sm md:text-base font-jakarta text-textSecondary max-w-sm text-left lg:text-right">
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
