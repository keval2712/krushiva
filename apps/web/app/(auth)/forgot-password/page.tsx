'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <header style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
        <h1 className="h1" style={{ fontSize: 'var(--text-2xl)', letterSpacing: '-0.02em', color: 'var(--color-primary)' }}>
          Reset Password
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
          Enter your email address and we will send you a secure link to reset your password.
        </p>
      </header>

      {submitted ? (
        <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>✉️</div>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>Check your inbox</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
            We've sent a password reset link to <strong>{email}</strong>.
          </p>
          <Link href="/login" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none', display: 'inline-block' }}>
            Return to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1.5)' }}>
            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)' }}>Email Address</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Sending link...' : 'Send Reset Link'}
          </button>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-2)' }}>
            <Link href="/login" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'var(--font-bold)' }}>
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
