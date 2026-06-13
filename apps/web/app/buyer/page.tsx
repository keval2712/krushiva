import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Buyer Dashboard | Krushiva' };

const stats = [
  { label: 'Active Orders', value: '6', icon: '📑', color: '#eff6ff' },
  { label: 'Pending RFQs', value: '3', icon: '📋', color: '#fef9e7' },
  { label: 'Saved Suppliers', value: '24', icon: '🏷️', color: '#f5f3ff' },
  { label: 'Total Spent', value: '₹4.8L', icon: '💰', color: '#f0fdf4' },
];

const activeOrders = [
  { id: 'ORD-045', farmer: 'Ravi Kumar Farm', product: 'Wheat Grade A', qty: '10 Quintal', amount: '₹24,000', status: 'IN_TRANSIT', eta: '2h', tracking: 'TRK-7821' },
  { id: 'ORD-042', farmer: 'Pune Organic Farms', product: 'Organic Tomato', qty: '5 Quintal', amount: '₹9,500', status: 'PICKED_UP', eta: '6h', tracking: 'TRK-7818' },
  { id: 'ORD-038', farmer: 'Krishna Agricultural', product: 'Cotton Grade B', qty: '20 Quintal', amount: '₹95,000', status: 'ACCEPTED', eta: 'Tomorrow', tracking: 'TRK-7810' },
];

const trendingProducts = [
  { name: 'Wheat (Grade A)', category: 'Cereals', price: '₹2,400/Quintal', farmers: 48, location: 'Rajasthan' },
  { name: 'Organic Tomato', category: 'Vegetables', price: '₹1,800/Quintal', farmers: 32, location: 'Maharashtra' },
  { name: 'Soya Bean', category: 'Pulses', price: '₹4,200/Quintal', farmers: 21, location: 'MP' },
];

const statusColors: Record<string, string> = {
  IN_TRANSIT: 'status-transit', PICKED_UP: 'status-pickup', ACCEPTED: 'status-accepted',
  DELIVERED: 'status-delivered', COMPLETED: 'status-completed',
};
const statusLabels: Record<string, string> = {
  IN_TRANSIT: 'In Transit', PICKED_UP: 'Picked Up', ACCEPTED: 'Accepted',
  DELIVERED: 'Delivered', COMPLETED: 'Completed',
};

export default function BuyerDashboard() {
  return (
    <div>
      <div className="dashboard-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <div className="label" style={{ marginBottom: 'var(--space-2)' }}>Buyer Dashboard</div>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em' }}>
            Welcome back, Priya 🛒
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)', marginTop: 'var(--space-2)' }}>
            <strong style={{ color: 'var(--color-warning)' }}>1 order</strong> requires your confirmation
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Link href="/buyer/rfq/new" className="btn btn-outline">+ Create RFQ</Link>
          <Link href="/buyer/search" className="btn btn-primary">🔍 Find Produce</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.color }}><span style={{ fontSize: 22 }}>{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        {/* Active Orders with Tracking */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>Active Orders</h2>
            <Link href="/buyer/orders" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 'var(--font-medium)' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {activeOrders.map((order) => (
              <div key={order.id} className="card" style={{ borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 4 }}>
                      <Link href={`/buyer/orders/${order.id}`} style={{ fontWeight: 'var(--font-bold)', color: 'var(--color-primary)' }}>{order.id}</Link>
                      <span className={`status-badge ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>{order.product} • {order.qty}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>From: {order.farmer}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'var(--font-extrabold)', color: 'var(--color-text)' }}>{order.amount}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>ETA: {order.eta}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <Link href={`/track/${order.tracking}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>📍 Track Shipment</Link>
                  <Link href={`/buyer/orders/${order.id}`} className="btn btn-ghost btn-sm" style={{ flex: 1 }}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Products */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>Trending Produce</h2>
            <Link href="/buyer/search" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 'var(--font-medium)' }}>Browse →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {trendingProducts.map((p) => (
              <div key={p.name} className="card" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>{p.name}</div>
                  <span className="badge badge-primary">{p.category}</span>
                </div>
                <div style={{ fontWeight: 'var(--font-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>{p.price}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'flex', gap: 'var(--space-3)' }}>
                  <span>👨‍🌾 {p.farmers} farmers</span>
                  <span>📍 {p.location}</span>
                </div>
                <Link href={`/buyer/search?q=${encodeURIComponent(p.name)}`} className="btn btn-primary btn-sm w-full" style={{ marginTop: 'var(--space-3)' }}>
                  View Listings
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
