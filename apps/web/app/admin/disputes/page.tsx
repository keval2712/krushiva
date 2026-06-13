'use client';

import { useState } from 'react';

const mockDisputes = [
  { id: '1', disputeNumber: 'DIS-012', orderNumber: 'ORD-029', raisedBy: { name: 'Metro Mart', role: 'BUYER' }, against: { name: 'Priya Farms', role: 'FARMER' }, type: 'QUALITY', reason: 'Received Grade B wheat instead of Grade A as listed', amount: 19200, status: 'OPEN', priority: 'HIGH', raisedAt: '2024-01-14', evidence: 3 },
  { id: '2', disputeNumber: 'DIS-011', orderNumber: 'ORD-026', raisedBy: { name: 'Fresh Direct', role: 'BUYER' }, against: { name: 'Ajay Transport', role: 'TRANSPORTER' }, type: 'DAMAGE', reason: 'Tomatoes arrived damaged due to poor packing in transit', amount: 8500, status: 'OPEN', priority: 'MEDIUM', raisedAt: '2024-01-13', evidence: 5 },
  { id: '3', disputeNumber: 'DIS-010', orderNumber: 'ORD-022', raisedBy: { name: 'City Wholesalers', role: 'BUYER' }, against: { name: 'Ravi Kumar', role: 'FARMER' }, type: 'QUANTITY', reason: 'Received only 18 quintals instead of 20 quintals ordered', amount: 4800, status: 'INVESTIGATING', priority: 'MEDIUM', raisedAt: '2024-01-10', evidence: 2 },
  { id: '4', disputeNumber: 'DIS-008', orderNumber: 'ORD-018', raisedBy: { name: 'Agro Hub', role: 'BUYER' }, against: { name: 'Krishna Farm', role: 'FARMER' }, type: 'DELIVERY', reason: 'Order delivered 3 days late causing business loss', amount: 12000, status: 'RESOLVED', priority: 'LOW', raisedAt: '2024-01-05', evidence: 1 },
];

const typeIcons: Record<string, string> = { QUALITY: '⚠️', QUANTITY: '📏', DAMAGE: '💔', DELIVERY: '🕐', PAYMENT: '💰', OTHER: '❓' };
const priorityConfig: Record<string, { label: string; color: string }> = {
  HIGH: { label: '🔴 High', color: 'var(--color-error)' },
  MEDIUM: { label: '🟡 Medium', color: 'var(--color-warning)' },
  LOW: { label: '🟢 Low', color: 'var(--color-success)' },
};
const statusConfig: Record<string, { label: string; cls: string }> = {
  OPEN: { label: 'Open', cls: 'badge-error' },
  INVESTIGATING: { label: 'Investigating', cls: 'badge-warning' },
  RESOLVED: { label: 'Resolved', cls: 'badge-success' },
  CLOSED: { label: 'Closed', cls: 'badge-gray' },
};

export default function AdminDisputesPage() {
  const [tab, setTab] = useState('ALL');
  const filtered = tab === 'ALL' ? mockDisputes : mockDisputes.filter(d => d.status === tab);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>Dispute Management</h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            <strong style={{ color: 'var(--color-error)' }}>{mockDisputes.filter(d => d.status === 'OPEN').length} open</strong> disputes need resolution
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Open', value: mockDisputes.filter(d => d.status === 'OPEN').length, bg: 'var(--color-error-bg)', color: 'var(--color-error)' },
          { label: 'Investigating', value: mockDisputes.filter(d => d.status === 'INVESTIGATING').length, bg: 'var(--color-warning-bg)', color: 'var(--color-warning)' },
          { label: 'Resolved', value: mockDisputes.filter(d => d.status === 'RESOLVED').length, bg: 'var(--color-success-bg)', color: 'var(--color-success)' },
          { label: 'Total Value', value: '₹' + (mockDisputes.reduce((s, d) => s + d.amount, 0) / 1000).toFixed(0) + 'K', bg: 'var(--color-surface-2)', color: 'var(--color-text)' },
        ].map((s) => (
          <div key={s.label} style={{ padding: 'var(--space-4)', background: s.bg, borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-1)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)' }}>
        {['ALL', 'OPEN', 'INVESTIGATING', 'RESOLVED'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)',
              color: tab === t ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderBottom: tab === t ? '2px solid var(--color-primary)' : '2px solid transparent',
              background: 'none', border: 'none', cursor: 'pointer',
            }}>
            {t === 'ALL' ? 'All' : statusConfig[t]?.label || t}
          </button>
        ))}
      </div>

      {/* Dispute Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filtered.map((d) => (
          <div key={d.id} className="card" style={{ borderRadius: 'var(--radius-xl)', borderLeft: `4px solid ${priorityConfig[d.priority].color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ fontSize: 28 }}>{typeIcons[d.type]}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 'var(--font-bold)' }}>{d.disputeNumber}</span>
                    <span className={`badge ${statusConfig[d.status].cls}`}>{statusConfig[d.status].label}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: priorityConfig[d.priority].color, fontWeight: 'var(--font-semibold)' }}>{priorityConfig[d.priority].label}</span>
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Order: {d.orderNumber} • {d.type} issue • {d.evidence} evidence files</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'var(--font-extrabold)', color: 'var(--color-error)' }}>₹{d.amount.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Disputed amount</div>
              </div>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
              "{d.reason}"
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>RAISED BY</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>{d.raisedBy.name} <span className={`badge ${roleColors[d.raisedBy.role]}`} style={{ marginLeft: 4 }}>{d.raisedBy.role}</span></div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>AGAINST</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>{d.against.name} <span className={`badge ${roleColors[d.against.role]}`} style={{ marginLeft: 4 }}>{d.against.role}</span></div>
              </div>
            </div>

            {d.status !== 'RESOLVED' && d.status !== 'CLOSED' && (
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <button className="btn btn-primary btn-sm">Investigate</button>
                <button className="btn btn-outline btn-sm">View Evidence</button>
                <button className="btn btn-ghost btn-sm">Contact Parties</button>
                <button className="btn btn-outline btn-sm" style={{ marginLeft: 'auto', color: 'var(--color-success)', borderColor: 'var(--color-success)' }}>Resolve</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const roleColors: Record<string, string> = {
  FARMER: 'badge-success', BUYER: 'badge-primary', TRANSPORTER: 'badge-warning',
};
