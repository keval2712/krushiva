'use client';

export default function FounderUserAnalyticsPage() {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">👥 User Base Analytics</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Detailed breakdown of registered participants, roles ratios, and verification metrics.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        {/* User ratios */}
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Registration Breakdown</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                <span>Farmers</span>
                <strong>142 registered</strong>
              </div>
              <div style={{ height: 8, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '58%', background: 'var(--color-primary)' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                <span>Buyers & Retailers</span>
                <strong>68 registered</strong>
              </div>
              <div style={{ height: 8, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '28%', background: 'var(--color-accent)' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                <span>Logistics Transporters</span>
                <strong>35 registered</strong>
              </div>
              <div style={{ height: 8, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '14%', background: '#1e40af' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Verification Level</h2>
          <ul style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', lineHeight: '1.8', margin: 0, paddingLeft: 'var(--space-4)' }}>
            <li><strong>72%</strong> verified KYC badges</li>
            <li><strong>15%</strong> pending admin review</li>
            <li><strong>13%</strong> unsubmitted doc status</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
