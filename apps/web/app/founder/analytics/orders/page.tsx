'use client';

export default function FounderOrderAnalyticsPage() {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">💰 Order & Revenue Analytics</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Analyze gross merchandise volume (GMV), successful crop order conversions, and platform fee statistics.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Total GMV (Past 30 Days)</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--color-primary)', marginTop: 'var(--space-1)' }}>₹3,84,000</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Escrow Funds Retained</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--color-primary)', marginTop: 'var(--space-1)' }}>₹68,000</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Platform Commission (2%)</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--color-primary)', marginTop: 'var(--space-1)' }}>₹9,040</div>
        </div>
      </div>
    </div>
  );
}
