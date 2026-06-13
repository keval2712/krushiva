'use client';

import { useState } from 'react';
import Link from 'next/link';

type ProductStatus = 'ACTIVE' | 'DRAFT' | 'SOLD_OUT' | 'REMOVED';

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  availableQty: number;
  unit: string;
  pricePerUnit: number;
  status: ProductStatus;
  views: number;
  inquiries: number;
  createdAt: string;
  organic: boolean;
  image: string;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Wheat Grade A', category: 'Cereals', quantity: 500, availableQty: 490, unit: 'Quintal', pricePerUnit: 2400, status: 'ACTIVE', views: 342, inquiries: 18, createdAt: '2024-01-10', organic: false, image: '🌾' },
  { id: '2', name: 'Organic Tomato', category: 'Vegetables', quantity: 120, availableQty: 85, unit: 'Quintal', pricePerUnit: 1800, status: 'ACTIVE', views: 287, inquiries: 12, createdAt: '2024-01-12', organic: true, image: '🍅' },
  { id: '3', name: 'Basmati Rice', category: 'Cereals', quantity: 800, availableQty: 800, unit: 'Quintal', pricePerUnit: 4800, status: 'ACTIVE', views: 156, inquiries: 5, createdAt: '2024-01-05', organic: false, image: '🍚' },
  { id: '4', name: 'Cotton (Grade B)', category: 'Cotton', quantity: 200, availableQty: 0, unit: 'Quintal', pricePerUnit: 5000, status: 'SOLD_OUT', views: 421, inquiries: 24, createdAt: '2023-12-20', organic: false, image: '☁️' },
  { id: '5', name: 'Soya Bean', category: 'Pulses', quantity: 300, availableQty: 300, unit: 'Quintal', pricePerUnit: 4200, status: 'DRAFT', views: 0, inquiries: 0, createdAt: '2024-01-14', organic: false, image: '🫘' },
  { id: '6', name: 'Green Chilli', category: 'Spices', quantity: 50, availableQty: 45, unit: 'Quintal', pricePerUnit: 3200, status: 'ACTIVE', views: 98, inquiries: 3, createdAt: '2024-01-14', organic: false, image: '🌶️' },
];

const statusConfig: Record<ProductStatus, { label: string; cls: string }> = {
  ACTIVE: { label: 'Active', cls: 'badge-success' },
  DRAFT: { label: 'Draft', cls: 'badge-gray' },
  SOLD_OUT: { label: 'Sold Out', cls: 'badge-warning' },
  REMOVED: { label: 'Removed', cls: 'badge-error' },
};

export default function FarmerProductsPage() {
  const [filter, setFilter] = useState<ProductStatus | 'ALL'>('ALL');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = filter === 'ALL' ? mockProducts : mockProducts.filter(p => p.status === filter);
  const totalValue = mockProducts.reduce((s, p) => s + p.availableQty * p.pricePerUnit, 0);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>
            My Products
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            {mockProducts.length} products • Total listed value: ₹{(totalValue / 100000).toFixed(1)}L
          </p>
        </div>
        <Link href="/farmer/products/new" className="btn btn-primary" id="btn-add-product">
          + Add Product
        </Link>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Active', value: mockProducts.filter(p => p.status === 'ACTIVE').length, color: 'var(--color-success)' },
          { label: 'Total Views', value: mockProducts.reduce((s, p) => s + p.views, 0).toLocaleString() },
          { label: 'Total Inquiries', value: mockProducts.reduce((s, p) => s + p.inquiries, 0) },
          { label: 'Avg Price/Q', value: '₹' + Math.round(mockProducts.reduce((s, p) => s + p.pricePerUnit, 0) / mockProducts.length).toLocaleString() },
        ].map((s) => (
          <div key={s.label} style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-extrabold)', color: (s as any).color || 'var(--color-text)' }}>{s.value}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs + View Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {(['ALL', 'ACTIVE', 'DRAFT', 'SOLD_OUT'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} id={`filter-${f.toLowerCase()}`}
              style={{
                padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${filter === f ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: filter === f ? 'var(--color-primary)' : 'var(--color-surface)',
                color: filter === f ? 'white' : 'var(--color-text-secondary)',
                fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', cursor: 'pointer', transition: 'all 200ms',
              }}>
              {f === 'ALL' ? 'All' : statusConfig[f].label}
              <span style={{ marginLeft: 6, opacity: 0.7 }}>
                {f === 'ALL' ? mockProducts.length : mockProducts.filter(p => p.status === f).length}
              </span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-1)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', padding: 2 }}>
          {(['grid', 'list'] as const).map((v) => (
            <button key={v} onClick={() => setView(v)}
              style={{
                padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)',
                background: view === v ? 'white' : 'transparent',
                border: 'none', cursor: 'pointer', fontSize: 14,
                boxShadow: view === v ? 'var(--shadow-sm)' : 'none',
              }}>
              {v === 'grid' ? '⊞' : '☰'}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
          {filtered.map((product) => (
            <div key={product.id} className="card card-hover" style={{ borderRadius: 'var(--radius-xl)', padding: 0, overflow: 'hidden' }}>
              <div style={{ height: 100, background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-surface-2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, position: 'relative' }}>
                {product.image}
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <span className={`badge ${statusConfig[product.status].cls}`}>{statusConfig[product.status].label}</span>
                </div>
                {product.organic && <span className="badge badge-success" style={{ position: 'absolute', top: 8, left: 8 }}>🌿 Organic</span>}
              </div>
              <div style={{ padding: 'var(--space-4)' }}>
                <Link href={`/farmer/products/${product.id}`} style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 4, display: 'block' }}>
                  {product.name}
                </Link>
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-extrabold)', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
                  ₹{product.pricePerUnit.toLocaleString()}<span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-regular)', color: 'var(--color-text-muted)' }}>/{product.unit}</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                  <span>📦 {product.availableQty}/{product.quantity} {product.unit}</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)' }}>
                  <span>👁 {product.views}</span>
                  <span>📋 {product.inquiries} RFQs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Available</th>
                <th>Views</th>
                <th>Inquiries</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <span style={{ fontSize: 24 }}>{p.image}</span>
                      <Link href={`/farmer/products/${p.id}`} style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>{p.name}</Link>
                    </div>
                  </td>
                  <td style={{ fontSize: 'var(--text-sm)' }}>{p.category}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)' }}>₹{p.pricePerUnit.toLocaleString()}/{p.unit}</td>
                  <td style={{ fontSize: 'var(--text-sm)' }}>{p.availableQty}/{p.quantity}</td>
                  <td style={{ fontSize: 'var(--text-sm)' }}>{p.views}</td>
                  <td style={{ fontSize: 'var(--text-sm)' }}>{p.inquiries}</td>
                  <td><span className={`badge ${statusConfig[p.status].cls}`}>{statusConfig[p.status].label}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Link href={`/farmer/products/${p.id}/edit`} className="btn btn-ghost btn-sm">Edit</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: 56, marginBottom: 'var(--space-4)' }}>📦</div>
          <p style={{ marginBottom: 'var(--space-4)' }}>No products found</p>
          <Link href="/farmer/products/new" className="btn btn-primary">Add Your First Product</Link>
        </div>
      )}
    </div>
  );
}
