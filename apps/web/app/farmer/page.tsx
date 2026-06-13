import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Farmer Dashboard | Krushiva' };

const stats = [
  { label: 'Active Listings', value: '12', change: '+2', up: true, icon: '📦', color: '#e8f5f0' },
  { label: 'Active Orders', value: '8', change: '+3', up: true, icon: '📑', color: '#eff6ff' },
  { label: 'Pending RFQs', value: '5', change: '+5', up: true, icon: '📋', color: '#fef9e7' },
  { label: 'This Month Revenue', value: '₹1.24L', change: '+18%', up: true, icon: '💰', color: '#f0fdf4' },
];

const recentOrders = [
  { id: 'ORD-001', buyer: 'Mehul Trading Co.', product: 'Wheat (Grade A)', qty: '10 Quintal', amount: '₹24,000', status: 'IN_TRANSIT', time: '2h ago' },
  { id: 'ORD-002', buyer: 'Fresh Foods Pvt Ltd', product: 'Onion (Red)', qty: '5 Quintal', amount: '₹12,500', status: 'ACCEPTED', time: '5h ago' },
  { id: 'ORD-003', buyer: 'Agro Buyers Network', product: 'Tomato (Cherry)', qty: '2 Quintal', amount: '₹6,400', status: 'DELIVERED', time: '1d ago' },
  { id: 'ORD-004', buyer: 'City Wholesalers', product: 'Cotton', qty: '20 Quintal', amount: '₹1,00,000', status: 'COMPLETED', time: '2d ago' },
];

const pendingRFQs = [
  { id: 'RFQ-042', buyer: 'Mehul Trading', product: 'Wheat', qty: '50 Quintal', deadline: 'Today', urgent: true },
  { id: 'RFQ-039', buyer: 'Metro Mart', product: 'Potato', qty: '20 Quintal', deadline: 'Tomorrow', urgent: false },
  { id: 'RFQ-036', buyer: 'Fresh Direct', product: 'Tomato', qty: '10 Quintal', deadline: 'In 3 days', urgent: false },
];

const statusColors: Record<string, string> = {
  CREATED: 'status-created',
  ACCEPTED: 'status-accepted',
  PICKUP_SCHEDULED: 'status-pickup',
  IN_TRANSIT: 'status-transit',
  DELIVERED: 'status-delivered',
  COMPLETED: 'status-completed',
  CANCELLED: 'status-cancelled',
  DISPUTED: 'status-disputed',
};

const statusLabels: Record<string, string> = {
  CREATED: 'Created',
  ACCEPTED: 'Accepted',
  PICKUP_SCHEDULED: 'Pickup Scheduled',
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  DISPUTED: 'Disputed',
};

export default function FarmerDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="dashboard-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <div className="label" style={{ marginBottom: 'var(--space-2)' }}>Farmer Dashboard</div>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em' }}>
            Good morning, Ravi 🌾
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)', marginTop: 'var(--space-2)' }}>
            You have <strong style={{ color: 'var(--color-error)' }}>5 pending RFQs</strong> waiting for responses
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Link href="/farmer/products/new" className="btn btn-primary">
            + Add Product
          </Link>
        </div>
      </div>

      {/* Trust Score Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
        borderRadius: 'var(--radius-2xl)', padding: 'var(--space-6)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
        gap: 'var(--space-4)', marginBottom: 'var(--space-8)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <TrustRing score={94} size={80} />
          <div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-sm)', marginBottom: 4 }}>Your Trust Score</div>
            <div style={{ color: 'white', fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', marginBottom: 'var(--space-2)' }}>Excellent</div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)' }}>✅ KYC Verified</span>
              <span style={{ background: 'rgba(212,175,55,0.25)', color: 'var(--color-secondary)', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', border: '1px solid rgba(212,175,55,0.4)' }}>🏅 Trusted Seller</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', textAlign: 'center' }}>
          {[
            { label: 'Completion', value: '98%' },
            { label: 'Rating', value: '4.8 ⭐' },
            { label: 'Orders', value: '142' },
          ].map((m) => (
            <div key={m.label}>
              <div style={{ color: 'white', fontWeight: 'var(--font-extrabold)', fontSize: 'var(--text-xl)' }}>{m.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--text-xs)' }}>{m.label}</div>
            </div>
          ))}
        </div>
        <Link href="/farmer/trust" className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
          View Details →
        </Link>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.color }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-change ${s.up ? 'up' : 'down'}`}>
              {s.up ? '↑' : '↓'} {s.change} this week
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        {/* Recent Orders */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>Recent Orders</h2>
            <Link href="/farmer/orders" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 'var(--font-medium)' }}>
              View all →
            </Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Buyer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Link href={`/farmer/orders/${order.id}`} style={{ fontWeight: 'var(--font-semibold)', color: 'var(--color-primary)' }}>
                        {order.id}
                      </Link>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{order.time}</div>
                    </td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{order.buyer}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>
                      {order.product}
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{order.qty}</div>
                    </td>
                    <td style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>{order.amount}</td>
                    <td>
                      <span className={`status-badge ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending RFQs */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>Pending RFQs</h2>
            <Link href="/farmer/rfq" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 'var(--font-medium)' }}>
              View all →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {pendingRFQs.map((rfq) => (
              <div key={rfq.id} className="card" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>
                    {rfq.id}
                  </div>
                  {rfq.urgent && <span className="badge badge-error">Urgent</span>}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', marginBottom: 4 }}>{rfq.product}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                  {rfq.buyer} • {rfq.qty}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: rfq.urgent ? 'var(--color-error)' : 'var(--color-text-muted)' }}>
                    ⏰ {rfq.deadline}
                  </span>
                  <Link href={`/farmer/rfq/${rfq.id}`} className="btn btn-primary btn-sm">
                    Respond
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 'var(--space-8)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        {[
          { icon: '📸', label: 'Upload Photos', href: '/farmer/products', desc: 'Add product images' },
          { icon: '💬', label: 'Check Messages', href: '/farmer/chat', desc: '5 unread messages' },
          { icon: '📄', label: 'View Invoice', href: '/farmer/orders', desc: 'Download latest invoice' },
          { icon: '🛡️', label: 'KYC Status', href: '/farmer/profile', desc: 'Verification approved' },
        ].map((action) => (
          <Link key={action.label} href={action.href} className="card-hover-translate" style={{
            display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
            padding: 'var(--space-5)', background: 'var(--color-surface)',
            border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)',
            textDecoration: 'none',
          }}
          >
            <span style={{ fontSize: 28 }}>{action.icon}</span>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--color-text)' }}>{action.label}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{action.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TrustRing({ score, size = 80 }: { score: number; size?: number }) {
  const r = (size / 2) - 6;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={5} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#goldGrad)" strokeWidth={5} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#e8c94f" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-black)', color: 'white', lineHeight: 1 }}>{score}</div>
      </div>
    </div>
  );
}
