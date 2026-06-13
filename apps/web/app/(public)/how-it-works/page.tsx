import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works | Krushiva',
  description: 'Learn how Krushiva connects Farmers, Buyers and Transporters through a trusted agricultural marketplace.',
};

const steps = {
  farmer: [
    { n: 1, title: 'Create Farm Profile', desc: 'Register, complete KYC, and build your verified farm profile with crops, certifications, and bank details.' },
    { n: 2, title: 'List Your Produce', desc: 'Add products with photos, quantity, price, harvest date, and location. Your listing goes live instantly.' },
    { n: 3, title: 'Respond to RFQs', desc: 'Receive and respond to buyer RFQs. Negotiate prices directly through the platform chat.' },
    { n: 4, title: 'Confirm & Dispatch', desc: 'Accept orders, coordinate pickup with the assigned transporter, and upload dispatch photos as proof.' },
    { n: 5, title: 'Get Paid', desc: 'Payment is released after successful delivery confirmation. Build your trust score with every order.' },
  ],
  buyer: [
    { n: 1, title: 'Create Buyer Account', desc: 'Register as a buyer, complete KYC, and add your business details for verified status.' },
    { n: 2, title: 'Search & Discover', desc: 'Browse thousands of verified produce listings. Filter by category, location, price, organic status, and trust score.' },
    { n: 3, title: 'Send RFQ or Order', desc: 'Send a Request for Quote to multiple farmers simultaneously, or place a direct order from a listing.' },
    { n: 4, title: 'Track in Real-Time', desc: 'Every shipment is GPS-tracked. You always know where your produce is and when it arrives.' },
    { n: 5, title: 'Confirm & Rate', desc: 'Confirm delivery with OTP, rate the farmer and transporter, and your order is complete.' },
  ],
  transporter: [
    { n: 1, title: 'Create Transporter Profile', desc: 'Register your fleet, upload vehicle RC and insurance, add driver details, and set service areas.' },
    { n: 2, title: 'Browse Available Loads', desc: 'See loads available in your service area. Filter by route, weight, distance, and earnings.' },
    { n: 3, title: 'Accept & Coordinate', desc: 'Accept a load, coordinate with the farmer for pickup time and address, and plan your route.' },
    { n: 4, title: 'Upload Pickup Proof', desc: 'At pickup, upload GPS-stamped photos, record actual quantity, and confirm with the farmer.' },
    { n: 5, title: 'Deliver & Earn', desc: 'Deliver to the buyer, get OTP confirmation, upload delivery proof, and receive your payment.' },
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))', paddingTop: 'calc(var(--nav-height) + var(--space-20))', paddingBottom: 'var(--space-20)', textAlign: 'center' }}>
        <div className="container">
          <div className="label" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 'var(--space-4)' }}>Simple Process</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.03em', marginBottom: 'var(--space-5)' }}>
            How Krushiva Works
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-xl)', maxWidth: 560, margin: '0 auto' }}>
            A step-by-step guide for every role on the platform
          </p>
        </div>
      </div>

      {/* Process Sections */}
      {Object.entries(steps).map(([role, roleSteps], i) => (
        <section key={role} className="section" style={{ background: i % 2 === 0 ? 'var(--color-background)' : 'var(--color-surface)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
              <div style={{ fontSize: 56, marginBottom: 'var(--space-4)' }}>
                {role === 'farmer' ? '🌾' : role === 'buyer' ? '🛒' : '🚚'}
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-4)', textTransform: 'capitalize' }}>
                For {role}s
              </h2>
              <p style={{ color: 'var(--color-text-tertiary)', maxWidth: 480, margin: '0 auto', fontSize: 'var(--text-lg)' }}>
                {role === 'farmer' ? 'List your produce and reach thousands of verified buyers across India.' :
                 role === 'buyer' ? 'Source directly from verified farmers and track every delivery in real-time.' :
                 'Find agricultural loads, earn well, and build your logistics reputation.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 720, margin: '0 auto' }}>
              {roleSteps.map((s) => (
                <div key={s.n} style={{
                  display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start',
                  padding: 'var(--space-6)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  transition: 'all 200ms',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                    background: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 'var(--font-extrabold)', fontSize: 'var(--text-xl)',
                  }}>
                    {s.n}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>{s.title}</h3>
                    <p style={{ color: 'var(--color-text-tertiary)', lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
              <Link href={`/register?role=${role}`} className="btn btn-primary btn-lg">
                Join as {role.charAt(0).toUpperCase() + role.slice(1)} →
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section" style={{ background: 'var(--color-primary)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.03em', marginBottom: 'var(--space-5)' }}>
            Ready to start?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-10)' }}>
            Join thousands of farmers, buyers, and transporters already on Krushiva.
          </p>
          <Link href="/register" className="btn btn-secondary btn-xl">Create Free Account</Link>
        </div>
      </section>
    </>
  );
}
