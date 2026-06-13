'use client';

const mockReviews = [
  { id: '1', order: 'ORD-029', farmer: 'Priya Organic Farms', rating: 5, date: '2026-06-11', text: 'Excellent Basmati Rice, very high quality grains and prompt dispatch.' },
  { id: '2', order: 'ORD-012', farmer: 'Ravi Crops', rating: 4, date: '2026-05-28', text: 'Good wheat quality, slight delay in logistics pickup but crop was fine.' },
];

export default function BuyerRatingsPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">⭐ Ratings & Reviews</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>See ratings and reviews you have written and received.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Reviews Left for Suppliers</h2>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {mockReviews.map(r => (
              <div key={r.id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-4)', lastChild: { border: 0 } }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1.5)' }}>
                  <div>
                    <strong style={{ color: 'var(--color-primary)' }}>{r.farmer}</strong>
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

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Ratings Received as Buyer</h2>
          </div>
          <div className="card-body" style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            ⭐ You have a 5.0/5.0 average buyer score (12 ratings). Farmers report that you pay promptly and maintain clear communication.
          </div>
        </div>
      </div>
    </div>
  );
}
