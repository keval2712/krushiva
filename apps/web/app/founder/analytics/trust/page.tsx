'use client';

export default function FounderTrustAnalyticsPage() {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">🛡️ Trust Index Analytics</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Review composite trust statistics, reliability scores, and dispute indexes across the network.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--space-6)' }}>
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Average Trust Scores</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                <span>Farmers Network</span>
                <strong>⭐ 94.2 Avg</strong>
              </div>
              <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '94.2%', background: 'var(--color-primary)' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                <span>Buyers Network</span>
                <strong>⭐ 96.8 Avg</strong>
              </div>
              <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '96.8%', background: 'var(--color-accent)' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                <span>Transporters Network</span>
                <strong>⭐ 92.5 Avg</strong>
              </div>
              <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '92.5%', background: '#1e40af' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="card-title">Escrow & Disputes</h2>
          <ul style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', lineHeight: '1.8', margin: 0, paddingLeft: 'var(--space-4)' }}>
            <li><strong>99.1%</strong> dispute-free deliveries</li>
            <li><strong>0.9%</strong> order dispute rate</li>
            <li>Avg resolution time: <strong>14 hours</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
