'use client';

import { useState } from 'react';

export default function TransporterSettingsPage() {
  const [profile, setProfile] = useState({
    companyName: 'Gagan Logistics Ltd',
    email: 'contact@gaganlogistics.com',
    phone: '+91 98888 77777',
    fleetSize: 15,
    serviceAreas: 'Punjab, Haryana, Delhi NCR',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">⚙️ Settings</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Manage transporter business options and fleet parameters.</p>
      </header>

      {success && (
        <div className="alert alert-success" style={{ marginBottom: 'var(--space-6)' }}>
          🟢 Transporter settings saved successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Logistics Profile</h2>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Company Name</label>
              <input type="text" className="input" value={profile.companyName} onChange={e => setProfile({ ...profile, companyName: e.target.value })} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Email Address</label>
                <input type="email" className="input" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Phone Number</label>
                <input type="tel" className="input" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Active Fleet Size</label>
                <input type="number" className="input" value={profile.fleetSize} onChange={e => setProfile({ ...profile, fleetSize: parseInt(e.target.value) || 0 })} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Service Regions</label>
                <input type="text" className="input" value={profile.serviceAreas} onChange={e => setProfile({ ...profile, serviceAreas: e.target.value })} placeholder="e.g. Punjab, Delhi" required />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
