'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RFQ {
  id: string;
  rfqNumber: string;
  buyerName: string;
  buyerTrust: number;
  buyerVerified: boolean;
  product: string;
  quantity: string;
  budget: string;
  deadline: string;
  urgent: boolean;
  status: 'PENDING' | 'RESPONDED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  receivedAt: string;
  notes?: string;
}

const mockRFQs: RFQ[] = [
  { id: '1', rfqNumber: 'RFQ-042', buyerName: 'Mehul Trading Co.', buyerTrust: 88, buyerVerified: true, product: 'Wheat (Grade A)', quantity: '50 Quintal', budget: '₹2,200–2,500/Q', deadline: 'Today', urgent: true, status: 'PENDING', receivedAt: '2h ago', notes: 'Need premium quality. Willing to pay higher for consistent supply.' },
  { id: '2', rfqNumber: 'RFQ-039', buyerName: 'Metro Mart', buyerTrust: 84, buyerVerified: true, product: 'Potato (Jyoti)', quantity: '20 Quintal', budget: '₹1,100–1,300/Q', deadline: 'Tomorrow', urgent: false, status: 'PENDING', receivedAt: '5h ago' },
  { id: '3', rfqNumber: 'RFQ-036', buyerName: 'Fresh Direct', buyerTrust: 79, buyerVerified: false, product: 'Tomato (Cherry)', quantity: '10 Quintal', budget: '₹1,600–2,000/Q', deadline: 'In 3 days', urgent: false, status: 'PENDING', receivedAt: '1d ago' },
  { id: '4', rfqNumber: 'RFQ-033', buyerName: 'Agro Hub', buyerTrust: 91, buyerVerified: true, product: 'Basmati Rice', quantity: '100 Quintal', budget: '₹4,500–5,000/Q', deadline: 'In 5 days', urgent: false, status: 'RESPONDED', receivedAt: '2d ago' },
  { id: '5', rfqNumber: 'RFQ-029', buyerName: 'City Wholesalers', buyerTrust: 86, buyerVerified: true, product: 'Wheat (Grade A)', quantity: '30 Quintal', budget: '₹2,300–2,400/Q', deadline: 'Expired', urgent: false, status: 'ACCEPTED', receivedAt: '5d ago' },
];

const statusConfig: Record<string, { label: string; cls: string }> = {
  PENDING: { label: 'Pending', cls: 'badge-warning' },
  RESPONDED: { label: 'Responded', cls: 'badge-primary' },
  ACCEPTED: { label: 'Accepted', cls: 'badge-success' },
  REJECTED: { label: 'Rejected', cls: 'badge-error' },
  EXPIRED: { label: 'Expired', cls: 'badge-gray' },
};

export default function FarmerRFQPage() {
  const [filter, setFilter] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === 'ALL' ? mockRFQs : mockRFQs.filter(r => r.status === filter);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>
            RFQ Inbox
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            <strong style={{ color: 'var(--color-error)' }}>{mockRFQs.filter(r => r.status === 'PENDING').length} pending</strong> requests requiring your response
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', overflowX: 'auto' }}>
        {['ALL', 'PENDING', 'RESPONDED', 'ACCEPTED'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-full)',
              border: `1.5px solid ${filter === f ? 'var(--color-primary)' : 'var(--color-border)'}`,
              background: filter === f ? 'var(--color-primary)' : 'var(--color-surface)',
              color: filter === f ? 'white' : 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', cursor: 'pointer',
            }}>
            {f === 'ALL' ? 'All' : statusConfig[f].label}
          </button>
        ))}
      </div>

      {/* RFQ Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filtered.map((rfq) => (
          <div key={rfq.id} className="card" style={{ borderRadius: 'var(--radius-xl)', borderLeft: rfq.urgent ? '4px solid var(--color-error)' : undefined }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div className="avatar avatar-md" style={{ background: 'var(--color-accent)', color: 'white' }}>{rfq.buyerName.charAt(0)}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 2 }}>
                    <span style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>{rfq.buyerName}</span>
                    {rfq.buyerVerified && <span style={{ fontSize: 12, color: 'var(--color-success)' }}>✅</span>}
                    <span className="trust-badge">{rfq.buyerTrust}</span>
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    {rfq.rfqNumber} • {rfq.receivedAt}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                {rfq.urgent && <span className="badge badge-error">🔥 Urgent</span>}
                <span className={`badge ${statusConfig[rfq.status].cls}`}>{statusConfig[rfq.status].label}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)' }}>
              {[
                { label: 'Product', value: rfq.product },
                { label: 'Quantity', value: rfq.quantity },
                { label: 'Budget', value: rfq.budget },
                { label: 'Deadline', value: rfq.deadline, color: rfq.urgent ? 'var(--color-error)' : undefined },
              ].map((d) => (
                <div key={d.label}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 2 }}>{d.label}</div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: (d as any).color || 'var(--color-text)' }}>{d.value}</div>
                </div>
              ))}
            </div>

            {rfq.notes && (
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', fontStyle: 'italic' }}>
                "{rfq.notes}"
              </p>
            )}

            {rfq.status === 'PENDING' && (
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <Link href={`/farmer/rfq/${rfq.id}/respond`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                  Send Quote
                </Link>
                <Link href={`/farmer/chat?rfq=${rfq.id}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                  💬 Chat with Buyer
                </Link>
                <button className="btn btn-ghost btn-sm">Decline</button>
              </div>
            )}
            {rfq.status === 'RESPONDED' && (
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-info)', fontWeight: 'var(--font-medium)' }}>
                ⏳ Waiting for buyer response
              </div>
            )}
            {rfq.status === 'ACCEPTED' && (
              <Link href={`/farmer/orders?from=rfq&rfqId=${rfq.id}`} className="btn btn-success btn-sm" style={{ background: 'var(--color-success)', color: 'white' }}>
                ✅ View Generated Order
              </Link>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: 56, marginBottom: 'var(--space-4)' }}>📋</div>
          <p>No RFQs in this category</p>
        </div>
      )}
    </div>
  );
}
