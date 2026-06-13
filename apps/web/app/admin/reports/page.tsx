'use client';

export default function AdminReportsPage() {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">📈 Financial & Growth Reports</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Generate and download crop marketplace reports, volume logs, and regional analytics.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
        <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 className="card-title" style={{ fontSize: 'var(--text-md)', margin: 0 }}>📊 Transaction Volume Report</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', margin: 0, flex: 1 }}>
            Summary of all successful crop trades, average pricing per category, and commission fees.
          </p>
          <button className="btn btn-primary btn-sm">Download PDF</button>
        </div>

        <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 className="card-title" style={{ fontSize: 'var(--text-md)', margin: 0 }}>👥 Network Registration Audit</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', margin: 0, flex: 1 }}>
            Breakdown of registered Farmers, Buyers, and Transporters by state and verification completeness.
          </p>
          <button className="btn btn-primary btn-sm">Download CSV</button>
        </div>

        <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 className="card-title" style={{ fontSize: 'var(--text-md)', margin: 0 }}>⚖️ Dispute & Quality Review</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', margin: 0, flex: 1 }}>
            Compilation of raised disputes, time-to-resolution, and recurring seller quality flags.
          </p>
          <button className="btn btn-primary btn-sm">Download PDF</button>
        </div>
      </div>
    </div>
  );
}
