'use client';
import { useState } from 'react';
import { site } from '@/data/site';

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Set the subject to the "Vision" (message) provided by the user
    data._subject = `Portfolio Vision: ${data.message.substring(0, 50)}${data.message.length > 50 ? '...' : ''}`;

    const endpoint = site.formspreeId 
      ? `https://formspree.io/f/${site.formspreeId}` 
      : `https://formspree.io/${site.contactEmail}`;

    try {
      console.log('Sending to:', endpoint);
      
      // Use FormData directly - more robust for Formspree
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();
      console.log('Formspree response:', result);

      if (response.ok) {
        setStatus('success');
      } else {
        console.error('Formspree error:', result);
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Let's Connect</h2>
      
      {!showForm && status === 'idle' && (
        <div id="contact-intro">
          <button type="button" onClick={() => setShowForm(true)} className="contact-btn">
            Connect Me
          </button>
        </div>
      )}

      {(showForm || status !== 'idle') && (
        <div id="contact-container" className={status === 'success' ? 'success' : ''}>
          {status === 'success' ? (
            <div id="form-status" className="active" role="status">
              <p className="status-msg">MESSAGE RECEIVED</p>
              <p className="status-sub">I'll get back to you shortly.</p>
              <button onClick={() => { setStatus('idle'); setShowForm(false); }} className="contact-btn" style={{marginTop: '2rem'}}>
                Send Another
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="YOUR NAME" required />
                <div className="input-line"></div>
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="YOUR EMAIL" required />
                <div className="input-line"></div>
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="TELL ME ABOUT YOUR VISION..." required></textarea>
                <div className="input-line"></div>
              </div>
              <button type="submit" disabled={status === 'sending'} className="contact-btn">
                {status === 'sending' ? 'SENDING...' : 'Submit'}
              </button>
              {status === 'error' && <p style={{color: 'red', marginTop: '1rem'}}>Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      )}
    </section>
  );
}
