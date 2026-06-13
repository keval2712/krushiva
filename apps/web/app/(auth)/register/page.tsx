'use client';

import { useState } from 'react';
import Link from 'next/link';

type Role = 'FARMER' | 'BUYER' | 'TRANSPORTER';

const roles: { id: Role; label: string; emoji: string; desc: string }[] = [
  { id: 'FARMER', label: 'Farmer', emoji: '🌾', desc: 'List produce & manage orders' },
  { id: 'BUYER', label: 'Buyer', emoji: '🛒', desc: 'Buy directly from farmers' },
  { id: 'TRANSPORTER', label: 'Transporter', emoji: '🚚', desc: 'Carry agricultural cargo' },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<Role>('FARMER');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) errs.phone = 'Enter a valid 10-digit mobile number';
    if (form.email && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email';
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // TODO: API call
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep(3); // Go to OTP verification
  };

  return (
    <div style={{ width: '100%', maxWidth: 460 }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'block', textAlign: 'center', marginBottom: 'var(--space-8)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-black)', letterSpacing: '-0.04em', color: 'var(--color-primary)' }}>
        KRUS<span style={{ color: 'var(--color-secondary)' }}>IV</span>A
      </Link>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
        {[1, 2, 3].map((s) => (
          <div key={s} style={{
            flex: 1, height: 3, borderRadius: 'var(--radius-full)',
            background: s <= step ? 'var(--color-primary)' : 'var(--color-border)',
            transition: 'background 300ms',
          }} />
        ))}
      </div>

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>
            Join Krushiva
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)' }}>
            Select how you'll be using the platform
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
            {roles.map((r) => (
              <button
                key={r.id}
                id={`role-${r.id.toLowerCase()}`}
                onClick={() => setSelectedRole(r.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                  padding: 'var(--space-4) var(--space-5)',
                  background: selectedRole === r.id ? 'var(--color-primary-50)' : 'var(--color-surface)',
                  border: `2px solid ${selectedRole === r.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-xl)',
                  cursor: 'pointer', transition: 'all 200ms', textAlign: 'left', width: '100%',
                }}
              >
                <span style={{ fontSize: 32 }}>{r.emoji}</span>
                <div>
                  <div style={{ fontWeight: 'var(--font-semibold)', color: selectedRole === r.id ? 'var(--color-primary)' : 'var(--color-text)' }}>
                    {r.label}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{r.desc}</div>
                </div>
                {selectedRole === r.id && (
                  <div style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="8" fill="none" viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          <button className="btn btn-primary btn-lg w-full" id="btn-next-step1" onClick={() => setStep(2)}>
            Continue as {roles.find(r => r.id === selectedRole)?.label} →
          </button>

          <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-semibold)' }}>Sign in</Link>
          </p>
        </div>
      )}

      {/* Step 2: Account Details */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="animate-fade-in">
          <button type="button" onClick={() => setStep(1)} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 'var(--space-6)', padding: 0 }}>
            ← Back
          </button>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>
            Create your account
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)' }}>
            Joining as{' '}
            <strong style={{ color: 'var(--color-primary)' }}>{roles.find(r => r.id === selectedRole)?.label}</strong>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div className="form-group">
              <label className="form-label required" htmlFor="fullName">Full Name</label>
              <input id="fullName" name="fullName" className={`input input-lg ${errors.fullName ? 'input-error' : ''}`}
                placeholder="Your full name" value={form.fullName} onChange={handleChange} />
              {errors.fullName && <span className="form-error">⚠ {errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label required" htmlFor="phone">Mobile Number</label>
              <div className="input-group">
                <span className="input-icon" style={{ left: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', fontWeight: 'var(--font-medium)' }}>+91</span>
                <input id="phone" name="phone" type="tel" className={`input input-lg ${errors.phone ? 'input-error' : ''}`}
                  style={{ paddingLeft: 'calc(var(--space-4) + 32px)' }}
                  placeholder="10-digit mobile number" value={form.phone} onChange={handleChange} maxLength={10} />
              </div>
              {errors.phone && <span className="form-error">⚠ {errors.phone}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email (Optional)</label>
              <input id="email" name="email" type="email" className={`input input-lg ${errors.email ? 'input-error' : ''}`}
                placeholder="your@email.com" value={form.email} onChange={handleChange} />
              {errors.email && <span className="form-error">⚠ {errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label required" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" className={`input input-lg ${errors.password ? 'input-error' : ''}`}
                placeholder="Min. 8 characters" value={form.password} onChange={handleChange} />
              {errors.password && <span className="form-error">⚠ {errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label required" htmlFor="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" className={`input input-lg ${errors.confirmPassword ? 'input-error' : ''}`}
                placeholder="Re-enter password" value={form.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <span className="form-error">⚠ {errors.confirmPassword}</span>}
            </div>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-5)', lineHeight: 1.6 }}>
            By registering, you agree to our{' '}
            <Link href="/terms" style={{ color: 'var(--color-primary)' }}>Terms</Link> and{' '}
            <Link href="/privacy" style={{ color: 'var(--color-primary)' }}>Privacy Policy</Link>.
          </p>

          <button type="submit" id="btn-register" className={`btn btn-primary btn-lg w-full ${loading ? 'btn-loading' : ''}`} style={{ marginTop: 'var(--space-6)' }} disabled={loading}>
            {loading ? '' : 'Create Account'}
          </button>
        </form>
      )}

      {/* Step 3: OTP Verification */}
      {step === 3 && (
        <OTPVerification phone={form.phone} onVerified={() => setStep(4)} />
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="animate-slide-up" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 'var(--space-6)' }}>✅</div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', marginBottom: 'var(--space-3)' }}>
            You're registered!
          </h2>
          <p style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-8)' }}>
            Welcome to Krushiva. Let's complete your profile.
          </p>
          <Link href="/onboarding" className="btn btn-primary btn-lg w-full" id="btn-goto-onboarding">
            Complete Profile →
          </Link>
        </div>
      )}
    </div>
  );
}

function OTPVerification({ phone, onVerified }: { phone: string; onVerified: () => void }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [error, setError] = useState('');

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      (document.getElementById(`otp-${index + 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      (document.getElementById(`otp-${index - 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) { setError('Enter the 6-digit code'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onVerified();
  };

  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <div style={{ fontSize: 48, marginBottom: 'var(--space-4)' }}>📱</div>
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', marginBottom: 'var(--space-3)' }}>
          Verify your number
        </h2>
        <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
          We sent a 6-digit code to <strong>+91 {phone}</strong>
        </p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="tel"
            maxLength={1}
            value={digit}
            onChange={e => handleOtpChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            style={{
              width: 52, height: 60,
              textAlign: 'center', fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)',
              border: `2px solid ${digit ? 'var(--color-primary)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-surface)',
              outline: 'none',
              transition: 'all 200ms',
            }}
          />
        ))}
      </div>

      {error && <p className="form-error" style={{ justifyContent: 'center', marginBottom: 'var(--space-4)' }}>⚠ {error}</p>}

      <button className={`btn btn-primary btn-lg w-full ${loading ? 'btn-loading' : ''}`} id="btn-verify-otp" onClick={handleVerify} disabled={loading}>
        {loading ? '' : 'Verify Code'}
      </button>

      <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
        {resendCountdown > 0
          ? `Resend code in ${resendCountdown}s`
          : <button style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 'var(--font-semibold)', cursor: 'pointer' }} onClick={() => setResendCountdown(30)}>Resend Code</button>
        }
      </p>
    </div>
  );
}
