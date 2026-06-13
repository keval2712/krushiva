'use client';

import { useState } from 'react';

const mockProducts = [
  { id: '1', name: 'Premium Basmati Rice', farmer: 'Priya Organic Farms', price: 75, unit: 'KG', status: 'ACTIVE' },
  { id: '2', name: 'Durum Wheat', farmer: 'Ravi Crops', price: 32, unit: 'KG', status: 'ACTIVE' },
  { id: '3', name: 'Red Onion Bulk', farmer: 'Sharma Growers', price: 18, unit: 'KG', status: 'PENDING' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts);

  const handleModerate = (id: string, status: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">📦 Product Moderation</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Review active crop listings, flag inappropriate content, or approve pending listings.</p>
      </header>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Crop Name</th>
              <th>Farmer</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 'var(--font-bold)' }}>{p.name}</td>
                <td>{p.farmer}</td>
                <td>₹{p.price} / {p.unit}</td>
                <td>
                  <span className="badge" style={{
                    background: p.status === 'ACTIVE' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                    color: p.status === 'ACTIVE' ? '#22c55e' : 'var(--color-accent)'
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  {p.status === 'PENDING' && (
                    <button className="btn btn-primary btn-sm" onClick={() => handleModerate(p.id, 'ACTIVE')}>Approve</button>
                  )}
                  <button className="btn btn-outline btn-sm" style={{ color: '#dc2626', borderColor: '#dc2626' }} onClick={() => handleModerate(p.id, 'FLAGGED')}>Flag</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
