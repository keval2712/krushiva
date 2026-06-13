import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Order Details | Krushiva' };

interface OrderDetailPageProps {
  params: { orderId: string };
}

// Mock order data — replace with API call
const getMockOrder = (orderId: string) => ({
  id: orderId,
  orderNumber: 'ORD-2024-' + orderId.slice(-3),
  status: 'IN_TRANSIT',
  createdAt: '2024-01-14T10:00:00Z',
  totalAmount: 24000,

  farmer: { id: 'f1', name: 'Ravi Kumar', phone: '+91 98765 43210', trustScore: 94, verified: true, kyc: true, location: 'Ajmer, Rajasthan' },
  buyer: { id: 'b1', name: 'Mehul Trading Co.', phone: '+91 91234 56789', trustScore: 88, verified: true, kyc: true },

  items: [
    { id: 'i1', productName: 'Wheat Grade A', quantity: 10, unit: 'QUINTAL', pricePerUnit: 2400, totalPrice: 24000 },
  ],

  shipment: {
    id: 's1', shipmentNumber: 'SHP-7821', trackingNumber: 'TRK-7821',
    status: 'IN_TRANSIT', etaMinutes: 135,
    transporter: { name: 'Ajay Transport', trustScore: 91 },
    driver: { name: 'Suresh Yadav', phone: '+91 94567 12345' },
    vehicle: { number: 'RJ-14-GA-4521', type: 'Truck' },
  },

  invoice: { invoiceNumber: 'INV-2024-045', type: 'PROFORMA', totalAmount: 24000 },

  timeline: [
    { status: 'CREATED', label: 'Order Created', timestamp: '2024-01-14T10:00:00Z', done: true },
    { status: 'ACCEPTED', label: 'Farmer Accepted', timestamp: '2024-01-14T10:45:00Z', done: true },
    { status: 'PICKUP_SCHEDULED', label: 'Pickup Scheduled', timestamp: '2024-01-14T14:00:00Z', done: true },
    { status: 'PICKED_UP', label: 'Picked Up', timestamp: '2024-01-15T06:30:00Z', done: true, hasProof: true },
    { status: 'IN_TRANSIT', label: 'In Transit', timestamp: '2024-01-15T07:00:00Z', done: true, current: true },
    { status: 'DELIVERED', label: 'Delivered', timestamp: null, done: false },
    { status: 'COMPLETED', label: 'Completed', timestamp: null, done: false },
  ],
});

const statusColors: Record<string, string> = {
  IN_TRANSIT: 'status-transit', PICKED_UP: 'status-pickup', ACCEPTED: 'status-accepted',
  DELIVERED: 'status-delivered', COMPLETED: 'status-completed', CANCELLED: 'status-cancelled',
};

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order = getMockOrder(params.orderId);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}>
        <Link href="/farmer/orders" className="btn btn-ghost btn-icon btn-sm">←</Link>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-1)' }}>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em' }}>
              {order.orderNumber}
            </h1>
            <span className={`status-badge ${statusColors[order.status]}`}>
              {order.status.replace(/_/g, ' ')}
            </span>
          </div>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            Created {new Date(order.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Link href={`/track/${order.shipment.trackingNumber}`} className="btn btn-outline">📍 Track Shipment</Link>
          <Link href={`/farmer/orders/${params.orderId}/invoice`} className="btn btn-ghost">📄 Invoice</Link>
          <button className="btn btn-danger btn-sm">Raise Dispute</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Order Items */}
          <div className="card" style={{ borderRadius: 'var(--radius-xl)' }}>
            <h2 style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-5)' }}>Order Items</h2>
            <table className="table" style={{ marginBottom: 'var(--space-4)' }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 'var(--font-medium)', fontSize: 'var(--text-sm)' }}>{item.productName}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{item.quantity} {item.unit}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>₹{item.pricePerUnit.toLocaleString('en-IN')}</td>
                    <td style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>₹{item.totalPrice.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'var(--font-bold)' }}>Total Amount</span>
              <span style={{ fontWeight: 'var(--font-extrabold)', fontSize: 'var(--text-xl)', color: 'var(--color-primary)' }}>₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Shipment Info */}
          <div className="card" style={{ borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
              <h2 style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)' }}>Shipment Details</h2>
              <Link href={`/track/${order.shipment.trackingNumber}`} className="btn btn-primary btn-sm">📍 Track Live</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
              {[
                { label: 'Shipment No', value: order.shipment.shipmentNumber },
                { label: 'Tracking No', value: order.shipment.trackingNumber },
                { label: 'Transporter', value: order.shipment.transporter.name },
                { label: 'Driver', value: `${order.shipment.driver.name} (${order.shipment.driver.phone})` },
                { label: 'Vehicle', value: `${order.shipment.vehicle.number} (${order.shipment.vehicle.type})` },
                { label: 'ETA', value: `~${Math.floor(order.shipment.etaMinutes / 60)}h ${order.shipment.etaMinutes % 60}min` },
              ].map(d => (
                <div key={d.label}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 2 }}>{d.label}</div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>{d.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Participants */}
          <div className="card" style={{ borderRadius: 'var(--radius-xl)' }}>
            <h2 style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-5)' }}>Participants</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              {[
                { role: '🌾 Farmer', ...order.farmer },
                { role: '🛒 Buyer', ...order.buyer },
              ].map(p => (
                <div key={p.role} style={{ padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 4 }}>{p.role}</div>
                  <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', marginBottom: 4 }}>{p.name}</div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {p.verified && <span className="badge badge-success" style={{ fontSize: 10 }}>✅ Verified</span>}
                    {p.kyc && <span className="badge badge-primary" style={{ fontSize: 10 }}>🪪 KYC</span>}
                  </div>
                  <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)' }}>
                    Trust: {p.trustScore}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
              <Link href="/farmer/chat" className="btn btn-outline btn-sm" style={{ flex: 1 }}>💬 Chat with Buyer</Link>
              <Link href="/farmer/chat" className="btn btn-outline btn-sm" style={{ flex: 1 }}>💬 Chat with Transporter</Link>
            </div>
          </div>
        </div>

        {/* Right Column — Timeline */}
        <div>
          <div className="card" style={{ borderRadius: 'var(--radius-xl)', position: 'sticky', top: 'var(--space-6)' }}>
            <h2 style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-6)' }}>Order Timeline</h2>
            <div className="timeline">
              {order.timeline.map((event) => (
                <div key={event.status} className="timeline-item">
                  <div className={`timeline-dot ${event.done ? (event.current ? 'active' : 'completed') : ''}`}>
                    {event.done && !event.current && (
                      <svg width="10" height="8" fill="none" viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    )}
                    {event.current && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title" style={{ color: event.current ? 'var(--color-primary)' : event.done ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                      {event.label}
                      {event.current && <span className="badge badge-primary" style={{ marginLeft: 8, fontSize: 10 }}>NOW</span>}
                    </div>
                    <div className="timeline-time">
                      {event.timestamp ? new Date(event.timestamp).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
                    </div>
                    {(event as any).hasProof && (
                      <div style={{ marginTop: 4, fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 'var(--font-medium)' }}>
                        ✅ Proof attached
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Invoice */}
            <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>Invoice</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                {order.invoice.invoiceNumber} • {order.invoice.type}
              </div>
              <Link href={`/farmer/orders/${params.orderId}/invoice`} className="btn btn-outline btn-sm w-full">
                📥 Download Invoice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
