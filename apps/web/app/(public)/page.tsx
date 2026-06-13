import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Krushiva — Where Agriculture Connects',
  description: 'Connect Farmers, Buyers and Transporters through one trusted agricultural marketplace. Verified listings, live tracking, and safe payments.',
};

const stats = [
  { value: '10,000+', label: 'Farmers' },
  { value: '5,000+', label: 'Buyers' },
  { value: '2,000+', label: 'Transporters' },
  { value: '₹50Cr+', label: 'Transactions' },
];

const features = [
  {
    icon: '🌾',
    title: 'Verified Listings',
    desc: 'Every product listing is backed by verified farmers with KYC and trust scores. No fraud, no guesswork.',
  },
  {
    icon: '📦',
    title: 'Live Order Tracking',
    desc: 'Track every shipment in real-time. Know exactly where your produce is, from farm gate to your doorstep.',
  },
  {
    icon: '🛡️',
    title: 'Trust Engine',
    desc: 'Our composite trust scores factor in order history, ratings, disputes, and KYC status of every user.',
  },
  {
    icon: '🚚',
    title: 'Logistics Network',
    desc: 'Access verified transporters with vehicles, drivers, and route coverage. Load matching in minutes.',
  },
  {
    icon: '📋',
    title: 'Digital Proof',
    desc: 'GPS-stamped pickup and delivery photos, OTP confirmation, and digital signatures for every shipment.',
  },
  {
    icon: '💬',
    title: 'Direct Chat',
    desc: 'Communicate directly with farmers, buyers, and transporters. Share documents, photos, and negotiation terms.',
  },
];

const howItWorks = [
  {
    step: '01',
    role: 'Farmer',
    title: 'List Your Produce',
    desc: 'Create your farm profile, upload product photos, set quantity, price, and harvest date. Get discovered by thousands of buyers.',
    color: '#0F3D2E',
  },
  {
    step: '02',
    role: 'Buyer',
    title: 'Find & Order',
    desc: 'Search verified listings, compare suppliers, send RFQs, and place orders. Track every step from acceptance to delivery.',
    color: '#1F6F54',
  },
  {
    step: '03',
    role: 'Transporter',
    title: 'Accept & Deliver',
    desc: 'Browse available loads, accept shipments, update live location, and upload delivery proof with GPS and photos.',
    color: '#D4AF37',
  },
];

const trustItems = [
  { icon: '✅', label: 'KYC Verified' },
  { icon: '⭐', label: 'Trust Score' },
  { icon: '📸', label: 'Photo Proof' },
  { icon: '📍', label: 'GPS Tracking' },
  { icon: '🔐', label: 'OTP Delivery' },
  { icon: '📄', label: 'Digital Invoice' },
];

export default function HomePage() {
  return (
    <>
      {/* ====================================================
          HERO SECTION
          ==================================================== */}
      <section className="hero">
        {/* Animated background elements */}
        <div style={{
          position: 'absolute', top: '10%', right: '5%', width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} className="animate-float" />
        <div style={{
          position: 'absolute', bottom: '20%', left: '3%', width: 250, height: 250,
          background: 'radial-gradient(circle, rgba(31,111,84,0.3) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))', paddingBottom: 'var(--space-24)' }}>
          <div style={{ maxWidth: 720 }} className="hero-content">
            {/* Tag */}
            <div className="hero-tag">
              <span>🌿</span>
              <span>India's Trusted Agricultural Marketplace</span>
            </div>

            {/* Title */}
            <h1 className="hero-title">
              Where <span className="accent">Agriculture</span><br />
              Connects
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Connect Farmers, Buyers and Transporters through one trusted platform.
              Verified listings. Live tracking. Safe payments.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-16)' }}>
              <Link href="/register" className="btn btn-secondary btn-xl">
                Start for Free →
              </Link>
              <Link href="/how-it-works" className="btn btn-xl" style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1.5px solid rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
              }}>
                See How It Works
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 'var(--space-10)', flexWrap: 'wrap' }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', color: 'white', letterSpacing: '-0.02em' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.6)', fontWeight: 'var(--font-medium)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, transparent, var(--color-background))',
        }} />
      </section>

      {/* ====================================================
          TRUST STRIP
          ==================================================== */}
      <section style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ padding: 'var(--space-6) var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-10)', flexWrap: 'wrap' }}>
            <span className="label">Trusted Platform</span>
            {trustItems.map((t) => (
              <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--color-text-secondary)' }}>
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          FEATURES SECTION
          ==================================================== */}
      <section className="section" style={{ background: 'var(--color-background)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <div className="label" style={{ marginBottom: 'var(--space-4)' }}>Platform Features</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.03em', marginBottom: 'var(--space-5)' }}>
              Everything you need for<br />trusted agriculture trade
            </h2>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-tertiary)', maxWidth: 540, margin: '0 auto' }}>
              From first listing to final delivery, Krushiva handles every step of the agricultural supply chain.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 'var(--space-6)' }}>
            {features.map((f) => (
              <div key={f.title} className="feature-card card-hover">
                <div className="feature-icon">{f.icon}</div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-3)' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)', lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          HOW IT WORKS
          ==================================================== */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <div className="label" style={{ marginBottom: 'var(--space-4)' }}>Simple Process</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.03em' }}>
              How Krushiva works
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-8)', position: 'relative' }}>
            {/* Connector line */}
            <div style={{
              position: 'absolute', top: 48, left: '16.66%', right: '16.66%',
              height: 2, background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
              zIndex: 0,
            }} />

            {howItWorks.map((step) => (
              <div key={step.step} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: step.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto var(--space-6)',
                  fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-black)',
                  color: step.step === '03' ? 'var(--color-primary-dark)' : 'white',
                  border: '4px solid var(--color-background)',
                  boxShadow: 'var(--shadow-lg)',
                }}>
                  {step.step}
                </div>
                <div className="badge badge-primary" style={{ marginBottom: 'var(--space-3)' }}>
                  {step.role}
                </div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-3)' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)', lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link href="/how-it-works" className="btn btn-outline btn-lg">
              See the Full Process →
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================
          ROLE SELECTION CTA
          ==================================================== */}
      <section className="section" style={{ background: 'var(--color-background)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.03em', marginBottom: 'var(--space-4)' }}>
              Join as
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
            <RoleCard
              emoji="🌾"
              role="Farmer"
              desc="List your produce, respond to buyer RFQs, manage orders, and build your trust profile."
              href="/for-farmers"
              cta="Join as Farmer"
              features={['Product Listings', 'RFQ Responses', 'Order Management', 'Trust Score']}
              color="var(--color-primary)"
            />
            <RoleCard
              emoji="🛒"
              role="Buyer"
              desc="Search verified suppliers, compare prices, send RFQs, and track your orders in real-time."
              href="/for-buyers"
              cta="Join as Buyer"
              features={['Search & Filter', 'RFQ Creation', 'Live Tracking', 'Supplier Comparison']}
              color="var(--color-accent)"
              highlight
            />
            <RoleCard
              emoji="🚚"
              role="Transporter"
              desc="Find available loads, accept shipments, provide GPS-verified delivery proof, and grow your business."
              href="/for-transporters"
              cta="Join as Transporter"
              features={['Load Matching', 'Live Tracking', 'Delivery Proof', 'Fleet Management']}
              color="var(--color-secondary-dark)"
            />
          </div>
        </div>
      </section>

      {/* ====================================================
          TRUST SECTION
          ==================================================== */}
      <section className="section" style={{ background: 'var(--color-primary)', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '-50%', right: '-10%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
            <div>
              <div className="label" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 'var(--space-4)' }}>Trust Engine</div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.03em', color: 'white', marginBottom: 'var(--space-6)' }}>
                Every participant has a<br /><span style={{ color: 'var(--color-secondary)' }}>verified trust score</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 'var(--space-8)', fontSize: 'var(--text-lg)' }}>
                Our Trust Engine scores every Farmer, Buyer, and Transporter based on order completion rate, cancellations, ratings, disputes, and KYC verification.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                {[
                  { label: 'Order Completion %', icon: '✅' },
                  { label: 'Cancellation Rate', icon: '❌' },
                  { label: 'Average Rating', icon: '⭐' },
                  { label: 'Dispute History', icon: '⚖️' },
                  { label: 'KYC Verification', icon: '🪪' },
                  { label: 'Response Time', icon: '⚡' },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <span>{item.icon}</span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.8)', fontWeight: 'var(--font-medium)' }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Score Visual */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrustScoreDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          QR TRACKING HIGHLIGHT
          ==================================================== */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
            <div style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', textAlign: 'center', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: 80, marginBottom: 'var(--space-4)' }}>📱</div>
              <div style={{
                width: 160, height: 160, margin: '0 auto',
                background: 'var(--color-text)', borderRadius: 'var(--radius-lg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ color: 'white', fontSize: 'var(--text-sm)', textAlign: 'center', padding: 'var(--space-4)' }}>
                  QR Code<br />Sample
                </div>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-4)' }}>
                Scan any shipment QR to view live status
              </p>
            </div>

            <div>
              <div className="label" style={{ marginBottom: 'var(--space-4)' }}>QR Tracking</div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.03em', marginBottom: 'var(--space-5)' }}>
                Scan to track<br />any shipment
              </h2>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-tertiary)', lineHeight: 1.7, marginBottom: 'var(--space-8)' }}>
                Every shipment gets a unique QR code. Anyone with the link can instantly see the order, farmer, buyer, transporter, current status, and full timeline.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {[
                  'Order & Shipment Details',
                  'Full Timeline with Timestamps',
                  'Farmer & Transporter Info',
                  'GPS-Verified Pickup & Delivery Photos',
                  'Live Status Updates',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          FINAL CTA
          ==================================================== */}
      <section style={{ padding: 'var(--space-24) 0', background: 'var(--color-background)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-20) var(--space-16)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 300, height: 300,
              background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'var(--font-black)', letterSpacing: '-0.03em', color: 'white', marginBottom: 'var(--space-5)' }}>
                Ready to join Krushiva?
              </h2>
              <p style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.75)', marginBottom: 'var(--space-10)', maxWidth: 480, margin: '0 auto var(--space-10)' }}>
                Start your first trusted agricultural transaction today. Free to join.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/register" className="btn btn-secondary btn-xl">
                  Create Free Account
                </Link>
                <Link href="/marketplace" className="btn btn-xl" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
                  Browse Marketplace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RoleCard({
  emoji, role, desc, href, cta, features, color, highlight,
}: {
  emoji: string; role: string; desc: string; href: string; cta: string;
  features: string[]; color: string; highlight?: boolean;
}) {
  return (
    <div style={{
      background: highlight ? 'var(--color-primary)' : 'var(--color-surface)',
      border: `1px solid ${highlight ? 'var(--color-primary)' : 'var(--color-border)'}`,
      borderRadius: 'var(--radius-2xl)',
      padding: 'var(--space-8)',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      transition: 'all 200ms',
    }}>
      {highlight && (
        <div style={{
          position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)',
        }}>
          <span className="trust-badge">Most Popular</span>
        </div>
      )}
      <div style={{ fontSize: 48, marginBottom: 'var(--space-4)' }}>{emoji}</div>
      <h3 style={{
        fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)',
        color: highlight ? 'white' : 'var(--color-text)',
        marginBottom: 'var(--space-3)',
      }}>{role}</h3>
      <p style={{
        fontSize: 'var(--text-sm)', lineHeight: 1.7,
        color: highlight ? 'rgba(255,255,255,0.75)' : 'var(--color-text-tertiary)',
        marginBottom: 'var(--space-6)',
      }}>{desc}</p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-8)', flex: 1 }}>
        {features.map((f) => (
          <li key={f} style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
            fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)',
            color: highlight ? 'rgba(255,255,255,0.85)' : 'var(--color-text-secondary)',
          }}>
            <span style={{ color: highlight ? 'var(--color-secondary)' : 'var(--color-success)' }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link href={href} className={`btn ${highlight ? 'btn-secondary' : 'btn-outline'} btn-lg`} style={{ textAlign: 'center' }}>
        {cta}
      </Link>
    </div>
  );
}

function TrustScoreDemo() {
  const score = 94;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
      {/* Score Ring */}
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={180} height={180} viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={90} cy={90} r={70} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={10} />
          <circle
            cx={90} cy={90} r={70}
            fill="none"
            stroke="url(#trustGold)"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
          <defs>
            <linearGradient id="trustGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#e8c94f" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-black)', color: 'white', letterSpacing: '-0.04em' }}>{score}</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.6)', fontWeight: 'var(--font-semibold)' }}>TRUST SCORE</div>
        </div>
      </div>

      {/* Sample User Card */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        width: 260,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-lg)' }}>👨‍🌾</div>
          <div>
            <div style={{ color: 'white', fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>Ravi Kumar</div>
            <div className="trust-badge" style={{ marginTop: 4 }}>✅ KYC Verified</div>
          </div>
        </div>
        {[
          { label: 'Order Completion', value: '98%' },
          { label: 'Avg Rating', value: '4.8 ⭐' },
          { label: 'Orders', value: '142' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'rgba(255,255,255,0.9)' }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
