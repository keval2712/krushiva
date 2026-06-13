'use client';

import { useState } from 'react';

const mockProducts = [
  { id: '1', name: 'Premium Basmati Rice', farmer: 'Priya Organic Farms', trustScore: 95, price: 75, unit: 'KG', qty: 2500, organic: true, state: 'Punjab' },
  { id: '2', name: 'Organic Durum Wheat', farmer: 'Ravi Crops', trustScore: 92, price: 32, unit: 'KG', qty: 5000, organic: true, state: 'Haryana' },
  { id: '3', name: 'Kesar Mangoes', farmer: 'Gujarat Agro', trustScore: 89, price: 150, unit: 'KG', qty: 800, organic: false, state: 'Gujarat' },
  { id: '4', name: 'Organic Potatoes', farmer: 'Himachal Spuds', trustScore: 94, price: 20, unit: 'KG', qty: 4000, organic: true, state: 'Himachal Pradesh' },
  { id: '5', name: 'Mustard Seeds', farmer: 'Rajasthan Seeds', trustScore: 88, price: 90, unit: 'KG', qty: 1500, organic: false, state: 'Rajasthan' },
];

export default function BuyerSearchPage() {
  const [search, setSearch] = useState('');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [minTrust, setMinTrust] = useState(90);

  const filtered = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.farmer.toLowerCase().includes(search.toLowerCase());
    const matchesOrganic = !organicOnly || p.organic;
    const matchesTrust = p.trustScore >= minTrust;
    return matchesSearch && matchesOrganic && matchesTrust;
  });

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">🔍 Crop Marketplace</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Search and filter premium agricultural listings from verified farmers.</p>
      </header>

      {/* Filters */}
      <div className="card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-6)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--space-4)', alignItems: 'center' }}>
        <input
          type="text"
          className="input"
          placeholder="Search by crop name, farmer name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="select" value={minTrust} onChange={e => setMinTrust(parseInt(e.target.value))}>
          <option value={0}>All Trust Scores</option>
          <option value={90}>Trust Score 90+</option>
          <option value={93}>Trust Score 93+</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={organicOnly}
            onChange={e => setOrganicOnly(e.target.checked)}
          />
          Organic Only
        </label>
        <button className="btn btn-primary btn-sm">Apply Filters</button>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        {filtered.map(p => (
          <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ height: 160, background: 'var(--color-surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', borderBottom: '1px solid var(--color-border)' }}>
              {p.name.includes('Rice') ? '🌾' : p.name.includes('Wheat') ? '🌾' : p.name.includes('Mango') ? '🥭' : p.name.includes('Potato') ? '🥔' : '🌱'}
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 'var(--space-3)' }}>
              <div>
                <span className="badge" style={{ background: 'rgba(15, 61, 46, 0.1)', color: 'var(--color-primary)', marginRight: 'var(--space-2)' }}>
                  {p.state}
                </span>
                {p.organic && (
                  <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                    Organic
                  </span>
                )}
              </div>
              <h2 className="card-title" style={{ fontSize: 'var(--text-md)', margin: 0 }}>{p.name}</h2>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Farmer: <strong>{p.farmer}</strong></span>
                <span style={{ color: p.trustScore >= 92 ? '#22c55e' : 'var(--color-accent)' }}>⭐ {p.trustScore} Trust</span>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--color-primary)' }}>₹{p.price}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>/{p.unit}</span>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Available: {p.qty} {p.unit}</div>
              </div>
              <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 'var(--space-2)' }}>
                Request Quote
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-text-muted)' }}>
            🔍 No listings match your search criteria. Try broadening your filters.
          </div>
        )}
      </div>
    </div>
  );
}
