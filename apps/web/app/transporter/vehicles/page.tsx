'use client';

import { useState } from 'react';

const mockVehicles = [
  { id: '1', number: 'RJ-14-GA-4521', type: 'Truck', capacity: '10 Ton', registrationExpiry: '2025-06-15', insuranceExpiry: '2025-03-10', status: 'ACTIVE', fitnessValid: true },
  { id: '2', number: 'RJ-14-GA-8910', type: 'Mini Truck', capacity: '3 Ton', registrationExpiry: '2025-09-20', insuranceExpiry: '2025-08-05', status: 'ACTIVE', fitnessValid: true },
  { id: '3', number: 'RJ-14-GA-3456', type: 'Pickup', capacity: '1.5 Ton', registrationExpiry: '2024-12-31', insuranceExpiry: '2024-11-15', status: 'INACTIVE', fitnessValid: false },
];

const mockDrivers = [
  { id: '1', name: 'Suresh Yadav', phone: '+91 94567 12345', licenseNumber: 'RJ-DL-0012345', licenseExpiry: '2026-01-15', vehicleId: '1', status: 'ACTIVE' },
  { id: '2', name: 'Ramesh Patel', phone: '+91 98765 67890', licenseNumber: 'RJ-DL-0067890', licenseExpiry: '2025-08-20', vehicleId: '2', status: 'ACTIVE' },
];

export default function TransporterVehiclesPage() {
  const [tab, setTab] = useState<'vehicles' | 'drivers'>('vehicles');

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>Fleet Management</h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            {mockVehicles.filter(v => v.status === 'ACTIVE').length} active vehicles • {mockDrivers.length} drivers
          </p>
        </div>
        <button className="btn btn-primary">+ Add {tab === 'vehicles' ? 'Vehicle' : 'Driver'}</button>
      </div>

      {/* Tab Switch */}
      <div style={{ display: 'flex', gap: 'var(--space-1)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)' }}>
        {[
          { value: 'vehicles' as const, label: '🚚 Vehicles', count: mockVehicles.length },
          { value: 'drivers' as const, label: '👤 Drivers', count: mockDrivers.length },
        ].map((t) => (
          <button key={t.value} onClick={() => setTab(t.value)}
            style={{
              padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)',
              color: tab === t.value ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderBottom: tab === t.value ? '2px solid var(--color-primary)' : '2px solid transparent',
              background: 'none', border: 'none', cursor: 'pointer',
            }}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Vehicles */}
      {tab === 'vehicles' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
          {mockVehicles.map((v) => (
            <div key={v.id} className="card" style={{ borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🚚</div>
                  <div>
                    <div style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>{v.number}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{v.type} • {v.capacity}</div>
                  </div>
                </div>
                <span className={`badge ${v.status === 'ACTIVE' ? 'badge-success' : 'badge-error'}`}>{v.status}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {[
                  { label: 'RC Expiry', value: new Date(v.registrationExpiry).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), ok: new Date(v.registrationExpiry) > new Date() },
                  { label: 'Insurance Expiry', value: new Date(v.insuranceExpiry).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), ok: new Date(v.insuranceExpiry) > new Date() },
                  { label: 'Fitness Certificate', value: v.fitnessValid ? 'Valid' : 'Expired', ok: v.fitnessValid },
                ].map((d) => (
                  <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{d.label}</span>
                    <span style={{ fontWeight: 'var(--font-medium)', color: d.ok ? 'var(--color-success)' : 'var(--color-error)' }}>
                      {d.ok ? '✓' : '⚠'} {d.value}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>Edit</button>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Documents</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drivers */}
      {tab === 'drivers' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
          {mockDrivers.map((d) => (
            <div key={d.id} className="card" style={{ borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div className="avatar avatar-lg" style={{ background: 'var(--color-primary)', color: 'white' }}>{d.name.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: 'var(--font-bold)' }}>{d.name}</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{d.phone}</div>
                  <span className={`badge ${d.status === 'ACTIVE' ? 'badge-success' : 'badge-gray'}`} style={{ marginTop: 4 }}>{d.status}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>License</span>
                  <span style={{ fontWeight: 'var(--font-medium)' }}>{d.licenseNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>License Expiry</span>
                  <span style={{ fontWeight: 'var(--font-medium)', color: new Date(d.licenseExpiry) > new Date() ? 'var(--color-success)' : 'var(--color-error)' }}>
                    {new Date(d.licenseExpiry).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Assigned Vehicle</span>
                  <span style={{ fontWeight: 'var(--font-medium)' }}>
                    {mockVehicles.find(v => v.id === d.vehicleId)?.number || '—'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>Edit</button>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Documents</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
