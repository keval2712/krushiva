'use client';

export default function FounderLiveMapPage() {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">🌐 Live Shipments Map</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Real-time location and status of active crop transport routes across states.</p>
      </header>

      <div className="card" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {/* Mock Map Canvas */}
        <div style={{
          height: 500, background: '#111827', borderRadius: 'var(--radius-xl)', position: 'relative',
          overflow: 'hidden', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {/* Map Grid Pattern */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.15,
            backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          {/* Active Nodes */}
          <div style={{ position: 'absolute', top: '35%', left: '42%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px #10b981', animation: 'pulse 2s infinite' }} />
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '9px', marginTop: '4px', whiteSpace: 'nowrap' }}>
              🌾 Basmati (2.5T) - In Transit
            </div>
          </div>

          <div style={{ position: 'absolute', top: '48%', left: '55%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-accent)', boxShadow: '0 0 12px var(--color-accent)', animation: 'pulse 2s infinite' }} />
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '9px', marginTop: '4px', whiteSpace: 'nowrap' }}>
              🥔 Potatoes (4T) - Scheduled
            </div>
          </div>

          <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'rgba(255,255,255,0.4)', zIndex: 10 }}>
            🗺️ Interactive GIS Shipment Map (Punjab - Delhi - NCR)
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          <span>🟢 12 Active In-Transit Loads</span>
          <span>🟡 4 Scheduled Pickups</span>
          <span>🔴 0 Disputes Active on Road</span>
        </div>
      </div>
    </div>
  );
}
