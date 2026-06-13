'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockShipments = [
  { id: '1', shipmentNumber: 'SHP-7821', trackingNumber: 'TRK-7821', orderNumber: 'ORD-045', farmer: 'Ravi Kumar', buyer: 'Mehul Trading Co.', route: 'Ajmer, RJ → Ahmedabad, GJ', distance: '420 km', status: 'IN_TRANSIT', progress: 65, pickupAt: '06:30 AM', eta: '2h 15m', weight: '10 Q', earnings: 4200, vehicle: 'RJ-14-GA-4521' },
  { id: '2', shipmentNumber: 'SHP-7818', trackingNumber: 'TRK-7818', orderNumber: 'ORD-020', farmer: 'Himalayan Agro', buyer: 'Fresh Direct', route: 'Dehradun, UK → Delhi, DL', distance: '280 km', status: 'PICKED_UP', progress: 20, pickupAt: '05:00 AM', eta: '5h', weight: '25 Q', earnings: 6500, vehicle: 'RJ-14-GA-4521' },
  { id: '3', shipmentNumber: 'SHP-7810', trackingNumber: 'TRK-7810', orderNumber: 'ORD-038', farmer: 'Priya Farms', buyer: 'Agro Buyers', route: 'Nashik, MH → Mumbai, MH', distance: '170 km', status: 'DELIVERED', progress: 100, pickupAt: 'Yesterday', eta: 'Delivered', weight: '5 Q', earnings: 2800, vehicle: 'RJ-14-GA-4521' },
  { id: '4', shipmentNumber: 'SHP-7805', trackingNumber: 'TRK-7805', orderNumber: 'ORD-035', farmer: 'Ravi Kumar', buyer: 'City Wholesalers', route: 'Ajmer, RJ → Jaipur, RJ', distance: '130 km', status: 'COMPLETED', progress: 100, pickupAt: '10 Jan', eta: 'Completed', weight: '20 Q', earnings: 3500, vehicle: 'RJ-14-GA-4521' },
];

const statusConfig: Record<string, { label: string; cls: string; color: string }> = {
  ASSIGNED: { label: 'Assigned', cls: 'status-accepted', color: 'var(--color-info)' },
  PICKED_UP: { label: 'Picked Up', cls: 'status-pickup', color: '#7c3aed' },
  IN_TRANSIT: { label: 'In Transit', cls: 'status-transit', color: 'var(--color-warning)' },
  DELIVERED: { label: 'Delivered', cls: 'status-delivered', color: 'var(--color-success)' },
  COMPLETED: { label: 'Completed', cls: 'status-completed', color: 'var(--color-primary)' },
};

export default function TransporterShipmentsPage() {
  const [tab, setTab] = useState('ALL');
  const filtered = tab === 'ALL' ? mockShipments : mockShipments.filter(s => s.status === tab);
  const totalEarnings = mockShipments.reduce((s, sh) => s + sh.earnings, 0);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>My Shipments</h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            {mockShipments.filter(s => ['IN_TRANSIT', 'PICKED_UP', 'ASSIGNED'].includes(s.status)).length} active • Total earnings: ₹{totalEarnings.toLocaleString()}
          </p>
        </div>
        <Link href="/transporter/loads" className="btn btn-primary">Browse Available Loads</Link>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-1)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)', overflowX: 'auto' }}>
        {['ALL', 'IN_TRANSIT', 'PICKED_UP', 'DELIVERED', 'COMPLETED'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)',
              color: tab === t ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderBottom: tab === t ? '2px solid var(--color-primary)' : '2px solid transparent',
              background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
            {t === 'ALL' ? 'All' : statusConfig[t]?.label || t}
          </button>
        ))}
      </div>

      {/* Shipment Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filtered.map((sh) => (
          <div key={sh.id} className="card" style={{ borderRadius: 'var(--radius-xl)', borderLeft: `4px solid ${statusConfig[sh.status]?.color || 'var(--color-border)'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ fontWeight: 'var(--font-bold)' }}>{sh.shipmentNumber}</span>
                <span className={`status-badge ${statusConfig[sh.status]?.cls || ''}`}>{statusConfig[sh.status]?.label || sh.status}</span>
              </div>
              <span style={{ fontWeight: 'var(--font-extrabold)', color: 'var(--color-success)', fontSize: 'var(--text-lg)' }}>₹{sh.earnings.toLocaleString()}</span>
            </div>

            {/* Route */}
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
              <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>🛣️ {sh.route}</div>
              <div style={{ display: 'flex', gap: 'var(--space-6)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                <span>📏 {sh.distance}</span>
                <span>⚖️ {sh.weight}</span>
                <span>🚚 {sh.vehicle}</span>
                <span>⏱️ ETA: {sh.eta}</span>
              </div>
            </div>

            {/* Progress bar */}
            {['IN_TRANSIT', 'PICKED_UP'].includes(sh.status) && (
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 4 }}>
                  <span>Pickup → Delivery</span>
                  <span>{sh.progress}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${sh.progress}%` }} /></div>
              </div>
            )}

            {/* Participants */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
              <span>🌾 Farmer: {sh.farmer}</span>
              <span>🛒 Buyer: {sh.buyer}</span>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Link href={`/track/${sh.trackingNumber}`} className="btn btn-primary btn-sm">📍 Live Tracking</Link>
              {sh.status === 'PICKED_UP' && <button className="btn btn-outline btn-sm">Update Location</button>}
              {sh.status === 'IN_TRANSIT' && <button className="btn btn-outline btn-sm" style={{ color: 'var(--color-success)', borderColor: 'var(--color-success)' }}>📦 Mark Delivered</button>}
              {sh.status === 'DELIVERED' && <Link href={`/transporter/shipments/${sh.id}/proof`} className="btn btn-outline btn-sm">Upload Delivery Proof</Link>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
