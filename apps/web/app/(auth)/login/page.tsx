'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type LoginMethod = 'otp' | 'email';

export default function LoginPage() {
  const router = useRouter();
  const [method, setMethod] = useState<LoginMethod>('otp');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ phone: '', email: '', password: '', otp: '' });
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpDigits];
    newOtp[index] = value.slice(-1);
    setOtpDigits(newOtp);
    if (value && index < 5) {
      (document.getElementById(`login-otp-${index + 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      (document.getElementById(`login-otp-${index - 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.match(/^[6-9]\d{9}$/)) {
      setErrors({ phone: 'Enter a valid 10-digit mobile number' });
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep('otp');
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    router.push('/farmer'); // Demo redirect
  };

  const handleVerifyOtp = async () => {
    const code = otpDigits.join('');
    if (code.length !== 6) { setErrors({ otp: 'Enter all 6 digits' }); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    router.push('/farmer');
  };

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      <Link href="/" style={{ display: 'block', textAlign: 'center', marginBottom: 'var(--space-8)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-black)', letterSpacing: '-0.04em', color: 'var(--color-primary)' }}>
        KRUS<span style={{ color: 'var(--color-secondary)' }}>IV</span>A
      </Link>

      <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>
        Welcome back
      </h1>
      <p style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)' }}>
        Sign in to your Krushiva account
      </p>

      {/* Method Tabs */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        background: 'var(--color-surface-2)',
        borderRadius: 'var(--radius-lg)',
        padding: 4,
        marginBottom: 'var(--space-6)',
      }}>
        {(['otp', 'email'] as const).map((m) => (
          <button
            key={m}
            id={`login-tab-${m}`}
            onClick={() => { setMethod(m); setStep('credentials'); setErrors({}); }}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              borderRadius: 'var(--radius-md)',
              border: 'none', cursor: 'pointer',
              background: method === m ? 'white' : 'transparent',
              color: method === m ? 'var(--color-text)' : 'var(--color-text-muted)',
              fontWeight: method === m ? 'var(--font-semibold)' : 'var(--font-regular)',
              fontSize: 'var(--text-sm)',
              transition: 'all 200ms',
              boxShadow: method === m ? 'var(--shadow-sm)' : 'none',
            }}
          >
            {m === 'otp' ? '📱 OTP Login' : '📧 Email Login'}
          </button>
        ))}
      </div>

      {/* OTP Method */}
      {method === 'otp' && (
        <>
          {step === 'credentials' ? (
            <form onSubmit={handleSendOtp} className="animate-fade-in">
              <div className="form-group" style={{ marginBottom: 'var(--space-5)' }}>
                <label className="form-label required" htmlFor="phone">Mobile Number</label>
                <div className="input-group">
                  <span style={{ position: 'absolute', left: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', fontWeight: 'var(--font-medium)' }}>+91</span>
                  <input id="phone" name="phone" type="tel" maxLength={10}
                    className={`input input-lg ${errors.phone ? 'input-error' : ''}`}
                    style={{ paddingLeft: 'calc(var(--space-4) + 32px)' }}
                    placeholder="10-digit mobile number"
                    value={form.phone} onChange={handleChange} />
                </div>
                {errors.phone && <span className="form-error">⚠ {errors.phone}</span>}
              </div>
              <button type="submit" id="btn-send-otp" className={`btn btn-primary btn-lg w-full ${loading ? 'btn-loading' : ''}`} disabled={loading}>
                {loading ? '' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <div className="animate-fade-in">
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-6)', textAlign: 'center' }}>
                Code sent to <strong>+91 {form.phone}</strong>{' '}
                <button onClick={() => setStep('credentials')} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 'var(--font-medium)' }}>
                  Change
                </button>
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                {otpDigits.map((d, i) => (
                  <input key={i} id={`login-otp-${i}`} type="tel" maxLength={1} value={d}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    style={{
                      width: 52, height: 60, textAlign: 'center',
                      fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)',
                      border: `2px solid ${d ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--color-surface)', outline: 'none', transition: 'all 200ms',
                    }} />
                ))}
              </div>
              {errors.otp && <p className="form-error" style={{ justifyContent: 'center', marginBottom: 'var(--space-4)' }}>⚠ {errors.otp}</p>}
              <button id="btn-verify-login-otp" className={`btn btn-primary btn-lg w-full ${loading ? 'btn-loading' : ''}`} onClick={handleVerifyOtp} disabled={loading}>
                {loading ? '' : 'Verify & Sign In'}
              </button>
            </div>
          )}
        </>
      )}

      {/* Email Method */}
      {method === 'email' && (
        <form onSubmit={handleEmailLogin} className="animate-fade-in">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
            <div className="form-group">
              <label className="form-label required" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className={`input input-lg ${errors.email ? 'input-error' : ''}`}
                placeholder="your@email.com" value={form.email} onChange={handleChange} />
              {errors.email && <span className="form-error">⚠ {errors.email}</span>}
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label required" htmlFor="password">Password</label>
                <Link href="/forgot-password" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)' }}>Forgot?</Link>
              </div>
              <input id="password" name="password" type="password" className={`input input-lg ${errors.password ? 'input-error' : ''}`}
                placeholder="Your password" value={form.password} onChange={handleChange} />
              {errors.password && <span className="form-error">⚠ {errors.password}</span>}
            </div>
          </div>
          <button type="submit" id="btn-email-login" className={`btn btn-primary btn-lg w-full ${loading ? 'btn-loading' : ''}`} disabled={loading}>
            {loading ? '' : 'Sign In'}
          </button>
        </form>
      )}

      <div className="divider-text" style={{ margin: 'var(--space-6) 0' }}>
        <span>or</span>
      </div>

      <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
        Don't have an account?{' '}
        <Link href="/register" style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-semibold)' }}>Create one free</Link>
      </p>
    </div>
  );
}
