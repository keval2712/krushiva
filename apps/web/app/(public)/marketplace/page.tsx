'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = [
  { slug: 'all', label: 'All', emoji: '🌍' },
  { slug: 'cereals', label: 'Cereals', emoji: '🌾' },
  { slug: 'vegetables', label: 'Vegetables', emoji: '🥦' },
  { slug: 'fruits', label: 'Fruits', emoji: '🍎' },
  { slug: 'pulses', label: 'Pulses', emoji: '🫘' },
  { slug: 'spices', label: 'Spices', emoji: '🌶️' },
  { slug: 'oilseeds', label: 'Oilseeds', emoji: '🌻' },
  { slug: 'cotton', label: 'Cotton', emoji: '☁️' },
  { slug: 'dairy', label: 'Dairy', emoji: '🥛' },
];

const sortOptions = [
  { value: 'latest', label: 'Latest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'trust', label: 'Highest Trust Score' },
];

const products = [
  { id: '1', name: 'Wheat Grade A', category: 'Cereals', price: 2400, unit: 'Quintal', qty: 500, location: 'Ajmer, Rajasthan', farmer: { name: 'Ravi Kumar', trustScore: 94, verified: true, kyc: true }, organic: false, harvestDate: '2024-01-10', image: '🌾' },
  { id: '2', name: 'Organic Tomato', category: 'Vegetables', price: 1800, unit: 'Quintal', qty: 120, location: 'Nashik, MH', farmer: { name: 'Priya Farms', trustScore: 88, verified: true, kyc: true }, organic: true, harvestDate: '2024-01-12', image: '🍅' },
  { id: '3', name: 'Basmati Rice', category: 'Cereals', price: 4800, unit: 'Quintal', qty: 800, location: 'Dehradun, UK', farmer: { name: 'Himalayan Agro', trustScore: 92, verified: true, kyc: true }, organic: false, harvestDate: '2024-01-05', image: '🍚' },
  { id: '4', name: 'Green Chilli', category: 'Spices', price: 3200, unit: 'Quintal', qty: 50, location: 'Guntur, AP', farmer: { name: 'Krishna Farm', trustScore: 86, verified: true, kyc: false }, organic: false, harvestDate: '2024-01-14', image: '🌶️' },
  { id: '5', name: 'Soya Bean', category: 'Pulses', price: 4200, unit: 'Quintal', qty: 300, location: 'Indore, MP', farmer: { name: 'MP Agri Hub', trustScore: 91, verified: true, kyc: true }, organic: false, harvestDate: '2024-01-08', image: '🫘' },
  { id: '6', name: 'Sunflower Oil Seeds', category: 'Oilseeds', price: 5800, unit: 'Quintal', qty: 200, location: 'Bidar, KA', farmer: { name: 'Karnataka Farms', trustScore: 89, verified: true, kyc: true }, organic: false, harvestDate: '2024-01-11', image: '🌻' },
  { id: '7', name: 'Alphonso Mango', category: 'Fruits', price: 8500, unit: 'Quintal', qty: 80, location: 'Ratnagiri, MH', farmer: { name: 'Konkan Orchards', trustScore: 95, verified: true, kyc: true }, organic: true, harvestDate: '2024-05-15', image: '🥭' },
  { id: '8', name: 'Turmeric (Bulb)', category: 'Spices', price: 6200, unit: 'Quintal', qty: 150, location: 'Erode, TN', farmer: { name: 'Erode Spice Farm', trustScore: 87, verified: true, kyc: true }, organic: false, harvestDate: '2024-01-09', image: '🟡' },
  { id: '9', name: 'Potato (Jyoti)', category: 'Vegetables', price: 1200, unit: 'Quintal', qty: 600, location: 'Agra, UP', farmer: { name: 'UP Potato Co-op', trustScore: 83, verified: false, kyc: false }, organic: false, harvestDate: '2024-01-13', image: '🥔' },
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sort, setSort] = useState('latest');
  const [search, setSearch] = useState('');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = products.filter(p => {
    if (selectedCategory !== 'all' && p.category.toLowerCase() !== selectedCategory) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (organicOnly && !p.organic) return false;
    if (verifiedOnly && !p.farmer.verified) return false;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)' }}>
      {/* Simple header */}
      <div style={{ background: 'var(--color-primary)', padding: 'var(--space-4) var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ color: 'white', fontWeight: 'var(--font-black)', fontSize: 'var(--text-xl)', letterSpacing: '-0.04em', textDecoration: 'none' }}>
          KRUS<span style={{ color: 'var(--color-secondary)' }}>IV</span>A
        </Link>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Link href="/login" className="btn btn-ghost btn-sm" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)' }}>Sign In</Link>
          <Link href="/register" className="btn btn-secondary btn-sm">Get Started</Link>
        </div>
      </div>

      <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
        {/* Page Title */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <div className="label" style={{ marginBottom: 'var(--space-2)' }}>Marketplace</div>
          <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.03em', marginBottom: 'var(--space-2)' }}>
            Fresh from the Farm
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)' }}>
            {filtered.length} verified listings available
          </p>
        </div>

        {/* Search */}
        <div className="search-bar" style={{ marginBottom: 'var(--space-6)', maxWidth: 600 }}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search produce, location, farmer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="marketplace-search"
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 'var(--space-1)' }}>✕</button>
          )}
          <button className="btn btn-primary btn-sm">Search</button>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-2)' }}>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              id={`cat-${cat.slug}`}
              onClick={() => setSelectedCategory(cat.slug)}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${selectedCategory === cat.slug ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: selectedCategory === cat.slug ? 'var(--color-primary)' : 'var(--color-surface)',
                color: selectedCategory === cat.slug ? 'white' : 'var(--color-text-secondary)',
                fontWeight: 'var(--font-medium)',
                fontSize: 'var(--text-sm)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 200ms',
              }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-8)' }}>
          {/* Filters Sidebar */}
          <div>
            <div className="card" style={{ borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', position: 'sticky', top: 'var(--space-6)' }}>
              <h3 style={{ fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-5)', fontSize: 'var(--text-sm)' }}>FILTERS</h3>

              {/* Sort */}
              <div className="form-group" style={{ marginBottom: 'var(--space-5)' }}>
                <label className="form-label">Sort By</label>
                <select className="input select" value={sort} onChange={e => setSort(e.target.value)}>
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {/* Toggles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <FilterToggle label="Organic Only 🌿" checked={organicOnly} onChange={setOrganicOnly} id="filter-organic" />
                <FilterToggle label="Verified Farmers ✅" checked={verifiedOnly} onChange={setVerifiedOnly} id="filter-verified" />
              </div>

              <div className="divider" />

              {/* Price Range */}
              <div className="form-group">
                <label className="form-label">Min Price (₹/Quintal)</label>
                <input type="number" className="input" placeholder="0" min={0} />
              </div>
              <div className="form-group" style={{ marginTop: 'var(--space-3)' }}>
                <label className="form-label">Max Price (₹/Quintal)</label>
                <input type="number" className="input" placeholder="10000" max={100000} />
              </div>

              <button className="btn btn-primary w-full" style={{ marginTop: 'var(--space-5)' }}>Apply Filters</button>
            </div>
          </div>

          {/* Product Grid */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: 'var(--space-20)', color: 'var(--color-text-muted)' }}>
                <div style={{ fontSize: 64, marginBottom: 'var(--space-4)' }}>🔍</div>
                <p>No products found. Try different filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="card card-hover" style={{ borderRadius: 'var(--radius-2xl)', overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Image area */}
      <div style={{ height: 160, background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-surface-2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, position: 'relative' }}>
        {product.image}
        {product.organic && (
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <span className="badge badge-success">🌿 Organic</span>
          </div>
        )}
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <span className="trust-badge">{product.farmer.trustScore}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--color-text)', lineHeight: 1.3 }}>{product.name}</h3>
          <span className="badge badge-primary" style={{ marginLeft: 8, flexShrink: 0 }}>{product.category}</span>
        </div>

        <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-extrabold)', color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
          ₹{product.price.toLocaleString()}
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-regular)', color: 'var(--color-text-muted)' }}>/{product.unit}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          <span>📦 {product.qty} {product.unit} available</span>
          <span>📍 {product.location}</span>
          <span>🗓️ Harvested: {new Date(product.harvestDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
        </div>

        {/* Farmer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
          <div className="avatar avatar-sm" style={{ background: 'var(--color-primary)', color: 'white' }}>
            {product.farmer.name.charAt(0)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {product.farmer.name}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {product.farmer.verified && <span style={{ fontSize: 10, color: 'var(--color-success)' }}>✅ Verified</span>}
              {product.farmer.kyc && <span style={{ fontSize: 10, color: 'var(--color-primary)' }}>🪪 KYC</span>}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'auto' }}>
          <Link href={`/marketplace/${product.id}`} className="btn btn-outline btn-sm" style={{ flex: 1, textAlign: 'center' }}>View Details</Link>
          <Link href={`/buyer/rfq/new?product=${product.id}`} className="btn btn-primary btn-sm" style={{ flex: 1, textAlign: 'center' }}>Send RFQ</Link>
        </div>
      </div>
    </div>
  );
}

function FilterToggle({ label, checked, onChange, id }: { label: string; checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <label htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer', fontSize: 'var(--text-sm)' }}>
      <div style={{
        width: 40, height: 22, borderRadius: 'var(--radius-full)',
        background: checked ? 'var(--color-primary)' : 'var(--color-border)',
        position: 'relative', transition: 'background 200ms', flexShrink: 0,
      }}
        onClick={() => onChange(!checked)}
      >
        <div style={{
          position: 'absolute', top: 3, left: checked ? 21 : 3,
          width: 16, height: 16, borderRadius: '50%', background: 'white',
          transition: 'left 200ms', boxShadow: 'var(--shadow-xs)',
        }} />
      </div>
      <input type="checkbox" id={id} checked={checked} onChange={e => onChange(e.target.checked)} style={{ display: 'none' }} />
      <span>{label}</span>
    </label>
  );
}
