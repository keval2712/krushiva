'use client';

export default function TransporterTrustPage() {
  const trustScore = 96;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">🛡️ Transporter Trust Score</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Keep track of your delivery reliability and vehicle/driver certification status.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        {/* Score Ring */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)' }}>
          <div style={{
            position: 'relative', width: 120, height: 120, borderRadius: 'var(--radius-full)',
            border: '8px solid rgba(30, 64, 175, 0.1)', borderTopColor: '#1e40af',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'var(--font-black)', color: '#1e40af'
          }}>
            {trustScore}
          </div>
          <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)' }}>Elite Carrier Rating</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>Reliable Logistics Partner</div>
        </div>

        {/* Metrics */}
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Performance Metrics</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-1)' }}>
                <span>On-Time Delivery Rate</span>
                <strong>96%</strong>
              </div>
              <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '96%', background: '#1e40af' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-1)' }}>
                <span>GPS Tracking Compliance</span>
                <strong>100%</strong>
              </div>
              <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%', background: '#1e40af' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-1)' }}>
                <span>Verification / Proof of Delivery Compliance</span>
                <strong>98%</strong>
              </div>
              <div style={{ height: 6, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '98%', background: '#1e40af' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <h2 className="card-title" style={{ marginBottom: 'var(--space-3)' }}>Verification Requirements</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
          Your score improves with each driver license, vehicle RC, and insurance document verified by our admin. Verify all your active fleet vehicles and drivers to display the <strong>Verified Logistics Badge</strong> on available load matchings.
        </p>
      </div>
    </div>
  );
}
