'use client';

import { useState } from 'react';

const mockCategories = [
  { id: '1', name: 'Grains & Cereals', slug: 'grains-cereals', count: 12 },
  { id: '2', name: 'Fruits & Berries', slug: 'fruits-berries', count: 8 },
  { id: '3', name: 'Vegetables', slug: 'vegetables', count: 15 },
  { id: '4', name: 'Oilseeds & Spices', slug: 'oilseeds-spices', count: 6 },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [name, setName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCategories([...categories, {
      id: Date.now().toString(),
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      count: 0
    }]);
    setName('');
  };

  return (
    <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
      {/* Categories List */}
      <div>
        <header style={{ marginBottom: 'var(--space-8)' }}>
          <h1 className="h1">🗂️ Manage Categories</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Configure crop categories and classify agricultural listings.</p>
        </header>

        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Slug Link</th>
                <th>Product Count</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 'var(--font-bold)' }}>{c.name}</td>
                  <td><code>{c.slug}</code></td>
                  <td>{c.count} active crops</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Form */}
      <div style={{ marginTop: 'var(--space-14)' }}>
        <form onSubmit={handleAdd} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 className="card-title">Add Category</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Category Name</label>
            <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Organic Tubers" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-2)' }}>
            Save Category
          </button>
        </form>
      </div>
    </div>
  );
}
