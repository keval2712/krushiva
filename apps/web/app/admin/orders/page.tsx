'use client';

const mockOrders = [
  { id: '1', orderNumber: 'ORD-029', buyer: 'Metro Mart', farmer: 'Priya Organic Farms', amount: 187500, status: 'IN_TRANSIT', payment: 'PAID' },
  { id: '2', orderNumber: 'ORD-028', buyer: 'Karan Traders', farmer: 'Ravi Crops', amount: 96000, status: 'DELIVERED', payment: 'PAID' },
  { id: '3', orderNumber: 'ORD-027', buyer: 'Fresh Basket', farmer: 'Sharma Growers', amount: 35000, status: 'CREATED', payment: 'PENDING' },
];

export default function AdminOrdersPage() {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">📑 Order Monitoring</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Audit all agricultural trade transactions, payment states, and lifecycle milestones.</p>
      </header>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer</th>
              <th>Farmer</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map(o => (
              <tr key={o.id}>
                <td style={{ fontWeight: 'var(--font-bold)' }}>{o.orderNumber}</td>
                <td>{o.buyer}</td>
                <td>{o.farmer}</td>
                <td>₹{o.amount.toLocaleString()}</td>
                <td>
                  <span className="badge" style={{
                    background: o.status === 'DELIVERED' ? 'rgba(34, 197, 94, 0.1)' : o.status === 'IN_TRANSIT' ? 'rgba(30, 64, 175, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                    color: o.status === 'DELIVERED' ? '#22c55e' : o.status === 'IN_TRANSIT' ? '#1e40af' : 'var(--color-accent)'
                  }}>
                    {o.status}
                  </span>
                </td>
                <td>
                  <span className="badge" style={{
                    background: o.payment === 'PAID' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                    color: o.payment === 'PAID' ? '#22c55e' : '#dc2626'
                  }}>
                    {o.payment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
