'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockRFQs = [
  { id: '1', rfqNumber: 'RFQ-052', product: 'Wheat (Grade A)', quantity: '50 Quintal', maxBudget: 2500, status: 'ACTIVE', responses: 4, sentTo: 8, deadline: '2024-01-20', createdAt: '2024-01-15' },
  { id: '2', rfqNumber: 'RFQ-048', product: 'Tomato (Cherry)', quantity: '10 Quintal', maxBudget: 2000, status: 'ACTIVE', responses: 2, sentTo: 5, deadline: '2024-01-18', createdAt: '2024-01-13' },
  { id: '3', rfqNumber: 'RFQ-044', product: 'Basmati Rice', quantity: '100 Quintal', maxBudget: 5000, status: 'ORDERED', responses: 6, sentTo: 12, deadline: '2024-01-15', createdAt: '2024-01-10' },
  { id: '4', rfqNumber: 'RFQ-040', product: 'Potato', quantity: '30 Quintal', maxBudget: 1300, status: 'EXPIRED', responses: 1, sentTo: 6, deadline: '2024-01-08', createdAt: '2024-01-05' },
];

const statusConfig: Record<string, { label: string; cls: string }> = {
  ACTIVE: { label: 'Active', cls: 'badge-success' },
  ORDERED: { label: 'Ordered', cls: 'badge-primary' },
  EXPIRED: { label: 'Expired', cls: 'badge-gray' },
  CANCELLED: { label: 'Cancelled', cls: 'badge-error' },
};

export default function BuyerRFQPage() {
  const [tab, setTab] = useState('ALL');
  const filtered = tab === 'ALL' ? mockRFQs : mockRFQs.filter(r => r.status === tab);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>My RFQs</h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            {mockRFQs.filter(r => r.status === 'ACTIVE').length} active quotes awaiting responses
          </p>
        </div>
        <Link href="/buyer/rfq/new" className="btn btn-primary">+ Create RFQ</Link>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-1)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)' }}>
        {['ALL', 'ACTIVE', 'ORDERED', 'EXPIRED'].map((t) => (
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

      {/* RFQ Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filtered.map((rfq) => (
          <div key={rfq.id} className="card" style={{ borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ fontWeight: 'var(--font-bold)', color: 'var(--color-primary)' }}>{rfq.rfqNumber}</span>
                <span className={`badge ${statusConfig[rfq.status].cls}`}>{statusConfig[rfq.status].label}</span>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Deadline: {new Date(rfq.deadline).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Product</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>{rfq.product}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Quantity</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>{rfq.quantity}</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Max Budget</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>₹{rfq.maxBudget}/Q</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Sent To</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>{rfq.sentTo} farmers</div></div>
              <div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Responses</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-extrabold)', color: rfq.responses > 0 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>{rfq.responses}</div></div>
            </div>

            {/* Response progress */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 4 }}>
                <span>{rfq.responses} of {rfq.sentTo} farmers responded</span>
                <span>{Math.round((rfq.responses / rfq.sentTo) * 100)}%</span>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${(rfq.responses / rfq.sentTo) * 100}%` }} /></div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              {rfq.status === 'ACTIVE' && rfq.responses > 0 && (
                <Link href={`/buyer/rfq/${rfq.id}/compare`} className="btn btn-primary btn-sm">Compare {rfq.responses} Quotes</Link>
              )}
              <Link href={`/buyer/rfq/${rfq.id}`} className="btn btn-outline btn-sm">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
