import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Transporter Dashboard | Krushiva' };

const stats = [
  { label: 'Active Shipments', value: '5', icon: '📍', color: '#eff6ff' },
  { label: 'Loads Available', value: '12', icon: '📦', color: '#f0fdf4' },
  { label: 'Completed Today', value: '3', icon: '✅', color: '#f5f3ff' },
  { label: 'This Week Revenue', value: '₹42K', icon: '💰', color: '#fef9e7' },
];

const activeShipments = [
  { id: 'SHP-7821', order: 'ORD-045', product: 'Wheat Grade A', from: 'Ajmer, Rajasthan', to: 'Pune, Maharashtra', driver: 'Suresh D.', vehicle: 'RJ-14-GA-4521', status: 'IN_TRANSIT', eta: '2h', completion: 75 },
  { id: 'SHP-7818', order: 'ORD-042', product: 'Organic Tomato', from: 'Nashik, MH', to: 'Mumbai, MH', driver: 'Ramesh K.', vehicle: 'MH-15-AB-7823', status: 'PICKED_UP', eta: '4h', completion: 35 },
];

const availableLoads = [
  { id: 'LOAD-001', product: 'Cotton (20 Quintal)', from: 'Nagpur, MH', to: 'Surat, GJ', distance: '430 km', price: '₹8,500', urgency: 'Today' },
  { id: 'LOAD-002', product: 'Potato (15 Quintal)', from: 'Agra, UP', to: 'Delhi, DL', distance: '220 km', price: '₹4,200', urgency: 'Tomorrow' },
  { id: 'LOAD-003', product: 'Onion (25 Quintal)', from: 'Nashik, MH', to: 'Hyderabad, TS', distance: '620 km', price: '₹11,800', urgency: 'In 2 days' },
];

export default function TransporterDashboard() {
  return (
    <div>
      <div className="dashboard-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <div className="label" style={{ marginBottom: 'var(--space-2)' }}>Transporter Dashboard</div>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em' }}>
            Good morning, Ajay 🚚
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)', marginTop: 'var(--space-2)' }}>
            <strong style={{ color: 'var(--color-success)' }}>12 loads</strong> available in your service area
          </p>
        </div>
        <Link href="/transporter/loads" className="btn btn-primary">Browse Loads</Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.color }}><span style={{ fontSize: 22 }}>{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'var(--space-6)' }}>
        {/* Active Shipments */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>Active Shipments</h2>
            <Link href="/transporter/shipments" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 'var(--font-medium)' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {activeShipments.map((s) => (
              <div key={s.id} className="card" style={{ borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontWeight: 'var(--font-bold)', color: 'var(--color-primary)' }}>{s.id}</span>
                      <span className={`status-badge ${s.status === 'IN_TRANSIT' ? 'status-transit' : 'status-pickup'}`}>
                        {s.status === 'IN_TRANSIT' ? 'In Transit' : 'Picked Up'}
                      </span>
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', marginBottom: 2 }}>{s.product}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      {s.from} → {s.to}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>ETA</div>
                    <div style={{ fontWeight: 'var(--font-bold)', color: 'var(--color-warning)' }}>{s.eta}</div>
                  </div>
                </div>

                {/* Progress */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    <span>Journey Progress</span>
                    <span>{s.completion}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${s.completion}%` }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
                  <span>👤 {s.driver}</span>
                  <span>🚛 {s.vehicle}</span>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <Link href={`/transporter/shipments/${s.id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>Update Status</Link>
                  <Link href={`/transporter/shipments/${s.id}/delivery`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>Delivery Proof</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Loads */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>Available Loads</h2>
            <Link href="/transporter/loads" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 'var(--font-medium)' }}>All loads →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {availableLoads.map((load) => (
              <div key={load.id} className="card" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>{load.product}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                  📍 {load.from} → {load.to}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>🛣️ {load.distance}</span>
                  <span style={{ fontWeight: 'var(--font-bold)', color: 'var(--color-success)', fontSize: 'var(--text-sm)' }}>{load.price}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warning)' }}>⏰ {load.urgency}</span>
                  <Link href={`/transporter/loads/${load.id}`} className="btn btn-primary btn-sm">Accept Load</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
