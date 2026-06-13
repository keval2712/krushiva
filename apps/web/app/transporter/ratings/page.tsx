'use client';

const mockReviews = [
  { id: '1', order: 'ORD-029', client: 'Metro Mart', role: 'BUYER', rating: 5, date: '2026-06-12', text: 'On time crop delivery. Safe transit, crops received in perfect condition.' },
  { id: '2', order: 'ORD-012', client: 'Ravi Kumar', role: 'FARMER', rating: 5, date: '2026-05-29', text: 'Driver Manpreet was extremely polite and helped load the basmati rice bags onto the Tata Ace truck.' },
];

export default function TransporterRatingsPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">⭐ Ratings & Reviews</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Feedback from farmers and buyers regarding your cargo transport operations.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Reviews Received</h2>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {mockReviews.map(r => (
              <div key={r.id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-4)', lastChild: { border: 0 } }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1.5)' }}>
                  <div>
                    <strong style={{ color: 'var(--color-primary)' }}>{r.client}</strong>
                    <span className="badge" style={{ fontSize: 'var(--text-xxs)', marginLeft: 'var(--space-2)' }}>{r.role}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginLeft: 'var(--space-2)' }}>({r.order})</span>
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{r.date}</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-2)', color: 'var(--color-accent)' }}>
                  {Array.from({ length: r.rating }).map((_, i) => <span key={i}>⭐</span>)}
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', margin: 0 }}>"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: '#1e40af' }}>5.0 Rating / 5.0</div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }}>Based on 8 shipment reviews</div>
        </div>
      </div>
    </div>
  );
}
