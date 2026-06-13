'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FarmerSettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'farm', label: 'Farm Details', icon: '🌾' },
    { id: 'bank', label: 'Bank & Payment', icon: '🏦' },
    { id: 'kyc', label: 'KYC Documents', icon: '🪪' },
    { id: 'notifications', label: 'Notification Preferences', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-8)' }}>
        Settings
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-6)' }}>
        {/* Settings Nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: activeSection === s.id ? 'var(--color-primary-50)' : 'transparent',
                color: activeSection === s.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: 'none', cursor: 'pointer',
                fontSize: 'var(--text-sm)', fontWeight: activeSection === s.id ? 'var(--font-semibold)' : 'var(--font-medium)',
                transition: 'all 150ms', textAlign: 'left', width: '100%',
              }}>
              <span>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div>
          {activeSection === 'profile' && (
            <div className="card" style={{ borderRadius: 'var(--radius-2xl)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>Profile Information</h2>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', marginBottom: 'var(--space-8)' }}>
                <div className="avatar avatar-xl" style={{ background: 'var(--color-primary)', color: 'white' }}>R</div>
                <div>
                  <button className="btn btn-outline btn-sm" style={{ marginBottom: 'var(--space-2)' }}>Change Photo</button>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>JPG or PNG. Max 5MB.</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="input input-lg" defaultValue="Ravi Kumar" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="input input-lg" defaultValue="+91 98765 43210" disabled style={{ opacity: 0.6 }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="input input-lg" type="email" defaultValue="ravi@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Language</label>
                  <select className="input input-lg select" defaultValue="en">
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="mr">मराठी (Marathi)</option>
                    <option value="gu">ગુજરાતી (Gujarati)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 'var(--space-5)' }}>
                <label className="form-label">Bio</label>
                <textarea className="textarea" defaultValue="Progressive farmer from Ajmer, Rajasthan. Growing wheat, rice, and vegetables for 15+ years. Committed to quality and timely delivery." rows={3} />
              </div>

              <button className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>Save Changes</button>
            </div>
          )}

          {activeSection === 'farm' && (
            <div className="card" style={{ borderRadius: 'var(--radius-2xl)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>Farm Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
                <div className="form-group">
                  <label className="form-label">Farm Name</label>
                  <input className="input input-lg" defaultValue="Ravi Kumar Farm" />
                </div>
                <div className="form-group">
                  <label className="form-label">Farm Size (Acres)</label>
                  <input className="input input-lg" type="number" defaultValue="25" />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input className="input input-lg" defaultValue="Rajasthan" />
                </div>
                <div className="form-group">
                  <label className="form-label">District / City</label>
                  <input className="input input-lg" defaultValue="Ajmer" />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Primary Crops</label>
                  <input className="input input-lg" defaultValue="Wheat, Basmati Rice, Tomato, Cotton" />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Certifications</label>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    {['FSSAI License', 'Organic India'].map((c) => (
                      <span key={c} className="badge badge-primary" style={{ padding: '4px 12px' }}>{c}</span>
                    ))}
                    <button className="btn btn-ghost btn-sm">+ Add</button>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>Save Farm Details</button>
            </div>
          )}

          {activeSection === 'bank' && (
            <div className="card" style={{ borderRadius: 'var(--radius-2xl)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>Bank & Payment Details</h2>
              <div className="alert alert-info" style={{ marginBottom: 'var(--space-6)' }}>
                <span>🔒</span>
                <span>Your bank details are encrypted and only used for payment disbursement.</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
                <div className="form-group">
                  <label className="form-label">Account Holder Name</label>
                  <input className="input input-lg" defaultValue="Ravi Kumar" />
                </div>
                <div className="form-group">
                  <label className="form-label">Bank Name</label>
                  <input className="input input-lg" defaultValue="State Bank of India" />
                </div>
                <div className="form-group">
                  <label className="form-label">Account Number</label>
                  <input className="input input-lg" defaultValue="••••••••7890" type="password" />
                </div>
                <div className="form-group">
                  <label className="form-label">IFSC Code</label>
                  <input className="input input-lg" defaultValue="SBIN0001234" />
                </div>
                <div className="form-group">
                  <label className="form-label">UPI ID (Optional)</label>
                  <input className="input input-lg" defaultValue="ravi@upi" />
                </div>
              </div>
              <button className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>Update Bank Details</button>
            </div>
          )}

          {activeSection === 'kyc' && (
            <div className="card" style={{ borderRadius: 'var(--radius-2xl)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>KYC Documents</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {[
                  { label: 'Aadhaar Card', status: 'VERIFIED', number: '••••6789', uploadedAt: 'Mar 2023' },
                  { label: 'PAN Card', status: 'VERIFIED', number: '••••H4321', uploadedAt: 'Mar 2023' },
                  { label: 'Bank Passbook', status: 'VERIFIED', number: null, uploadedAt: 'Apr 2023' },
                  { label: 'Land Ownership / Lease', status: 'PENDING', number: null, uploadedAt: null },
                ].map((doc) => (
                  <div key={doc.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)' }}>
                    <div>
                      <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>{doc.label}</div>
                      {doc.number && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{doc.number}</div>}
                      {doc.uploadedAt && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Uploaded: {doc.uploadedAt}</div>}
                    </div>
                    <div>
                      {doc.status === 'VERIFIED' ? (
                        <span className="badge badge-success" style={{ padding: '4px 12px' }}>✅ Verified</span>
                      ) : (
                        <button className="btn btn-outline btn-sm">Upload</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="card" style={{ borderRadius: 'var(--radius-2xl)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>Notification Preferences</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {[
                  { label: 'New RFQ received', desc: 'When a buyer sends you a request for quote', sms: true, push: true, email: false },
                  { label: 'Order updates', desc: 'Status changes on your orders', sms: true, push: true, email: true },
                  { label: 'Payment received', desc: 'When you receive a payment', sms: true, push: true, email: true },
                  { label: 'New messages', desc: 'Chat messages from buyers/transporters', sms: false, push: true, email: false },
                  { label: 'Trust score changes', desc: 'Updates to your trust score', sms: false, push: true, email: false },
                  { label: 'Marketing & tips', desc: 'Product tips and platform updates', sms: false, push: false, email: true },
                ].map((pref) => (
                  <div key={pref.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 'var(--space-5)', borderBottom: '1px solid var(--color-border)' }}>
                    <div>
                      <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>{pref.label}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{pref.desc}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                      {['SMS', 'Push', 'Email'].map((channel, i) => {
                        const checked = [pref.sms, pref.push, pref.email][i];
                        return (
                          <label key={channel} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', cursor: 'pointer' }}>
                            <input type="checkbox" defaultChecked={checked} style={{ width: 16, height: 16 }} />
                            {channel}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>Save Preferences</button>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="card" style={{ borderRadius: 'var(--radius-2xl)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-6)' }}>Security</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input className="input input-lg" type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input className="input input-lg" type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input className="input input-lg" type="password" placeholder="Confirm new password" />
                </div>
                <button className="btn btn-primary">Update Password</button>
              </div>

              <div className="divider" />

              <h3 style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', color: 'var(--color-error)' }}>Danger Zone</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'var(--color-error-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(220,38,38,0.15)' }}>
                <div>
                  <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', color: 'var(--color-error)' }}>Delete Account</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Permanently delete your Krushiva account and all data</div>
                </div>
                <button className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
