'use client';

import { useState } from 'react';
import Link from 'next/link';

const availableLoads = [
  { id: '1', pickupCity: 'Ajmer', pickupState: 'Rajasthan', deliveryCity: 'Ahmedabad', deliveryState: 'Gujarat', distance: '420 km', product: 'Wheat (Grade A)', weight: '10 Quintal', estimatedEarnings: 4200, farmerName: 'Ravi Kumar', farmerTrust: 94, farmerVerified: true, pickupDate: '2024-01-16', urgency: 'NORMAL', postedAt: '1h ago' },
  { id: '2', pickupCity: 'Dehradun', pickupState: 'Uttarakhand', deliveryCity: 'Delhi', deliveryState: 'Delhi', distance: '280 km', product: 'Basmati Rice', weight: '25 Quintal', estimatedEarnings: 6500, farmerName: 'Himalayan Agro', farmerTrust: 92, farmerVerified: true, pickupDate: '2024-01-17', urgency: 'HIGH', postedAt: '3h ago' },
  { id: '3', pickupCity: 'Nashik', pickupState: 'Maharashtra', deliveryCity: 'Mumbai', deliveryState: 'Maharashtra', distance: '170 km', product: 'Organic Tomato', weight: '5 Quintal', estimatedEarnings: 2800, farmerName: 'Priya Farms', farmerTrust: 88, farmerVerified: true, pickupDate: '2024-01-16', urgency: 'NORMAL', postedAt: '5h ago' },
  { id: '4', pickupCity: 'Indore', pickupState: 'MP', deliveryCity: 'Bhopal', deliveryState: 'MP', distance: '195 km', product: 'Soya Bean', weight: '30 Quintal', estimatedEarnings: 5000, farmerName: 'MP Agri Hub', farmerTrust: 91, farmerVerified: true, pickupDate: '2024-01-18', urgency: 'LOW', postedAt: '12h ago' },
  { id: '5', pickupCity: 'Guntur', pickupState: 'AP', deliveryCity: 'Hyderabad', deliveryState: 'Telangana', distance: '275 km', product: 'Green Chilli', weight: '8 Quintal', estimatedEarnings: 3500, farmerName: 'Krishna Farm', farmerTrust: 86, farmerVerified: false, pickupDate: '2024-01-17', urgency: 'NORMAL', postedAt: '8h ago' },
];

const urgencyConfig: Record<string, { label: string; color: string }> = {
  HIGH: { label: '🔥 Urgent', color: 'var(--color-error)' },
  NORMAL: { label: 'Normal', color: 'var(--color-text-muted)' },
  LOW: { label: 'Flexible', color: 'var(--color-success)' },
};

export default function TransporterLoadsPage() {
  const [sortBy, setSortBy] = useState('earnings');

  const sorted = [...availableLoads].sort((a, b) => {
    if (sortBy === 'earnings') return b.estimatedEarnings - a.estimatedEarnings;
    if (sortBy === 'distance') return parseInt(a.distance) - parseInt(b.distance);
    return 0;
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>Available Loads</h1>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            {availableLoads.length} loads available in your service area
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <select className="input select" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto', height: 36, fontSize: 'var(--text-sm)' }}>
            <option value="earnings">Sort: Highest Earnings</option>
            <option value="distance">Sort: Shortest Distance</option>
            <option value="latest">Sort: Latest First</option>
          </select>
        </div>
      </div>

      {/* Loads Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 'var(--space-4)' }}>
        {sorted.map((load) => (
          <div key={load.id} className="card card-hover" style={{ borderRadius: 'var(--radius-xl)', borderTop: load.urgency === 'HIGH' ? '3px solid var(--color-error)' : undefined }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', color: 'var(--color-success)' }}>
                  ₹{load.estimatedEarnings.toLocaleString()}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Estimated earnings</div>
              </div>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: urgencyConfig[load.urgency].color }}>
                {urgencyConfig[load.urgency].label}
              </span>
            </div>

            {/* Route */}
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)' }} />
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>{load.pickupCity}, {load.pickupState}</span>
              </div>
              <div style={{ borderLeft: '2px dashed var(--color-border)', height: 16, marginLeft: 3 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-error)' }} />
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>{load.deliveryCity}, {load.deliveryState}</span>
              </div>
            </div>

            {/* Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div><div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Distance</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>📏 {load.distance}</div></div>
              <div><div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Weight</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>⚖️ {load.weight}</div></div>
              <div><div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Pickup</div><div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>📅 {new Date(load.pickupDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div></div>
            </div>

            {/* Farmer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)' }}>
              <div className="avatar avatar-sm" style={{ background: 'var(--color-primary)', color: 'white' }}>{load.farmerName.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)' }}>{load.farmerName} {load.farmerVerified && '✅'}</div>
                <div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Trust: {load.farmerTrust} • {load.product}</div>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{load.postedAt}</div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Accept Load</button>
              <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
