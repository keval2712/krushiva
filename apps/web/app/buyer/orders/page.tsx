'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockOrders = [
  { id: '1', orderNumber: 'ORD-045', farmerName: 'Ravi Kumar', product: 'Wheat (Grade A)', qty: '10 Quintal', amount: 24000, status: 'IN_TRANSIT', eta: '~2h 15m', trackingNumber: 'TRK-7821', createdAt: '2024-01-15' },
  { id: '2', orderNumber: 'ORD-042', farmerName: 'Himalayan Agro', product: 'Basmati Rice', qty: '25 Quintal', amount: 120000, status: 'ACCEPTED', createdAt: '2024-01-14' },
  { id: '3', orderNumber: 'ORD-038', farmerName: 'Priya Farms', product: 'Tomato (Cherry)', qty: '5 Quintal', amount: 9000, status: 'DELIVERED', trackingNumber: 'TRK-7810', createdAt: '2024-01-13' },
  { id: '4', orderNumber: 'ORD-035', farmerName: 'Ravi Kumar', product: 'Cotton', qty: '20 Quintal', amount: 100000, status: 'COMPLETED', trackingNumber: 'TRK-7805', createdAt: '2024-01-10' },
  { id: '5', orderNumber: 'ORD-030', farmerName: 'UP Potato Co-op', product: 'Potato', qty: '15 Quintal', amount: 18000, status: 'COMPLETED', trackingNumber: 'TRK-7800', createdAt: '2024-01-08' },
];

const statusConfig: Record<string, { label: string; cls: string; actionLabel?: string }> = {
  CREATED: { label: 'Awaiting Farmer', cls: 'status-created' },
  ACCEPTED: { label: 'Confirmed', cls: 'status-accepted' },
  PICKUP_SCHEDULED: { label: 'Pickup Scheduled', cls: 'status-pickup' },
  IN_TRANSIT: { label: 'In Transit', cls: 'status-transit', actionLabel: 'Track Live' },
  DELIVERED: { label: 'Delivered', cls: 'status-delivered', actionLabel: 'Confirm Receipt' },
  COMPLETED: { label: 'Completed', cls: 'status-completed', actionLabel: 'Rate Seller' },
  CANCELLED: { label: 'Cancelled', cls: 'status-cancelled' },
};

export default function BuyerOrdersPage() {
  const [tab, setTab] = useState<string>('ALL');
  const filtered = tab === 'ALL' ? mockOrders : mockOrders.filter(o => o.status === tab);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>My Orders</h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            {mockOrders.length} total orders • {mockOrders.filter(o => ['IN_TRANSIT', 'ACCEPTED', 'PICKUP_SCHEDULED'].includes(o.status)).length} active
          </p>
        </div>
        <Link href="/marketplace" className="btn btn-primary">Browse Marketplace →</Link>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-1)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)', overflowX: 'auto' }}>
        {['ALL', 'IN_TRANSIT', 'DELIVERED', 'COMPLETED'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)',
              color: tab === t ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderBottom: tab === t ? '2px solid var(--color-primary)' : '2px solid transparent',
              background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
            {t === 'ALL' ? 'All' : statusConfig[t]?.label || t}
          </button>
        ))}
      </div>

      {/* Order Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filtered.map((order) => (
          <div key={order.id} className="card card-hover" style={{ borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 2 }}>
                  <Link href={`/buyer/orders/${order.id}`} style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)', color: 'var(--color-primary)' }}>{order.orderNumber}</Link>
                  <span className={`status-badge ${statusConfig[order.status]?.cls || ''}`}>{statusConfig[order.status]?.label || order.status}</span>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'var(--font-extrabold)', fontSize: 'var(--text-xl)', color: 'var(--color-primary)' }}>₹{order.amount.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Farmer</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>{order.farmerName}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Product</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>{order.product}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Quantity</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>{order.qty}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>ETA</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: order.eta ? 'var(--color-warning)' : undefined }}>{order.eta || '—'}</div></div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Link href={`/buyer/orders/${order.id}`} className="btn btn-outline btn-sm">View Details</Link>
              {order.trackingNumber && <Link href={`/track/${order.trackingNumber}`} className="btn btn-primary btn-sm">📍 Track</Link>}
              {order.status === 'DELIVERED' && <button className="btn btn-primary btn-sm" style={{ background: 'var(--color-success)' }}>✅ Confirm Receipt</button>}
              {order.status === 'COMPLETED' && <button className="btn btn-ghost btn-sm">⭐ Rate Farmer</button>}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: 56, marginBottom: 'var(--space-4)' }}>📑</div>
          <p>No orders found</p>
          <Link href="/marketplace" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>Browse Marketplace</Link>
        </div>
      )}
    </div>
  );
}
