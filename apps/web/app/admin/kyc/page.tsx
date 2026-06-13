'use client';

import { useState } from 'react';

const mockKycDocs = [
  { id: '1', user: { name: 'Ravi Kumar', role: 'FARMER' }, type: 'AADHAAR', documentNumber: 'xxxx-xxxx-4321', url: '#', submittedAt: '2026-06-12' },
  { id: '2', user: { name: 'Metro Mart', role: 'BUYER' }, type: 'GST', documentNumber: '07AAAAA1111A1Z1', url: '#', submittedAt: '2026-06-11' },
  { id: '3', user: { name: 'Gagan Logistics', role: 'TRANSPORTER' }, type: 'VEHICLE_RC', documentNumber: 'DL-1GC-1234', url: '#', submittedAt: '2026-06-10' },
  { id: '4', user: { name: 'Amit Singh', role: 'FARMER' }, type: 'PAN', documentNumber: 'ABCDE1234F', url: '#', submittedAt: '2026-06-10' },
];

export default function AdminKycReviewPage() {
  const [docs, setDocs] = useState(mockKycDocs);
  const [reviewingDoc, setReviewingDoc] = useState<typeof mockKycDocs[0] | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (id: string) => {
    setDocs(docs.filter(d => d.id !== id));
    setReviewingDoc(null);
  };

  const handleReject = (id: string) => {
    setDocs(docs.filter(d => d.id !== id));
    setReviewingDoc(null);
    setRejectionReason('');
  };

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">🪪 Pending KYC Approvals</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Review submitted document uploads to grant verified user status.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: reviewingDoc ? '1.5fr 1fr' : '1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
        {/* Docs List */}
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Doc Type</th>
                <th>Doc Number</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(doc => (
                <tr key={doc.id}>
                  <td style={{ fontWeight: 'var(--font-bold)' }}>{doc.user.name}</td>
                  <td>
                    <span className="badge" style={{
                      background: doc.user.role === 'FARMER' ? 'rgba(15, 61, 46, 0.1)' : doc.user.role === 'BUYER' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(30, 64, 175, 0.1)',
                      color: doc.user.role === 'FARMER' ? 'var(--color-primary)' : doc.user.role === 'BUYER' ? 'var(--color-accent)' : '#1e40af'
                    }}>
                      {doc.user.role}
                    </span>
                  </td>
                  <td>{doc.type}</td>
                  <td><code>{doc.documentNumber}</code></td>
                  <td>{doc.submittedAt}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => setReviewingDoc(doc)}>
                      Review Files
                    </button>
                  </td>
                </tr>
              ))}
              {docs.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--color-text-muted)' }}>
                    🟢 No pending KYC submissions. All clear!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Review Panel */}
        {reviewingDoc && (
          <div className="card" style={{ border: '2px solid var(--color-primary)' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="card-title">Reviewing Document</h2>
              <button className="btn btn-outline btn-sm" onClick={() => setReviewingDoc(null)}>✕</button>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Submitted By</div>
                <div style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-md)' }}>{reviewingDoc.user.name}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Document Type</div>
                  <div style={{ fontWeight: 'var(--font-bold)' }}>{reviewingDoc.type}</div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>ID Number</div>
                  <div style={{ fontWeight: 'var(--font-bold)' }}><code>{reviewingDoc.documentNumber}</code></div>
                </div>
              </div>

              {/* Document Image Dummy */}
              <div style={{
                height: 200, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-lg)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '1px dashed var(--color-border)', cursor: 'pointer', gap: 'var(--space-2)'
              }}>
                <span style={{ fontSize: '2rem' }}>📄</span>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)' }}>{reviewingDoc.type}_verification_scan.pdf</span>
                <span style={{ fontSize: 'var(--text-xxs)', color: 'var(--color-text-muted)' }}>Click to open in new tab</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => handleApprove(reviewingDoc.id)}>
                  Approve KYC
                </button>
                <button
                  className="btn btn-outline"
                  style={{ flex: 1, color: '#dc2626', borderColor: '#dc2626' }}
                  onClick={() => {
                    const reason = prompt('Enter rejection reason:');
                    if (reason) handleReject(reviewingDoc.id);
                  }}
                >
                  Reject KYC
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
