'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'FARMER' | 'BUYER' | 'TRANSPORTER' | null>(null);
  const [profileData, setProfileData] = useState({
    fullName: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [documentType, setDocumentType] = useState('AADHAAR');
  const [documentNumber, setDocumentNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // Direct to corresponding portal
        if (role === 'FARMER') router.push('/farmer');
        else if (role === 'BUYER') router.push('/buyer');
        else router.push('/transporter');
      }, 1500);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 500 }}>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
        {[1, 2, 3, 4].map(s => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 'var(--radius-full)',
              background: s <= step ? 'var(--color-primary)' : 'var(--color-surface-3)',
              color: s <= step ? 'white' : 'var(--color-text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)',
            }}>
              {s}
            </div>
            {s < 4 && <div style={{ width: 40, height: 2, background: s < step ? 'var(--color-primary)' : 'var(--color-border)' }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <header style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            <h1 className="h1" style={{ fontSize: 'var(--text-2xl)' }}>Choose your role</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Select how you will participate in the Krushiva Agricultural Network</p>
          </header>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div
              className={`card ${role === 'FARMER' ? 'active' : ''}`}
              onClick={() => setRole('FARMER')}
              style={{ padding: 'var(--space-5)', cursor: 'pointer', border: role === 'FARMER' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)' }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>🌾</div>
              <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--font-bold)' }}>Farmer</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }}>Sell your produce directly, receive RFQs from verified buyers, and request transport.</p>
            </div>
            <div
              className={`card ${role === 'BUYER' ? 'active' : ''}`}
              onClick={() => setRole('BUYER')}
              style={{ padding: 'var(--space-5)', cursor: 'pointer', border: role === 'BUYER' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)' }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>🛒</div>
              <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--font-bold)' }}>Buyer / Business</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }}>Search and filter crops, create bulk RFQs, track shipments, and receive formal invoices.</p>
            </div>
            <div
              className={`card ${role === 'TRANSPORTER' ? 'active' : ''}`}
              onClick={() => setRole('TRANSPORTER')}
              style={{ padding: 'var(--space-5)', cursor: 'pointer', border: role === 'TRANSPORTER' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)' }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>🚚</div>
              <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--font-bold)' }}>Transporter</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }}>Find loads to carry, manage your trucks/drivers, upload pickup proof, and track shipments.</p>
            </div>
            <button className="btn btn-primary" onClick={handleNext} disabled={!role} style={{ marginTop: 'var(--space-4)' }}>
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <header style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            <h1 className="h1" style={{ fontSize: 'var(--text-2xl)' }}>Profile Setup</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Tell us more about yourself and your business</p>
          </header>
          <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Full Name / Company Representative</label>
              <input
                type="text"
                className="input"
                value={profileData.fullName}
                onChange={e => setProfileData({ ...profileData, fullName: e.target.value })}
                placeholder="e.g. Ramesh Kumar"
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Contact Phone Number</label>
              <input
                type="tel"
                className="input"
                value={profileData.phone}
                onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                placeholder="e.g. +91 9876543210"
                required
              />
            </div>
            <button className="btn btn-primary" onClick={handleNext} disabled={!profileData.fullName || !profileData.phone} style={{ width: '100%', marginTop: 'var(--space-2)' }}>
              Next Step
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <header style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            <h1 className="h1" style={{ fontSize: 'var(--text-2xl)' }}>Location Details</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Your address is vital for matching shipments and listings</p>
          </header>
          <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>City / Village</label>
              <input
                type="text"
                className="input"
                value={profileData.city}
                onChange={e => setProfileData({ ...profileData, city: e.target.value })}
                placeholder="e.g. Karnal"
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>State</label>
                <input
                  type="text"
                  className="input"
                  value={profileData.state}
                  onChange={e => setProfileData({ ...profileData, state: e.target.value })}
                  placeholder="e.g. Haryana"
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Pincode</label>
                <input
                  type="text"
                  className="input"
                  value={profileData.pincode}
                  onChange={e => setProfileData({ ...profileData, pincode: e.target.value })}
                  placeholder="132001"
                  required
                />
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleNext} disabled={!profileData.city || !profileData.state || !profileData.pincode} style={{ width: '100%', marginTop: 'var(--space-2)' }}>
              Next Step
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <header style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            <h1 className="h1" style={{ fontSize: 'var(--text-2xl)' }}>KYC Document Upload</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Verify your identity to claim your verified badge and earn higher Trust Scores</p>
          </header>
          <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Document Type</label>
              <select
                className="select"
                value={documentType}
                onChange={e => setDocumentType(e.target.value)}
              >
                <option value="AADHAAR">Aadhaar Card</option>
                <option value="PAN">PAN Card</option>
                <option value="GST">GST Registration Certificate</option>
                <option value="FSSAI">FSSAI License</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Document / Registration Number</label>
              <input
                type="text"
                className="input"
                value={documentNumber}
                onChange={e => setDocumentNumber(e.target.value)}
                placeholder="Enter document ID number"
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Upload Document File (PDF/Image)</label>
              <input type="file" className="input" />
            </div>

            <button className="btn btn-primary" onClick={handleNext} disabled={!documentNumber || loading} style={{ width: '100%', marginTop: 'var(--space-2)' }}>
              {loading ? 'Completing Setup...' : 'Finish & Go to Dashboard'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
