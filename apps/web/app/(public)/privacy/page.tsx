import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Krushiva',
  description: 'Learn how Krushiva protects and manages your personal, farm, and transaction data.',
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--space-12) var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-10)', textAlign: 'center' }}>
        <span style={{
          color: 'var(--color-primary)',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-bold)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          background: 'var(--color-surface-2)',
          padding: 'var(--space-1) var(--space-3)',
          borderRadius: 'var(--radius-full)'
        }}>
          Legal & Trust
        </span>
        <h1 style={{
          fontSize: 'var(--text-4xl)',
          fontWeight: 'var(--font-black)',
          color: 'var(--color-text)',
          marginTop: 'var(--space-4)',
          letterSpacing: '-0.03em'
        }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
          Last updated: June 13, 2026
        </p>
      </header>

      <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border)', padding: 'var(--space-8) var(--space-10)' }}>
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
            1. Information We Collect
          </h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-4)' }}>
            To operate the Krushiva marketplace and maintain our Trust Network, we collect the following types of information:
          </p>
          <ul style={{ paddingLeft: 'var(--space-6)', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Personal & Contact Data:</strong> Name, phone number, email address, physical farm or delivery location address, and language preferences.
            </li>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Verification & KYC Data:</strong> Govt-issued IDs (Aadhaar, PAN, GST number, or FSSAI license) uploaded for identity verification.
            </li>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Logistics & GPS Data:</strong> Real-time location data from transporters and drivers during active crop shipments to enable tracking.
            </li>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Transaction & Chat Data:</strong> Order records, RFQs, ratings, reviews, and messaging history between farmers, buyers, and transporters.
            </li>
          </ul>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-8) 0' }} />

        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
            2. How We Use Your Information
          </h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-4)' }}>
            We process your information to provide secure and transparent agricultural trade operations, including:
          </p>
          <ul style={{ paddingLeft: 'var(--space-6)', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
            <li style={{ marginBottom: 'var(--space-2)' }}>Facilitating agricultural orders, load matchings, and contract fulfillments.</li>
            <li style={{ marginBottom: 'var(--space-2)' }}>Calculating Trust Scores based on feedback, promptness, and dispute history.</li>
            <li style={{ marginBottom: 'var(--space-2)' }}>Providing real-time tracking updates to buyers and sellers for active shipments.</li>
            <li style={{ marginBottom: 'var(--space-2)' }}>Preventing fraud, resolving disputes, and executing manual KYC reviews.</li>
          </ul>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-8) 0' }} />

        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
            3. Data Sharing & Security
          </h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-4)' }}>
            Krushiva does not sell your personal data. We only share relevant details with other verified network participants (such as showing your location to a transporter picking up your crops, or sharing contact details between transactional partners).
          </p>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
            All passwords are encrypted using strong bcrypt hashing. Communication paths use Secure Sockets Layer (SSL/TLS) encryption, and sensitive KYC documents are kept in secure, restricted-access cloud buckets.
          </p>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-8) 0' }} />

        <section>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
            4. Contact Our Privacy Officer
          </h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-6)' }}>
            If you have questions about how we manage your information, or if you want to request data deletion, please contact us.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Get in Touch
          </Link>
        </section>
      </div>
    </div>
  );
}
