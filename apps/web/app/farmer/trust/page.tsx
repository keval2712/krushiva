import Link from 'next/link';

const trustBreakdown = [
  { label: 'Order Completion Rate', score: 98, max: 25, earned: 24.5, desc: '98% of orders completed successfully', icon: '📦' },
  { label: 'Average Rating', score: 4.8, max: 20, earned: 19.2, desc: '4.8 out of 5 from 142 reviews', icon: '⭐' },
  { label: 'KYC Verification', score: 100, max: 15, earned: 15, desc: 'Aadhaar, PAN, Bank verified', icon: '🪪' },
  { label: 'Response Time', score: 92, max: 10, earned: 9.2, desc: 'Avg reply: 28 minutes', icon: '⏱️' },
  { label: 'Dispute Resolution', score: 100, max: 10, earned: 10, desc: '0 unresolved disputes', icon: '⚖️' },
  { label: 'Account Age', score: 90, max: 10, earned: 9, desc: 'Active since March 2023', icon: '📅' },
  { label: 'Transaction Volume', score: 85, max: 10, earned: 8.5, desc: '142 orders, ₹28L total value', icon: '💰' },
];

const recentReviews = [
  { from: 'Mehul Trading Co.', role: 'Buyer', rating: 5, comment: 'Excellent quality wheat. On-time dispatch. Will order again.', date: '2 days ago', orderNumber: 'ORD-041' },
  { from: 'Fresh Direct', role: 'Buyer', rating: 4, comment: 'Good produce quality. Packing could be better.', date: '5 days ago', orderNumber: 'ORD-036' },
  { from: 'City Wholesalers', role: 'Buyer', rating: 5, comment: 'Very responsive farmer. Always delivers as promised.', date: '1 week ago', orderNumber: 'ORD-032' },
  { from: 'Ajay Transport', role: 'Transporter', rating: 5, comment: 'Easy pickup coordination. Produce was ready and well-packed.', date: '1 week ago', orderNumber: 'ORD-032' },
];

const badges = [
  { label: 'Trusted Seller', desc: 'Completed 100+ orders', icon: '🏅', earned: true, earnedDate: 'Oct 2023' },
  { label: 'KYC Gold', desc: 'All documents verified', icon: '🪪', earned: true, earnedDate: 'Mar 2023' },
  { label: 'Fast Responder', desc: 'Avg response < 30 min', icon: '⚡', earned: true, earnedDate: 'Jul 2023' },
  { label: 'Zero Disputes', desc: 'No active or past disputes', icon: '🛡️', earned: true, earnedDate: 'Mar 2023' },
  { label: 'Premium Seller', desc: 'Maintain 95+ trust score', icon: '💎', earned: false, earnedDate: null },
  { label: 'Organic Certified', desc: 'Certified organic producer', icon: '🌿', earned: false, earnedDate: null },
];

export default function FarmerTrustPage() {
  const totalScore = trustBreakdown.reduce((s, t) => s + t.earned, 0);
  const maxScore = trustBreakdown.reduce((s, t) => s + t.max, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>
          Trust Score
        </h1>
        <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
          Your trust score reflects your reliability on Krushiva
        </p>
      </div>

      {/* Score Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
        borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)',
        display: 'grid', gridTemplateColumns: '200px 1fr', gap: 'var(--space-8)', alignItems: 'center',
        marginBottom: 'var(--space-8)', color: 'white',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto' }}>
            <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
              <circle cx="80" cy="80" r="70" fill="none" stroke="url(#goldGrad2)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s ease' }} />
              <defs>
                <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#e8c94f" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-black)', lineHeight: 1 }}>{Math.round(totalScore)}</div>
              <div style={{ fontSize: 'var(--text-xs)', opacity: 0.7 }}>of {maxScore}</div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--text-sm)', opacity: 0.6, marginBottom: 'var(--space-2)' }}>Overall Trust Level</div>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-extrabold)', marginBottom: 'var(--space-3)' }}>
            Excellent
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
            {badges.filter(b => b.earned).map(b => (
              <span key={b.label} style={{ background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', display: 'flex', alignItems: 'center', gap: 4 }}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
            {[
              { label: 'Orders', value: '142' },
              { label: 'Rating', value: '4.8 ⭐' },
              { label: 'Completion', value: '98%' },
              { label: 'Rank', value: 'Top 5%' },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontWeight: 'var(--font-extrabold)', fontSize: 'var(--text-lg)' }}>{m.value}</div>
                <div style={{ fontSize: 'var(--text-xs)', opacity: 0.6 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        {/* Score Breakdown */}
        <div>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-5)' }}>Score Breakdown</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {trustBreakdown.map((item) => (
              <div key={item.label} className="card" style={{ borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{ fontSize: 24 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>{item.label}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{item.desc}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'var(--font-extrabold)', color: 'var(--color-primary)' }}>
                      {item.earned}<span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 'var(--font-regular)' }}>/{item.max}</span>
                    </div>
                  </div>
                </div>
                <div className="progress-bar" style={{ height: 6 }}>
                  <div className="progress-fill" style={{ width: `${(item.earned / item.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Reviews */}
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-5)' }}>Recent Reviews</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {recentReviews.map((r, i) => (
              <div key={i} className="card" style={{ borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div className="avatar avatar-sm" style={{ background: 'var(--color-primary)', color: 'white' }}>{r.from.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>{r.from}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{r.role} • {r.orderNumber}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} style={{ color: j < r.rating ? '#D4AF37' : 'var(--color-border)', fontSize: 16 }}>★</span>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-2)' }}>"{r.comment}"</p>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{r.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-5)' }}>Badges</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {badges.map((b) => (
              <div key={b.label} className="card" style={{
                borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)',
                opacity: b.earned ? 1 : 0.5,
                background: b.earned ? 'var(--color-surface)' : 'var(--color-surface-2)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <span style={{ fontSize: 28 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>{b.label}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{b.desc}</div>
                    {b.earned && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', marginTop: 2 }}>✅ Earned {b.earnedDate}</div>}
                    {!b.earned && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warning)', marginTop: 2 }}>🔒 Locked</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="card" style={{ borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', marginTop: 'var(--space-6)', background: 'var(--color-primary-50)' }}>
            <h3 style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>💡 Improve Your Score</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                'Complete all pending orders on time',
                'Respond to buyer messages within 30 minutes',
                'Add quality photos to all listings',
                'Maintain 0 disputes',
                'Complete organic certification for bonus badge',
              ].map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-primary)', flexShrink: 0 }}>→</span> {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
