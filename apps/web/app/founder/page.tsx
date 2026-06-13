import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Founder Dashboard | Krushiva' };

const kpiData = [
  { label: 'Total Farmers', value: '10,284', change: '+124', up: true, icon: '🌾', color: 'var(--color-primary-50)' },
  { label: 'Total Buyers', value: '5,182', change: '+56', up: true, icon: '🛒', color: '#eff6ff' },
  { label: 'Total Transporters', value: '2,104', change: '+18', up: true, icon: '🚚', color: '#f5f3ff' },
  { label: 'Completed Orders', value: '8,924', change: '+234', up: true, icon: '✅', color: '#f0fdf4' },
  { label: 'Active Orders', value: '342', change: '+18', up: true, icon: '📑', color: '#fffbeb' },
  { label: 'Total Revenue', value: '₹4.8Cr', change: '+18%', up: true, icon: '💰', color: '#f0fdf4' },
  { label: 'Commission', value: '₹24.2L', change: '+18%', up: true, icon: '🏦', color: '#fdf4ff' },
  { label: 'Disputed Orders', value: '28', change: '-3', up: false, icon: '⚖️', color: '#fef2f2' },
];

const trustIndex = [
  { label: 'Avg Trust Score', value: '87.4', icon: '⭐' },
  { label: 'KYC Verified Users', value: '73%', icon: '✅' },
  { label: 'Order Completion', value: '96.2%', icon: '📦' },
  { label: 'Dispute Rate', value: '0.31%', icon: '⚖️' },
];

const topProducts = [
  { name: 'Wheat Grade A', transactions: 1284, value: '₹62L', trend: '+12%' },
  { name: 'Organic Tomato', transactions: 892, value: '₹28L', trend: '+8%' },
  { name: 'Cotton', transactions: 643, value: '₹1.8Cr', trend: '+22%' },
  { name: 'Soya Bean', transactions: 521, value: '₹48L', trend: '+5%' },
  { name: 'Potato', transactions: 418, value: '₹18L', trend: '-2%' },
];

const topRegions = [
  { state: 'Maharashtra', orders: 2184, revenue: '₹1.2Cr', growth: '+24%' },
  { state: 'Rajasthan', orders: 1842, revenue: '₹98L', growth: '+18%' },
  { state: 'Punjab', orders: 1241, revenue: '₹84L', growth: '+9%' },
  { state: 'Gujarat', orders: 984, revenue: '₹72L', growth: '+31%' },
  { state: 'MP', orders: 842, revenue: '₹61L', growth: '+15%' },
];

const liveShipments = [
  { id: 'TRK-7821', product: 'Wheat', from: 'Ajmer', to: 'Pune', progress: 75, driver: 'Suresh' },
  { id: 'TRK-7818', product: 'Tomato', from: 'Nashik', to: 'Mumbai', progress: 35, driver: 'Ramesh' },
  { id: 'TRK-7815', product: 'Cotton', from: 'Nagpur', to: 'Surat', progress: 52, driver: 'Vijay' },
  { id: 'TRK-7810', product: 'Onion', from: 'Nashik', to: 'Hyderabad', progress: 88, driver: 'Anil' },
];

export default function FounderDashboard() {
  const now = new Date();
  return (
    <div>
      {/* Header */}
      <div className="dashboard-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="label" style={{ marginBottom: 'var(--space-2)' }}>Founder Dashboard</div>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em' }}>
            Krushiva Platform Overview 🔭
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)', marginTop: 'var(--space-2)' }}>
            Live data as of {now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Link href="/founder/analytics/orders" className="btn btn-outline">View Analytics</Link>
          <Link href="/founder/map" className="btn btn-primary">🗺️ Live Map</Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {kpiData.map((kpi) => (
          <div key={kpi.label} className="stat-card">
            <div className="stat-icon" style={{ background: kpi.color }}><span style={{ fontSize: 22 }}>{kpi.icon}</span></div>
            <div className="stat-value">{kpi.value}</div>
            <div className="stat-label">{kpi.label}</div>
            <div className={`stat-change ${kpi.up ? 'up' : 'down'}`}>
              {kpi.up ? '↑' : '↓'} {kpi.change} this week
            </div>
          </div>
        ))}
      </div>

      {/* Trust Index */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
        borderRadius: 'var(--radius-2xl)', padding: 'var(--space-6)',
        display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--space-8)', alignItems: 'center',
        marginBottom: 'var(--space-8)',
      }}>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>Platform Trust Index</div>
          <div style={{ fontSize: 'var(--text-6xl)', fontWeight: 'var(--font-black)', color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>87.4</div>
          <div style={{ color: 'var(--color-secondary)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginTop: 'var(--space-2)' }}>↑ 2.1 from last month</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
          {trustIndex.map((t) => (
            <div key={t.label} style={{ textAlign: 'center', padding: 'var(--space-4)', background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 24, marginBottom: 'var(--space-2)' }}>{t.icon}</div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-extrabold)', color: 'white' }}>{t.value}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{t.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        {/* Top Products */}
        <div>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)' }}>Top Products</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Orders</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={p.name}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', fontSize: 10, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{p.transactions}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>
                      {p.value}
                      <div style={{ fontSize: 'var(--text-xs)', color: p.trend.startsWith('+') ? 'var(--color-success)' : 'var(--color-error)' }}>{p.trend}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Regions */}
        <div>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)' }}>Top Regions</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Orders</th>
                  <th>Growth</th>
                </tr>
              </thead>
              <tbody>
                {topRegions.map((r) => (
                  <tr key={r.state}>
                    <td style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>📍 {r.state}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.orders}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: r.growth.startsWith('+') ? 'var(--color-success)' : 'var(--color-error)' }}>{r.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Shipments */}
        <div>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)' }}>Live Shipments</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {liveShipments.map((s) => (
              <div key={s.id} className="card" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>{s.id}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{s.progress}%</span>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                  {s.product} • {s.from} → {s.to}
                </div>
                <div className="progress-bar">
                  <div className="progress-fill animate-pulse" style={{ width: `${s.progress}%` }} />
                </div>
              </div>
            ))}
            <Link href="/founder/map" className="btn btn-outline w-full" style={{ marginTop: 'var(--space-2)' }}>
              🗺️ View Live Map
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        {[
          { title: 'User Analytics', desc: 'Registrations, roles, regions', href: '/founder/analytics/users', icon: '👥', color: 'var(--color-primary-50)' },
          { title: 'Order & Revenue', desc: 'GMV, commission, growth', href: '/founder/analytics/orders', icon: '💰', color: '#f0fdf4' },
          { title: 'Trust Analytics', desc: 'Scores, disputes, KYC', href: '/founder/analytics/trust', icon: '🛡️', color: '#fffbeb' },
          { title: 'Growth Metrics', desc: 'MoM growth, retention', href: '/founder/analytics/growth', icon: '📈', color: '#fdf4ff' },
        ].map((a) => (
          <Link key={a.href} href={a.href} className="card-hover-translate" style={{
            display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
            padding: 'var(--space-5)', background: a.color,
            border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)',
            textDecoration: 'none',
          }}
          >
            <span style={{ fontSize: 32 }}>{a.icon}</span>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-text)' }}>{a.title}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{a.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
