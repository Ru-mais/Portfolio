export default function About() {
  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-text">
          <h2>Personal Identity</h2>
          <p>
            I am a passionate Creative Software Developer with a focus on building immersive, highly
            interactive digital experiences. Currently pursuing a BCA, I specialize in blending
            engineering precision with creative design using Flutter, Three.js, and the MERN stack.
          </p>
          <div style={{marginTop: '2rem'}}>
            <a href="/resume.pdf" className="secondary-btn" style={{display: 'inline-block'}}>Download Resume</a>
          </div>
        </div>
        <div className="education">
          <h3>Education</h3>
          <div className="edu-item">
            <span className="year">2023 - 2026</span>
            <p><strong>BCA</strong> - SES College, Sreekandapuram</p>
          </div>
          <div className="edu-item">
            <span className="year">2021 - 2023</span>
            <p><strong>Computer Science</strong> - Sacred Heart Higher Secondary</p>
          </div>
        </div>
      </div>
    </section>
  );
}
