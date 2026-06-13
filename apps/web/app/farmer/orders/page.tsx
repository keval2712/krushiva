'use client';

import { useState } from 'react';
import Link from 'next/link';

type OrderStatus = 'CREATED' | 'ACCEPTED' | 'PICKUP_SCHEDULED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';

interface Order {
  id: string;
  orderNumber: string;
  buyerName: string;
  product: string;
  qty: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  { id: '1', orderNumber: 'ORD-045', buyerName: 'Mehul Trading Co.', product: 'Wheat (Grade A)', qty: '10 Quintal', amount: 24000, status: 'IN_TRANSIT', createdAt: '2024-01-15', trackingNumber: 'TRK-7821' },
  { id: '2', orderNumber: 'ORD-042', buyerName: 'Fresh Foods Pvt Ltd', product: 'Onion (Red)', qty: '5 Quintal', amount: 12500, status: 'ACCEPTED', createdAt: '2024-01-14' },
  { id: '3', orderNumber: 'ORD-038', buyerName: 'Agro Buyers Network', product: 'Tomato (Cherry)', qty: '2 Quintal', amount: 6400, status: 'DELIVERED', createdAt: '2024-01-13', trackingNumber: 'TRK-7810' },
  { id: '4', orderNumber: 'ORD-035', buyerName: 'City Wholesalers', product: 'Cotton', qty: '20 Quintal', amount: 100000, status: 'COMPLETED', createdAt: '2024-01-10', trackingNumber: 'TRK-7805' },
  { id: '5', orderNumber: 'ORD-030', buyerName: 'Metro Mart', product: 'Potato (Jyoti)', qty: '15 Quintal', amount: 18000, status: 'COMPLETED', createdAt: '2024-01-08', trackingNumber: 'TRK-7800' },
  { id: '6', orderNumber: 'ORD-028', buyerName: 'Green Grocers', product: 'Wheat (Grade A)', qty: '8 Quintal', amount: 19200, status: 'CANCELLED', createdAt: '2024-01-06' },
  { id: '7', orderNumber: 'ORD-025', buyerName: 'Spice World', product: 'Green Chilli', qty: '3 Quintal', amount: 9600, status: 'CREATED', createdAt: '2024-01-15' },
  { id: '8', orderNumber: 'ORD-020', buyerName: 'Fresh Direct', product: 'Basmati Rice', qty: '25 Quintal', amount: 120000, status: 'PICKUP_SCHEDULED', createdAt: '2024-01-14', trackingNumber: 'TRK-7818' },
];

const statusConfig: Record<OrderStatus, { label: string; cls: string }> = {
  CREATED: { label: 'Created', cls: 'status-created' },
  ACCEPTED: { label: 'Accepted', cls: 'status-accepted' },
  PICKUP_SCHEDULED: { label: 'Pickup Scheduled', cls: 'status-pickup' },
  PICKED_UP: { label: 'Picked Up', cls: 'status-pickup' },
  IN_TRANSIT: { label: 'In Transit', cls: 'status-transit' },
  DELIVERED: { label: 'Delivered', cls: 'status-delivered' },
  COMPLETED: { label: 'Completed', cls: 'status-completed' },
  CANCELLED: { label: 'Cancelled', cls: 'status-cancelled' },
  DISPUTED: { label: 'Disputed', cls: 'status-disputed' },
};

const tabs: { value: OrderStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All Orders' },
  { value: 'CREATED', label: 'Pending' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'IN_TRANSIT', label: 'In Transit' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export default function FarmerOrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus | 'ALL'>('ALL');

  const filtered = activeTab === 'ALL' ? mockOrders : mockOrders.filter(o => o.status === activeTab);
  const totalRevenue = mockOrders.filter(o => o.status === 'COMPLETED').reduce((s, o) => s + o.amount, 0);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>Orders</h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            {mockOrders.length} total orders • Completed revenue: ₹{(totalRevenue / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Pending Action', value: mockOrders.filter(o => o.status === 'CREATED').length, color: 'var(--color-warning)', bg: 'var(--color-warning-bg)' },
          { label: 'Active', value: mockOrders.filter(o => ['ACCEPTED', 'PICKUP_SCHEDULED', 'PICKED_UP', 'IN_TRANSIT'].includes(o.status)).length, color: 'var(--color-info)', bg: 'var(--color-info-bg)' },
          { label: 'Delivered', value: mockOrders.filter(o => o.status === 'DELIVERED').length, color: 'var(--color-success)', bg: 'var(--color-success-bg)' },
          { label: 'Completed', value: mockOrders.filter(o => o.status === 'COMPLETED').length, color: 'var(--color-primary)', bg: 'var(--color-primary-50)' },
          { label: 'Cancelled', value: mockOrders.filter(o => o.status === 'CANCELLED').length, color: 'var(--color-error)', bg: 'var(--color-error-bg)' },
        ].map((s) => (
          <div key={s.label} style={{ padding: 'var(--space-4)', background: s.bg, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-1)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)', overflowX: 'auto' }}>
        {tabs.map((tab) => (
          <button key={tab.value} onClick={() => setActiveTab(tab.value)} id={`tab-${tab.value.toLowerCase()}`}
            style={{
              padding: 'var(--space-3) var(--space-4)',
              fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)',
              color: activeTab === tab.value ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderBottom: activeTab === tab.value ? '2px solid var(--color-primary)' : '2px solid transparent',
              background: 'none', border: 'none', cursor: 'pointer',
              transition: 'all 150ms', whiteSpace: 'nowrap',
            }}>
            {tab.label}
            <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>
              {tab.value === 'ALL' ? mockOrders.length : mockOrders.filter(o => o.status === tab.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Buyer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link href={`/farmer/orders/${order.id}`} style={{ fontWeight: 'var(--font-bold)', color: 'var(--color-primary)', fontSize: 'var(--text-sm)' }}>
                    {order.orderNumber}
                  </Link>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </div>
                </td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{order.buyerName}</td>
                <td style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>{order.product}</td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{order.qty}</td>
                <td style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)' }}>₹{order.amount.toLocaleString('en-IN')}</td>
                <td><span className={`status-badge ${statusConfig[order.status].cls}`}>{statusConfig[order.status].label}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <Link href={`/farmer/orders/${order.id}`} className="btn btn-ghost btn-sm">View</Link>
                    {order.trackingNumber && (
                      <Link href={`/track/${order.trackingNumber}`} className="btn btn-outline btn-sm">📍 Track</Link>
                    )}
                    {order.status === 'CREATED' && (
                      <button className="btn btn-primary btn-sm">Accept</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: 56, marginBottom: 'var(--space-4)' }}>📑</div>
          <p>No orders in this category</p>
        </div>
      )}
    </div>
  );
}
