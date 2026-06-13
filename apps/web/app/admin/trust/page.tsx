'use client';

const mockTrustAlerts = [
  { id: '1', name: 'Sanjay Traders', role: 'BUYER', score: 68, reason: 'Repeated order cancellations (3 in past 7 days)', status: 'WARNING' },
  { id: '2', name: 'Vikram Crops', role: 'FARMER', score: 55, reason: 'Multiple quality dispute filings from verified buyers', status: 'INVESTIGATION' },
];

export default function AdminTrustPage() {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">🛡️ Trust Index Monitoring</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Audit trust indexes, track profile anomaly flags, and review network rating scores.</p>
      </header>

      <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card-header">
          <h2 className="card-title" style={{ color: '#dc2626' }}>🚨 High Risk Trust Flags</h2>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Participant</th>
                <th>Role</th>
                <th>Trust Score</th>
                <th>Alert Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTrustAlerts.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 'var(--font-bold)' }}>{a.name}</td>
                  <td>{a.role}</td>
                  <td style={{ color: '#dc2626', fontWeight: 'var(--font-black)' }}>{a.score}</td>
                  <td>{a.reason}</td>
                  <td>
                    <span className="badge" style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' }}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
