'use client';

export default function BuyerTrustPage() {
  const trustScore = 98; // Mock trust score
  
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">🛡️ Buyer Trust Network</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Learn how your Trust Score is calculated and see your current ratings.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        {/* Trust Ring Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)' }}>
          <div style={{
            position: 'relative', width: 120, height: 120, borderRadius: 'var(--radius-full)',
            border: '8px solid rgba(15, 61, 46, 0.1)', borderTopColor: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'var(--font-black)', color: 'var(--color-primary)'
          }}>
            {trustScore}
          </div>
          <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)' }}>Excellent Trust Index</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>Top 5% of Buyer Network</div>
        </div>

        {/* Metrics Breakdown */}
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Metric Breakdown</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-1)' }}>
                <span>Payment Promptness Rate</span>
                <strong>100%</strong>
              </div>
              <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%', background: '#22c55e' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-1)' }}>
                <span>Order Completion Rate</span>
                <strong>98%</strong>
              </div>
              <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '98%', background: '#22c55e' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-1)' }}>
                <span>Order Cancellation Rate</span>
                <strong>2%</strong>
              </div>
              <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '2%', background: '#dc2626' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Benefits */}
      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <h2 className="card-title" style={{ marginBottom: 'var(--space-3)' }}>Benefits of High Trust Scores</h2>
        <ul style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', paddingLeft: 'var(--space-5)' }}>
          <li style={{ marginBottom: 'var(--space-2)' }}>Farmers are 3.5x more likely to respond to your RFQs and provide lower price offers.</li>
          <li style={{ marginBottom: 'var(--space-2)' }}>Eligible for delayed escrow payment terms and credit options in future versions.</li>
          <li style={{ marginBottom: 'var(--space-2)' }}>Priority support and fast-tracked dispute reviews.</li>
        </ul>
      </div>
    </div>
  );
}
