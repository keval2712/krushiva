import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Krushiva — Where Agriculture Connects',
  description: 'Learn about Krushiva\'s mission to connect Farmers, Buyers and Transporters through a trusted agricultural marketplace.',
};

const values = [
  { icon: '🛡️', title: 'Trust First', desc: 'Every user is KYC verified. Every transaction leaves a digital trail. Trust is not assumed — it is earned and measured.' },
  { icon: '🌿', title: 'Farmer-Centered', desc: 'We exist to empower the farmer. Better prices, faster sales, direct connections with buyers — without middlemen.' },
  { icon: '📊', title: 'Radical Transparency', desc: 'Every participant knows exactly what\'s happening, where the produce is, and what it cost. No hidden fees.' },
  { icon: '🚀', title: 'Technology for All', desc: 'Built for mobile-first, designed for the fields. Our platform works for everyone, regardless of tech experience.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-accent))', paddingTop: 'calc(var(--nav-height) + var(--space-20))', paddingBottom: 'var(--space-20)' }}>
        <div className="container">
          <div className="label" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 'var(--space-4)' }}>Our Story</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.03em', marginBottom: 'var(--space-6)', maxWidth: 600 }}>
            We're building the trust layer for Indian agriculture
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-xl)', maxWidth: 560, lineHeight: 1.7 }}>
            Krushiva was founded with a simple belief: every farmer deserves a fair price, every buyer deserves reliable produce, and every transporter deserves to be paid on time.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section" style={{ background: 'var(--color-background)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
            <div>
              <div className="label" style={{ marginBottom: 'var(--space-4)' }}>Our Mission</div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-6)' }}>
                Connect Farmers, Buyers and Transporters through one trusted platform
              </h2>
              <p style={{ color: 'var(--color-text-tertiary)', lineHeight: 1.8, marginBottom: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
                India has 140 million farmers. Most of them have no reliable way to find buyers beyond their local mandi. Buyers can't verify the quality or origin of produce. Transporters have no digital presence.
              </p>
              <p style={{ color: 'var(--color-text-tertiary)', lineHeight: 1.8, fontSize: 'var(--text-lg)' }}>
                Krushiva changes that. We give every participant in the agricultural supply chain the tools, trust, and transparency they deserve.
              </p>
            </div>
            <div style={{ background: 'var(--color-primary-50)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', textAlign: 'center' }}>
              <div style={{ fontSize: 80, marginBottom: 'var(--space-6)' }}>🌱</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                {[
                  { value: '10K+', label: 'Farmers' },
                  { value: '5K+', label: 'Buyers' },
                  { value: '2K+', label: 'Transporters' },
                  { value: '₹50Cr+', label: 'Transactions' },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>{s.value}</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <div className="label" style={{ marginBottom: 'var(--space-4)' }}>What We Stand For</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em' }}>Our Values</h2>
          </div>
          <div className="grid grid-2" style={{ gap: 'var(--space-6)' }}>
            {values.map(v => (
              <div key={v.title} className="feature-card card-hover">
                <div className="feature-icon">{v.icon}</div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-3)' }}>{v.title}</h3>
                <p style={{ color: 'var(--color-text-tertiary)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--color-background)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-5)' }}>
            Join the movement
          </h2>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)' }}>
            Be part of building a trusted, transparent agricultural future for India.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <Link href="/register" className="btn btn-primary btn-lg">Start for Free</Link>
            <Link href="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
