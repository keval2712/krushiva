'use client';

import { useState } from 'react';

const mockUsers = [
  { id: '1', name: 'Ravi Kumar', email: 'ravi@example.com', phone: '+91 98765 43210', role: 'FARMER', status: 'ACTIVE', kycStatus: 'VERIFIED', trustScore: 94, joinedAt: '2023-03-15', ordersCount: 142 },
  { id: '2', name: 'Mehul Trading Co.', email: 'mehul@trading.com', phone: '+91 91234 56789', role: 'BUYER', status: 'ACTIVE', kycStatus: 'VERIFIED', trustScore: 88, joinedAt: '2023-05-20', ordersCount: 87 },
  { id: '3', name: 'Ajay Transport', email: 'ajay@transport.in', phone: '+91 94567 12345', role: 'TRANSPORTER', status: 'ACTIVE', kycStatus: 'VERIFIED', trustScore: 91, joinedAt: '2023-04-10', ordersCount: 210 },
  { id: '4', name: 'Fresh Direct', email: 'info@freshdirect.in', phone: '+91 87654 32109', role: 'BUYER', status: 'ACTIVE', kycStatus: 'PENDING', trustScore: 62, joinedAt: '2024-01-05', ordersCount: 3 },
  { id: '5', name: 'Priya Farms', email: 'priya@farms.com', phone: '+91 76543 21098', role: 'FARMER', status: 'SUSPENDED', kycStatus: 'REJECTED', trustScore: 45, joinedAt: '2023-11-12', ordersCount: 15 },
  { id: '6', name: 'New Trader Co.', email: 'newtrade@test.com', phone: '+91 65432 10987', role: 'BUYER', status: 'ACTIVE', kycStatus: 'PENDING', trustScore: 0, joinedAt: '2024-01-14', ordersCount: 0 },
];

const roleColors: Record<string, string> = {
  FARMER: 'badge-success', BUYER: 'badge-primary', TRANSPORTER: 'badge-warning', ADMIN: 'badge-error',
};

const kycColors: Record<string, string> = {
  VERIFIED: 'badge-success', PENDING: 'badge-warning', REJECTED: 'badge-error', NOT_SUBMITTED: 'badge-gray',
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [kycFilter, setKycFilter] = useState('ALL');

  const filtered = mockUsers.filter(u => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (kycFilter !== 'ALL' && u.kycStatus !== kycFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>User Management</h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            {mockUsers.length} users • {mockUsers.filter(u => u.kycStatus === 'PENDING').length} pending KYC
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
        <input className="input" placeholder="Search name or email..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 300, height: 40 }} />
        <select className="input select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ width: 'auto', height: 40 }}>
          <option value="ALL">All Roles</option>
          <option value="FARMER">Farmers</option>
          <option value="BUYER">Buyers</option>
          <option value="TRANSPORTER">Transporters</option>
        </select>
        <select className="input select" value={kycFilter} onChange={e => setKycFilter(e.target.value)} style={{ width: 'auto', height: 40 }}>
          <option value="ALL">All KYC</option>
          <option value="VERIFIED">Verified</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>KYC</th>
              <th>Trust</th>
              <th>Orders</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div className="avatar avatar-sm" style={{ background: 'var(--color-primary)', color: 'white' }}>{u.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>{u.name}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`badge ${roleColors[u.role]}`}>{u.role}</span></td>
                <td><span className={`badge ${kycColors[u.kycStatus]}`}>{u.kycStatus}</span></td>
                <td>
                  <span style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)', color: u.trustScore >= 80 ? 'var(--color-success)' : u.trustScore >= 50 ? 'var(--color-warning)' : 'var(--color-error)' }}>
                    {u.trustScore || '—'}
                  </span>
                </td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{u.ordersCount}</td>
                <td>
                  <span className={`badge ${u.status === 'ACTIVE' ? 'badge-success' : 'badge-error'}`}>{u.status}</span>
                </td>
                <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {new Date(u.joinedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button className="btn btn-ghost btn-sm">View</button>
                    {u.kycStatus === 'PENDING' && <button className="btn btn-primary btn-sm">Review KYC</button>}
                    {u.status === 'ACTIVE' ? (
                      <button className="btn btn-danger btn-sm">Suspend</button>
                    ) : (
                      <button className="btn btn-outline btn-sm" style={{ color: 'var(--color-success)', borderColor: 'var(--color-success)' }}>Activate</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
