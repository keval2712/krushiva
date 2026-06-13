'use client';

import { useState } from 'react';

const mockNotifications = [
  { id: '1', title: 'Shipment ORD-029 In Transit', body: 'Transporter Gagan Logistics has updated status to IN_TRANSIT. ETA is 4 hours.', date: '2 hours ago', read: false },
  { id: '2', title: 'New RFQ Response Received', body: 'Ravi Crops has submitted a quote response for your Basmati Rice RFQ.', date: '5 hours ago', read: false },
  { id: '3', title: 'Invoice Finalized', body: 'The proforma invoice for Order ORD-029 is ready for download.', date: '1 day ago', read: true },
];

export default function BuyerNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1">🔔 Notifications</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Stay updated with real-time activities across crop shipments and RFQs.</p>
        </div>
        {notifications.some(n => !n.read) && (
          <button className="btn btn-outline btn-sm" onClick={handleMarkAllRead}>
            Mark All as Read
          </button>
        )}
      </header>

      <div className="card">
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {notifications.map((n, i) => (
            <div
              key={n.id}
              style={{
                display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-4)',
                borderBottom: i < notifications.length - 1 ? '1px solid var(--color-border)' : 'none',
                background: n.read ? 'none' : 'rgba(15, 61, 46, 0.03)',
                alignItems: 'start'
              }}
            >
              <div style={{ fontSize: '1.2rem', marginTop: '2px' }}>
                {n.title.includes('Shipment') ? '🚚' : n.title.includes('RFQ') ? '📋' : '📑'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                  <strong style={{ fontSize: 'var(--text-sm)' }}>{n.title}</strong>
                  <span style={{ fontSize: 'var(--text-xxs)', color: 'var(--color-text-muted)' }}>{n.date}</span>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>{n.body}</p>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--color-text-muted)' }}>
              🟢 You have no new notifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
