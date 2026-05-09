import { services } from '@/data/info';

export default function Services() {
  return (
    <section id="services">
      <p className="section-label">SERVICES</p>
      <h2>What I Do Best</h2>
      <div id="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">
              {service.icon === 'cubic' ? '🧊' : service.icon === 'mobile' ? '📱' : '🧠'}
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
