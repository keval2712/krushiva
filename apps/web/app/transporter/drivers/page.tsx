'use client';

import { useState } from 'react';

const mockDrivers = [
  { id: '1', name: 'Manpreet Singh', phone: '+91 98765 89012', license: 'DL1220200004321', active: true },
  { id: '2', name: 'Sukhwinder Sharma', phone: '+91 87654 32109', license: 'HR2620180009876', active: true },
];

export default function TransporterDriversPage() {
  const [drivers, setDrivers] = useState(mockDrivers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDriver, setNewDriver] = useState({ name: '', phone: '', license: '' });

  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    setDrivers([...drivers, { id: Date.now().toString(), ...newDriver, active: true }]);
    setNewDriver({ name: '', phone: '', license: '' });
    setShowAddForm(false);
  };

  const handleToggle = (id: string) => {
    setDrivers(drivers.map(d => d.id === id ? { ...d, active: !d.active } : d));
  };

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1">👤 Driver Management</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Register, verify, and check drivers in your transport fleet.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'View Drivers' : 'Register Driver'}
        </button>
      </header>

      {showAddForm ? (
        <form onSubmit={handleAddDriver} className="card" style={{ maxWidth: 500, padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 className="card-title">Register Driver</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Driver Full Name</label>
            <input type="text" className="input" value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Contact Phone Number</label>
            <input type="tel" className="input" value={newDriver.phone} onChange={e => setNewDriver({ ...newDriver, phone: e.target.value })} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Driving License Number</label>
            <input type="text" className="input" value={newDriver.license} onChange={e => setNewDriver({ ...newDriver, license: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-2)' }}>
            Save Driver Details
          </button>
        </form>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Driver Name</th>
                <th>Phone Number</th>
                <th>License Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map(d => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 'var(--font-bold)' }}>{d.name}</td>
                  <td>{d.phone}</td>
                  <td><code>{d.license}</code></td>
                  <td>
                    <span className="badge" style={{
                      background: d.active ? 'rgba(34, 197, 94, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                      color: d.active ? '#22c55e' : '#dc2626'
                    }}>
                      {d.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => handleToggle(d.id)}>
                      {d.active ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
