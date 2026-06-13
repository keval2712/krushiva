'use client';

export default function AdminAnalyticsPage() {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">📊 Admin Analytics</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Monitor marketplace performance, user registrations, and order metrics.</p>
      </header>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Total Gross Volume</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--color-primary)', marginTop: 'var(--space-1)' }}>₹4,52,000</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Total Orders Complete</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--color-primary)', marginTop: 'var(--space-1)' }}>98</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Active Users</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--color-primary)', marginTop: 'var(--space-1)' }}>245</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Active Shipments</div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--color-primary)', marginTop: 'var(--space-1)' }}>14</div>
        </div>
      </div>

      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <h2 className="card-title">Live System Status</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
          All system services are operational. API gateway latency is 42ms. Real-time updates via WebSockets are active.
        </p>
      </div>
    </div>
  );
}
