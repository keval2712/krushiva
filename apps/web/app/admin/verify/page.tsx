'use client';

export default function AdminVerifyPage() {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">✅ Network Verifications</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Manage verified badges, physical site inspection requests, and safety checkpoints.</p>
      </header>

      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <h2 className="card-title">Physical Inspections Queue</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
          Review farmer crop listings requiring on-site verification to verify organic or storage assertions.
        </p>
        <div style={{ textAlign: 'center', padding: 'var(--space-10)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text-muted)' }}>
          🟢 All physical site verification requests resolved.
        </div>
      </div>
    </div>
  );
}
