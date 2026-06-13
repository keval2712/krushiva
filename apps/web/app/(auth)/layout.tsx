import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth | Krushiva',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Panel */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', padding: 'var(--space-8)',
        background: 'var(--color-background)',
      }}>
        {children}
      </div>

      {/* Right Panel - Brand */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(160deg, var(--color-primary-dark), var(--color-accent))',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: 'var(--space-12)',
        position: 'relative', overflow: 'hidden',
      }}
        className="auth-right-panel"
      >
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} className="animate-float" />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-5xl)', fontWeight: 'var(--font-black)', letterSpacing: '-0.04em', color: 'white', marginBottom: 'var(--space-3)' }}>
            KRUS<span style={{ color: 'var(--color-secondary)' }}>IV</span>A
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-12)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
            Where Agriculture Connects
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-12)' }}>
            {[
              { icon: '🛡️', title: 'Trusted Platform', desc: 'Every user is KYC verified with a trust score' },
              { icon: '📍', title: 'Live Tracking', desc: 'Real-time shipment tracking from pickup to delivery' },
              { icon: '💰', title: 'Safe Transactions', desc: 'Secure payments with digital proof at every step' },
            ].map((item) => (
              <div key={item.title} style={{
                display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-4)',
                textAlign: 'left',
              }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <div>
                  <div style={{ color: 'white', fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--text-xs)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-right-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
