'use client';
import { useState } from 'react';
import { site } from '@/data/site';

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (site.contactEmail) {
      navigator.clipboard.writeText(site.contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data._subject = `Portfolio Inquiry: ${data.message.substring(0, 50)}${data.message.length > 50 ? '...' : ''}`;

    const endpoint = site.formspreeId
      ? `https://formspree.io/f/${site.formspreeId}`
      : `https://formspree.io/${site.contactEmail}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <p className="section-label">[ 08 // DISPATCH & TRANSMISSION ]</p>
      <h2 id="contact-heading" style={{ textAlign: 'center', marginBottom: '2rem' }}>Initialize Connection</h2>
      <p style={{ maxWidth: '36rem', margin: '0 auto 2.5rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
        Have an experimental project, cross-platform engineering challenge, or creative development inquiry? Let's build something extraordinary.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="secondary-btn"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {copied ? '✓ COPIED TO CLIPBOARD' : `COPY: ${site.contactEmail || 'EMAIL'}`}
        </button>
        {!showForm && status === 'idle' && (
          <button type="button" onClick={() => setShowForm(true)} className="primary-btn">
            Open Message Terminal →
          </button>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }} className="font-mono text-xs uppercase tracking-widest text-textSecondary">
        <a href="https://www.linkedin.com/in/rumais-pp-" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5500] transition-colors border-b border-transparent hover:border-[#FF5500]">LinkedIn</a>
        <a href="https://github.com/Ru-mais" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5500] transition-colors border-b border-transparent hover:border-[#FF5500]">GitHub</a>
        <a href="https://instagram.com/_rumais____" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5500] transition-colors border-b border-transparent hover:border-[#FF5500]">Instagram</a>
        <a href="https://wa.me/971502640302?text=Hello%20Rumais!%20I'm%20interested%20in%20discussing%20a%20project." target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5500] transition-colors border-b border-transparent hover:border-[#FF5500]">WhatsApp</a>
      </div>

      {(showForm || status !== 'idle') && (
        <div id="contact-container" className={status === 'success' ? 'success' : ''}>
          {status === 'success' ? (
            <div id="form-status" className="active" role="status">
              <p className="status-msg">TRANSMISSION RECEIVED</p>
              <p className="status-sub">Your dispatch was logged. I will review and respond promptly.</p>
              <button onClick={() => { setStatus('idle'); setShowForm(false); }} className="contact-btn" style={{ marginTop: '2rem' }}>
                Reset Terminal
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="[ ENTER SENDER / ENTITY NAME ]" required />
                <div className="input-line"></div>
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="[ ENTER RETURN EMAIL ADDRESS ]" required />
                <div className="input-line"></div>
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="[ PROJECT SPECIFICATION & TIMELINE... ]" required></textarea>
                <div className="input-line"></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <button type="submit" disabled={status === 'sending'} className="contact-btn">
                  {status === 'sending' ? 'TRANSMITTING...' : 'Transmit Message →'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="secondary-btn"
                  style={{ border: 'none', background: 'transparent', padding: '0.5rem 1rem' }}
                >
                  Close [×]
                </button>
              </div>
              {status === 'error' && <p style={{ color: '#FF5500', marginTop: '1rem', fontFamily: 'var(--font-mono)' }}>Transmission fault. Please try again or copy email directly.</p>}
            </form>
          )}
        </div>
      )}
    </section>
  );
}
