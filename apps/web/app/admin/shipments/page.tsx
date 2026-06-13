'use client';

const mockShipments = [
  { id: '1', number: 'SHP-901', order: 'ORD-029', transporter: 'Gagan Logistics', driver: 'Manpreet Singh', status: 'IN_TRANSIT', eta: '4 hours' },
  { id: '2', number: 'SHP-900', order: 'ORD-028', transporter: 'Rider Cargo', driver: 'Rajesh Kumar', status: 'DELIVERED', eta: 'Completed' },
];

export default function AdminShipmentsPage() {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">🚚 Logistics & Shipments</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Monitor vehicle and driver allocations, live GPS shipment tracking, and ETA statistics.</p>
      </header>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Order ID</th>
              <th>Transporter</th>
              <th>Driver</th>
              <th>Logistics Status</th>
              <th>ETA / Time</th>
            </tr>
          </thead>
          <tbody>
            {mockShipments.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 'var(--font-bold)' }}>{s.number}</td>
                <td>{s.order}</td>
                <td>{s.transporter}</td>
                <td>{s.driver}</td>
                <td>
                  <span className="badge" style={{
                    background: s.status === 'DELIVERED' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 64, 175, 0.1)',
                    color: s.status === 'DELIVERED' ? '#22c55e' : '#1e40af'
                  }}>
                    {s.status}
                  </span>
                </td>
                <td>{s.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
