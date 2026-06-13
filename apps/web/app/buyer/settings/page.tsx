'use client';

import { useState } from 'react';

export default function BuyerSettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Metro Mart Procurement',
    email: 'procurement@metromart.com',
    phone: '+91 99887 76655',
    company: 'Metro Mart Retail Ltd',
    gst: '07AAAAA1111A1Z1',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
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
        <p style={{ color: 'var(--color-text-muted)' }}>Manage your buyer account, company GST, contact details, and platform options.</p>
      </header>

      {success && (
        <div className="alert alert-success" style={{ marginBottom: 'var(--space-6)' }}>
          🟢 Account settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Buyer Profile & Company</h2>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Contact Representative Name</label>
              <input type="text" className="input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} required />
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Company Name</label>
                <input type="text" className="input" value={profile.company} onChange={e => setProfile({ ...profile, company: e.target.value })} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>GST Number</label>
                <input type="text" className="input" value={profile.gst} onChange={e => setProfile({ ...profile, gst: e.target.value })} required />
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
