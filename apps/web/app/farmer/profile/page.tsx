'use client';

import { useState } from 'react';

export default function FarmProfilePage() {
  const [profile, setProfile] = useState({
    farmName: 'Priya Organic Farms',
    farmSize: 12.5,
    farmSizeUnit: 'acres',
    primaryCrops: 'Basmati Rice, Wheat, Mustard',
    certifications: 'NPOP Organic Certified, ISO 22000',
    bankAccountName: 'Priya Sharma',
    bankAccountNumber: '987654321012',
    bankIFSC: 'SBIN0001234',
    upiId: 'priyafarms@oksbi',
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
        <h1 className="h1" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span>🌾</span> Farm Profile
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Manage your farm details, primary crops, certifications, and payment details.
        </p>
      </header>

      {success && (
        <div className="alert alert-success" style={{ marginBottom: 'var(--space-6)' }}>
          🟢 Profile updated successfully! All changes are live on the marketplace.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Farm Info */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Farm details</h2>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--color-text)' }}>Farm Name</label>
              <input
                type="text"
                className="input"
                value={profile.farmName}
                onChange={e => setProfile({ ...profile, farmName: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--color-text)' }}>Farm Size</label>
                <input
                  type="number"
                  step="0.1"
                  className="input"
                  value={profile.farmSize}
                  onChange={e => setProfile({ ...profile, farmSize: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--color-text)' }}>Size Unit</label>
                <select
                  className="select"
                  value={profile.farmSizeUnit}
                  onChange={e => setProfile({ ...profile, farmSizeUnit: e.target.value })}
                >
                  <option value="acres">Acres</option>
                  <option value="hectares">Hectares</option>
                  <option value="bighas">Bighas</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--color-text)' }}>Primary Crops (comma separated)</label>
              <input
                type="text"
                className="input"
                value={profile.primaryCrops}
                onChange={e => setProfile({ ...profile, primaryCrops: e.target.value })}
                placeholder="e.g. Rice, Wheat, Tomatoes"
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--color-text)' }}>Certifications (comma separated)</label>
              <input
                type="text"
                className="input"
                value={profile.certifications}
                onChange={e => setProfile({ ...profile, certifications: e.target.value })}
                placeholder="e.g. NPOP Certified, ISO 22000"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Payment & Bank Details</h2>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--color-text)' }}>Account Holder Name</label>
              <input
                type="text"
                className="input"
                value={profile.bankAccountName}
                onChange={e => setProfile({ ...profile, bankAccountName: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--color-text)' }}>Bank Account Number</label>
                <input
                  type="text"
                  className="input"
                  value={profile.bankAccountNumber}
                  onChange={e => setProfile({ ...profile, bankAccountNumber: e.target.value })}
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--color-text)' }}>Bank IFSC Code</label>
                <input
                  type="text"
                  className="input"
                  value={profile.bankIFSC}
                  onChange={e => setProfile({ ...profile, bankIFSC: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--color-text)' }}>UPI ID (Optional)</label>
              <input
                type="text"
                className="input"
                value={profile.upiId}
                onChange={e => setProfile({ ...profile, upiId: e.target.value })}
                placeholder="e.g. name@upi"
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile Details'}
          </button>
        </div>
      </form>
    </div>
  );
}
