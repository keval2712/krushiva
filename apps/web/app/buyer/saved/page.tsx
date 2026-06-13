'use client';

import { useState } from 'react';

const mockSuppliers = [
  { id: '1', name: 'Priya Organic Farms', rating: 4.9, trustScore: 95, state: 'Punjab', crops: 'Basmati Rice, Wheat', verified: true },
  { id: '2', name: 'Himachal Spuds', rating: 4.8, trustScore: 94, state: 'Himachal Pradesh', crops: 'Organic Potatoes', verified: true },
];

export default function SavedSuppliersPage() {
  const [suppliers, setSuppliers] = useState(mockSuppliers);

  const handleRemove = (id: string) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
  };

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">🏷️ Saved Suppliers</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Keep track of your favorite verified farmers and agricultural growers.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        {suppliers.map(s => (
          <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <div className="avatar avatar-md" style={{ background: 'var(--color-primary)', color: 'white' }}>
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="card-title" style={{ fontSize: 'var(--text-md)', margin: 0 }}>
                      {s.name} {s.verified && <span title="Verified" style={{ fontSize: 'var(--text-xs)', marginLeft: '2px' }}>✅</span>}
                    </h2>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{s.state}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(s.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}
                  title="Remove from saved"
                >
                  ❤️
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)', fontSize: 'var(--text-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Trust Index Score</span>
                  <strong style={{ color: '#22c55e' }}>⭐ {s.trustScore}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Average Rating</span>
                  <strong>{s.rating} / 5.0</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Primary Crops</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }} title={s.crops}>
                    {s.crops}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Contact</button>
                <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>View Products</button>
              </div>
            </div>
          </div>
        ))}
        {suppliers.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-text-muted)' }}>
            🏷️ You have no saved suppliers yet. Browse the marketplace to add farmers to your list.
          </div>
        )}
      </div>
    </div>
  );
}
