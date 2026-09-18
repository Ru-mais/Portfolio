import { services } from '@/data/info';

export default function Services() {
  return (
    <section id="services">
      <div className="section-header-row">
        <div>
          <p className="section-label">[ 04 // DISCIPLINES & CAPABILITIES ]</p>
          <h2>What I Specialize In</h2>
        </div>
        <p className="section-header-desc">
          From multi-platform mobile architecture to cutting-edge 3D interactive graphics and intelligent full-stack systems.
        </p>
      </div>

      <div id="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">
              {service.icon === 'cubic' ? '🧊' : service.icon === 'mobile' ? '📱' : '⚙️'}
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
