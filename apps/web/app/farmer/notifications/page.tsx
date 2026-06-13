'use client';

import { useState } from 'react';

interface Notification {
  id: string;
  type: 'ORDER' | 'RFQ' | 'SHIPMENT' | 'PAYMENT' | 'TRUST' | 'SYSTEM' | 'CHAT';
  title: string;
  body: string;
  time: string;
  read: boolean;
  href?: string;
  icon: string;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'RFQ', title: 'New RFQ Received', body: 'Mehul Trading Co. wants 50 Quintal of Wheat Grade A', time: '2h ago', read: false, href: '/farmer/rfq', icon: '📋' },
  { id: '2', type: 'ORDER', title: 'Order Accepted', body: 'Your order ORD-045 has been confirmed by the buyer', time: '3h ago', read: false, href: '/farmer/orders/1', icon: '✅' },
  { id: '3', type: 'SHIPMENT', title: 'Pickup Scheduled', body: 'Transporter Ajay will arrive at 6 AM tomorrow for ORD-045', time: '4h ago', read: false, href: '/farmer/orders/1', icon: '🚚' },
  { id: '4', type: 'CHAT', title: 'New Message', body: 'Fresh Direct: "What is the current price for tomato?"', time: '5h ago', read: false, href: '/farmer/chat', icon: '💬' },
  { id: '5', type: 'PAYMENT', title: 'Payment Received', body: '₹1,00,000 received for order ORD-035 (Cotton)', time: '1d ago', read: true, href: '/farmer/orders/4', icon: '💰' },
  { id: '6', type: 'TRUST', title: 'Trust Score Updated', body: 'Your trust score increased to 94 (+2 from last month)', time: '2d ago', read: true, href: '/farmer/trust', icon: '⭐' },
  { id: '7', type: 'SYSTEM', title: 'KYC Approved', body: 'Your PAN verification has been approved', time: '3d ago', read: true, icon: '🪪' },
  { id: '8', type: 'ORDER', title: 'New Review', body: 'City Wholesalers rated you ★★★★★ for order ORD-032', time: '4d ago', read: true, href: '/farmer/ratings', icon: '⭐' },
  { id: '9', type: 'RFQ', title: 'RFQ Expired', body: 'RFQ-031 from Green Grocers expired without a response', time: '5d ago', read: true, icon: '⏰' },
  { id: '10', type: 'SHIPMENT', title: 'Delivery Confirmed', body: 'ORD-032 delivered successfully. Payment released.', time: '1w ago', read: true, href: '/farmer/orders/5', icon: '📦' },
];

const typeColors: Record<string, string> = {
  ORDER: 'var(--color-info-bg)',
  RFQ: 'var(--color-warning-bg)',
  SHIPMENT: '#f5f3ff',
  PAYMENT: 'var(--color-success-bg)',
  TRUST: 'var(--color-secondary-50)',
  SYSTEM: 'var(--color-surface-2)',
  CHAT: 'var(--color-primary-50)',
};

export default function FarmerNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<string>('ALL');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter === 'ALL' ? notifications : notifications.filter(n => n.type === filter);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>
            Notifications
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            {unreadCount > 0 ? <><strong style={{ color: 'var(--color-error)' }}>{unreadCount} unread</strong> notifications</> : 'All caught up! ✅'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={markAllRead}>Mark all as read</button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', overflowX: 'auto' }}>
        {[
          { value: 'ALL', label: 'All' },
          { value: 'ORDER', label: '📑 Orders' },
          { value: 'RFQ', label: '📋 RFQs' },
          { value: 'SHIPMENT', label: '🚚 Shipments' },
          { value: 'PAYMENT', label: '💰 Payments' },
          { value: 'CHAT', label: '💬 Messages' },
        ].map((f) => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            style={{
              padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-full)',
              border: `1.5px solid ${filter === f.value ? 'var(--color-primary)' : 'var(--color-border)'}`,
              background: filter === f.value ? 'var(--color-primary)' : 'var(--color-surface)',
              color: filter === f.value ? 'white' : 'var(--color-text-secondary)',
              fontSize: 'var(--text-xs)', fontWeight: 'var(--font-medium)', cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {filtered.map((n) => (
          <div
            key={n.id}
            onClick={() => { markRead(n.id); if (n.href) window.location.href = n.href; }}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
              padding: 'var(--space-4) var(--space-5)',
              background: n.read ? 'var(--color-surface)' : 'var(--color-primary-50)',
              border: `1px solid ${n.read ? 'var(--color-border)' : 'var(--color-primary-200)'}`,
              borderRadius: 'var(--radius-xl)',
              cursor: n.href ? 'pointer' : 'default',
              transition: 'all 150ms',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 'var(--radius-lg)',
              background: typeColors[n.type], display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>
              {n.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 2 }}>
                {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />}
                <span style={{ fontWeight: n.read ? 'var(--font-medium)' : 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>{n.title}</span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{n.body}</p>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {n.time}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: 56, marginBottom: 'var(--space-4)' }}>🔔</div>
          <p>No notifications in this category</p>
        </div>
      )}
    </div>
  );
}
