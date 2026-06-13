'use client';

import { useState } from 'react';

const mockNotifications = [
  { id: '1', title: 'New Available Load', body: 'A new crop shipment request of 2.5 Tons Wheat is available from Karnal to Delhi.', date: '10m ago', read: false },
  { id: '2', title: 'Shipment Approved by Buyer', body: 'Order ORD-029 shipment matches and has been successfully approved.', date: '2h ago', read: false },
  { id: '3', title: 'System Notice', body: 'Please verify that driver license files are clear and readable in the portal.', date: '1d ago', read: true },
];

export default function TransporterNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleMarkRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1">🔔 Notifications</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Platform alerts for new available loads and delivery proof approvals.</p>
        </div>
        {notifications.some(n => !n.read) && (
          <button className="btn btn-outline btn-sm" onClick={handleMarkRead}>
            Mark All Read
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
                background: n.read ? 'none' : 'rgba(30, 64, 175, 0.03)',
                alignItems: 'start'
              }}
            >
              <div style={{ fontSize: '1.2rem', marginTop: '2px' }}>
                {n.title.includes('Load') ? '📦' : n.title.includes('System') ? '⚙️' : '📍'}
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
        </div>
      </div>
    </div>
  );
}
