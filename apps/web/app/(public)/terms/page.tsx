import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Krushiva',
  description: 'Understand the rules, guidelines, and agreements for participating in the Krushiva Agricultural Network.',
};

export default function TermsPage() {
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
          Legal & Rules
        </span>
        <h1 style={{
          fontSize: 'var(--text-4xl)',
          fontWeight: 'var(--font-black)',
          color: 'var(--color-text)',
          marginTop: 'var(--space-4)',
          letterSpacing: '-0.03em'
        }}>
          Terms & Conditions
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
          Last updated: June 13, 2026
        </p>
      </header>

      <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border)', padding: 'var(--space-8) var(--space-10)' }}>
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
            1. User Accounts and Verification
          </h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-4)' }}>
            To ensure the integrity of the Krushiva Marketplace, all registration inputs must be authentic.
          </p>
          <ul style={{ paddingLeft: 'var(--space-6)', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Farmers:</strong> Must list actual produce available, harvested or slated for harvest. Listings must specify accurate quantity, unit, and location.
            </li>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Buyers:</strong> Must submit genuine requests for quote (RFQs) and commit to payments according to agreed terms.
            </li>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Transporters:</strong> Must list valid transport vehicles, provide active driver licenses, and ensure GPS tracking updates are active during delivery.
            </li>
          </ul>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-8) 0' }} />

        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
            2. Trust Score and Reliability System
          </h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
            By participating in the Krushiva platform, you agree to the automated calculation and public display of your Trust Score. Trust Scores are compiled based on transaction completeness, timing reliability, ratings, cancellation rates, and dispute resolution history. Manipulation of scores, spam reviews, or collusive ratings will result in immediate suspension or permanent banning.
          </p>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-8) 0' }} />

        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
            3. Order & Shipment Terms
          </h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-4)' }}>
            A contract is established once a Buyer accepts a Farmer's quote response or a listing order is created.
          </p>
          <ul style={{ paddingLeft: 'var(--space-6)', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              Quality and quantity verification occurs at pickup (dispatch photos) and at delivery (delivery confirmation with OTP).
            </li>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              In the event of quality discrepancies or weight differences, details must be entered into the shipment records during delivery.
            </li>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              Disputes must be raised through the official Dispute interface and will be mediated by a Krushiva Admin.
            </li>
          </ul>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-8) 0' }} />

        <section>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
            4. Service Modifications and Limitations
          </h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-6)' }}>
            We reserve the right to suspend accounts, hide crop listings, or modify the Trust Index rules to maintain agricultural safety and fair trading conditions.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <Link href="/contact" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Contact Support
            </Link>
            <Link href="/about" className="btn btn-outline" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Learn About Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
