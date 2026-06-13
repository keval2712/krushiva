import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Krushiva',
  description: 'Get in touch with the Krushiva team. We\'re here to help farmers, buyers, and transporters connect.',
};

export default function ContactPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))', paddingTop: 'calc(var(--nav-height) + var(--space-20))', paddingBottom: 'var(--space-20)', textAlign: 'center' }}>
        <div className="container">
          <div className="label" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 'var(--space-4)' }}>Get In Touch</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.03em', marginBottom: 'var(--space-5)' }}>
            Contact Us
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-xl)', maxWidth: 500, margin: '0 auto' }}>
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--color-background)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', maxWidth: 1000, margin: '0 auto' }}>
            {/* Contact Form */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>Send a Message</h2>
              <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label required" htmlFor="contact-name">Your Name</label>
                    <input id="contact-name" className="input input-lg" placeholder="Full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label required" htmlFor="contact-phone">Phone</label>
                    <input id="contact-phone" className="input input-lg" placeholder="+91" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label required" htmlFor="contact-email">Email</label>
                  <input id="contact-email" className="input input-lg" type="email" placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Subject</label>
                  <select id="contact-subject" className="input input-lg select">
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partner">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="press">Press / Media</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label required" htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" className="textarea" rows={5} placeholder="Tell us how we can help..." />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" id="btn-send-contact">Send Message →</button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>Other Ways to Reach Us</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {[
                  { icon: '📧', label: 'Email', value: 'support@krushiva.com', href: 'mailto:support@krushiva.com' },
                  { icon: '📞', label: 'Phone', value: '+91 1800-KRUSHIVA', href: 'tel:+911800' },
                  { icon: '💬', label: 'WhatsApp', value: '+91 98765 00000', href: 'https://wa.me/919876500000' },
                  { icon: '📍', label: 'Office', value: 'Jaipur, Rajasthan, India', href: null },
                ].map((c) => (
                  <div key={c.label} className="card" style={{ borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 2 }}>{c.label}</div>
                      {c.href ? (
                        <a href={c.href} style={{ fontWeight: 'var(--font-semibold)', color: 'var(--color-primary)' }}>{c.value}</a>
                      ) : (
                        <span style={{ fontWeight: 'var(--font-semibold)' }}>{c.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', background: 'var(--color-primary-50)', borderRadius: 'var(--radius-xl)' }}>
                <h3 style={{ fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-3)', color: 'var(--color-primary)' }}>🕐 Support Hours</h3>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                  <div>Monday – Saturday: 8:00 AM – 8:00 PM IST</div>
                  <div>Sunday: 10:00 AM – 4:00 PM IST</div>
                  <div style={{ marginTop: 8, fontWeight: 'var(--font-semibold)' }}>Average response time: &lt;30 minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
