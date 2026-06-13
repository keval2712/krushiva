import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Admin Dashboard | Krushiva' };

const stats = [
  { label: 'Total Users', value: '17,284', change: '+124', icon: '👥', color: '#eff6ff' },
  { label: 'Active Orders', value: '342', change: '+18', icon: '📑', color: '#f0fdf4' },
  { label: 'KYC Pending', value: '47', change: '+7', icon: '🪪', color: '#fef9e7', alert: true },
  { label: 'Disputes Open', value: '12', change: '+3', icon: '⚖️', color: '#fef2f2', alert: true },
];

const pendingKYC = [
  { name: 'Mohan Singh', role: 'FARMER', type: 'Aadhaar + PAN', submitted: '2h ago', priority: 'high' },
  { name: 'Sita Devi Traders', role: 'BUYER', type: 'GST + Aadhaar', submitted: '4h ago', priority: 'medium' },
  { name: 'Express Cargo', role: 'TRANSPORTER', type: 'License + RC', submitted: '6h ago', priority: 'medium' },
  { name: 'Green Valley Farm', role: 'FARMER', type: 'Aadhaar', submitted: '1d ago', priority: 'low' },
];

const openDisputes = [
  { id: 'DIS-021', order: 'ORD-089', type: 'Quality Issue', by: 'Buyer', against: 'Farmer', opened: '3h ago', priority: 'HIGH' },
  { id: 'DIS-019', order: 'ORD-076', type: 'Quantity Mismatch', by: 'Farmer', against: 'Transporter', opened: '1d ago', priority: 'MEDIUM' },
  { id: 'DIS-018', order: 'ORD-071', type: 'Delivery Delay', by: 'Buyer', against: 'Transporter', opened: '2d ago', priority: 'LOW' },
];

const recentActivity = [
  { action: 'Order Completed', detail: 'ORD-102 • Wheat • Ravi → Mehul', time: '5m', icon: '✅' },
  { action: 'New Registration', detail: 'Priya Farms (Farmer) from Gujarat', time: '12m', icon: '👤' },
  { action: 'KYC Approved', detail: 'Express Cargo Transport', time: '25m', icon: '🪪' },
  { action: 'Dispute Raised', detail: 'DIS-021 • Quality Issue raised', time: '3h', icon: '⚖️' },
  { action: 'Product Listed', detail: 'Organic Wheat 50Q • ₹2,800/Q', time: '4h', icon: '📦' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="dashboard-header">
        <div className="label" style={{ marginBottom: 'var(--space-2)' }}>Admin Panel</div>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em' }}>
          Platform Overview
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-card" style={{ borderColor: s.alert ? 'rgba(239, 68, 68, 0.2)' : undefined }}>
            <div className="stat-icon" style={{ background: s.color }}><span style={{ fontSize: 22 }}>{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-change up">↑ {s.change} today</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        {/* KYC Queue */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>KYC Queue</h2>
            <Link href="/admin/kyc" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 'var(--font-medium)' }}>All 47 →</Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Role</th>
                  <th>Documents</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingKYC.map((kyc) => (
                  <tr key={kyc.name}>
                    <td style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>{kyc.name}</td>
                    <td><span className={`badge ${kyc.role === 'FARMER' ? 'badge-primary' : kyc.role === 'BUYER' ? 'badge-gold' : 'badge-gray'}`}>{kyc.role}</span></td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{kyc.type}</td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{kyc.submitted}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <button className="btn btn-success btn-sm" style={{ background: 'var(--color-success)', color: 'white', fontSize: 11 }}>✓ Approve</button>
                        <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>Review</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Open Disputes */}
          <div style={{ marginTop: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>Open Disputes</h2>
              <Link href="/admin/disputes" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 'var(--font-medium)' }}>View all →</Link>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Order</th>
                    <th>Type</th>
                    <th>Priority</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {openDisputes.map((d) => (
                    <tr key={d.id}>
                      <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--color-primary)', fontSize: 'var(--text-sm)' }}>{d.id}</td>
                      <td style={{ fontSize: 'var(--text-sm)' }}>{d.order}</td>
                      <td style={{ fontSize: 'var(--text-sm)' }}>
                        {d.type}
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{d.by} vs {d.against}</div>
                      </td>
                      <td><span className={`badge ${d.priority === 'HIGH' ? 'badge-error' : d.priority === 'MEDIUM' ? 'badge-warning' : 'badge-gray'}`}>{d.priority}</span></td>
                      <td><Link href={`/admin/disputes/${d.id}`} className="btn btn-primary btn-sm">Resolve</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)' }}>Live Activity</h2>
          <div className="card" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {recentActivity.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', paddingBottom: i < recentActivity.length - 1 ? 'var(--space-4)' : 0, borderBottom: i < recentActivity.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>
                    {a.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>{a.action}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>{a.detail}</div>
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', flexShrink: 0 }}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ marginTop: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)', color: 'var(--color-text-tertiary)' }}>QUICK ACTIONS</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {[
                { label: 'Manage KYC Verifications', href: '/admin/kyc', icon: '🪪' },
                { label: 'Monitor All Orders', href: '/admin/orders', icon: '📑' },
                { label: 'Review Disputes', href: '/admin/disputes', icon: '⚖️' },
                { label: 'Trust Monitoring', href: '/admin/trust', icon: '🛡️' },
                { label: 'Generate Reports', href: '/admin/reports', icon: '📊' },
              ].map((a) => (
                <Link key={a.href} href={a.href} className="sidebar-item" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                  <span>{a.icon}</span>
                  <span style={{ fontSize: 'var(--text-sm)' }}>{a.label}</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--color-text-muted)' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
