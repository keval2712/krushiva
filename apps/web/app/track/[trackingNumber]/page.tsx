import type { Metadata } from 'next';
import Link from 'next/link';

interface TrackingPageProps {
  params: { trackingNumber: string };
}

export async function generateMetadata({ params }: TrackingPageProps): Promise<Metadata> {
  return {
    title: `Shipment ${params.trackingNumber} | Krushiva Tracking`,
    description: 'Track your agricultural shipment in real-time on Krushiva',
  };
}

// Mock shipment data — replace with API call
const getMockShipment = (trackingNumber: string) => ({
  trackingNumber,
  shipmentNumber: 'SHP-7821',
  orderId: 'ORD-045',
  orderNumber: 'ORD-2024-045',
  product: 'Wheat Grade A',
  quantity: '10 Quintal',
  status: 'IN_TRANSIT',

  farmer: { name: 'Ravi Kumar', location: 'Ajmer, Rajasthan', trustScore: 94, verified: true },
  buyer: { name: 'Mehul Trading Co.', location: 'Pune, Maharashtra', trustScore: 88, verified: true },
  transporter: { name: 'Ajay Transport', driver: 'Suresh Yadav', vehicle: 'RJ-14-GA-4521', trustScore: 91, verified: true },

  pickup: {
    address: 'Village Sawariya, Ajmer, Rajasthan 305001',
    latitude: 26.449923,
    longitude: 74.639534,
    confirmedAt: '2024-01-15T06:30:00Z',
    photo: true,
    gpsVerified: true,
  },
  delivery: {
    address: 'APMC Market Yard, Pune, Maharashtra 411018',
    latitude: 18.516726,
    longitude: 73.856255,
    expectedAt: '2024-01-15T14:00:00Z',
  },

  currentLocation: { latitude: 22.7196, longitude: 75.8577, address: 'Near Indore, MP' },
  distanceCovered: '640 km',
  totalDistance: '850 km',
  etaMinutes: 135,

  timeline: [
    { status: 'CREATED', label: 'Order Created', timestamp: '2024-01-14T10:00:00Z', done: true },
    { status: 'ACCEPTED', label: 'Farmer Accepted', timestamp: '2024-01-14T10:45:00Z', done: true },
    { status: 'PICKUP_SCHEDULED', label: 'Pickup Scheduled', timestamp: '2024-01-14T14:00:00Z', done: true },
    { status: 'PICKED_UP', label: 'Picked Up', timestamp: '2024-01-15T06:30:00Z', done: true, hasProof: true },
    { status: 'IN_TRANSIT', label: 'In Transit', timestamp: '2024-01-15T07:00:00Z', done: true, current: true },
    { status: 'NEAR_DESTINATION', label: 'Near Destination', timestamp: null, done: false },
    { status: 'DELIVERED', label: 'Delivered', timestamp: null, done: false },
    { status: 'COMPLETED', label: 'Completed', timestamp: null, done: false },
  ],

  quantityVerification: { expected: '10 Quintal', actual: '9.95 Quintal', verified: true },
});

function formatTime(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function formatETA(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m > 0 ? m + 'min' : ''}`.trim();
}

const statusColors: Record<string, string> = {
  CREATED: 'status-created', ACCEPTED: 'status-accepted', PICKUP_SCHEDULED: 'status-pickup',
  PICKED_UP: 'status-pickup', IN_TRANSIT: 'status-transit', NEAR_DESTINATION: 'status-transit',
  DELIVERED: 'status-delivered', COMPLETED: 'status-completed',
};

const statusLabels: Record<string, string> = {
  CREATED: 'Order Created', ACCEPTED: 'Accepted', PICKUP_SCHEDULED: 'Pickup Scheduled',
  PICKED_UP: 'Picked Up', IN_TRANSIT: 'In Transit', NEAR_DESTINATION: 'Near Destination',
  DELIVERED: 'Delivered', COMPLETED: 'Completed',
};

export default function TrackingPage({ params }: TrackingPageProps) {
  const shipment = getMockShipment(params.trackingNumber);
  const progress = Math.round((640 / 850) * 100);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--color-primary)',
        padding: 'var(--space-4) var(--space-6)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ color: 'white', fontWeight: 'var(--font-black)', fontSize: 'var(--text-xl)', letterSpacing: '-0.04em', textDecoration: 'none' }}>
          KRUS<span style={{ color: 'var(--color-secondary)' }}>IV</span>A
        </Link>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-sm)' }}>
          Shipment Tracking
        </div>
      </div>

      <div className="container" style={{ padding: 'var(--space-8) var(--space-6)', maxWidth: 900 }}>
        {/* Tracking Number & Status */}
        <div className="card" style={{ borderRadius: 'var(--radius-2xl)', marginBottom: 'var(--space-6)', padding: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <div className="label" style={{ marginBottom: 'var(--space-2)' }}>Tracking Number</div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-extrabold)', letterSpacing: '0.04em', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
                {shipment.trackingNumber}
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                Order: {shipment.orderNumber} • Shipment: {shipment.shipmentNumber}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className={`status-badge ${statusColors[shipment.status]}`} style={{ fontSize: 'var(--text-sm)', padding: '6px 14px' }}>
                {statusLabels[shipment.status]}
              </span>
              <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                ETA: <strong style={{ color: 'var(--color-warning)' }}>{formatETA(shipment.etaMinutes)}</strong>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginTop: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 8 }}>
              <span>📍 {shipment.pickup.address.split(',')[0]}</span>
              <span>{shipment.distanceCovered} / {shipment.totalDistance} covered</span>
              <span>📦 {shipment.delivery.address.split(',')[0]}</span>
            </div>
            <div className="progress-bar" style={{ height: 10 }}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div style={{ textAlign: 'center', marginTop: 8, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              🚛 Currently near <strong>{shipment.currentLocation.address}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          {/* Timeline */}
          <div>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-5)' }}>Order Timeline</h2>
            <div className="timeline">
              {shipment.timeline.map((event, i) => (
                <div key={event.status} className="timeline-item">
                  <div className={`timeline-dot ${event.done ? (event.current ? 'active' : 'completed') : ''}`}>
                    {event.done && !event.current && (
                      <svg width="10" height="8" fill="none" viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    )}
                    {event.current && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title" style={{ color: event.current ? 'var(--color-primary)' : event.done ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                      {event.label}
                      {event.current && <span className="badge badge-primary" style={{ marginLeft: 'var(--space-2)', fontSize: 10 }}>NOW</span>}
                    </div>
                    <div className="timeline-time">{formatTime(event.timestamp)}</div>
                    {(event as any).hasProof && (
                      <div style={{ marginTop: 4 }}>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 'var(--font-medium)' }}>
                          ✅ Pickup proof attached (GPS + Photo)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Participants & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {/* Participants */}
            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)' }}>Participants</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {[
                  { role: '🌾 Farmer', ...shipment.farmer },
                  { role: '🛒 Buyer', ...shipment.buyer },
                  { role: '🚚 Transporter', name: shipment.transporter.name, location: `Driver: ${shipment.transporter.driver}`, trustScore: shipment.transporter.trustScore, verified: shipment.transporter.verified },
                ].map((p) => (
                  <div key={p.role} className="card" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 2 }}>{p.role}</div>
                        <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>{p.name}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{p.location}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {p.verified && <div className="trust-badge" style={{ marginBottom: 4 }}>✅ Verified</div>}
                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)' }}>
                          {p.trustScore} <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>trust</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipment Details */}
            <div className="card" style={{ borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)' }}>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)' }}>Shipment Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {[
                  { label: 'Product', value: shipment.product },
                  { label: 'Expected Qty', value: shipment.quantityVerification.expected },
                  { label: 'Actual Qty', value: shipment.quantityVerification.actual },
                  { label: 'Pickup', value: formatTime(shipment.pickup.confirmedAt!) },
                  { label: 'Expected Delivery', value: formatTime(shipment.delivery.expectedAt) },
                  { label: 'Vehicle', value: shipment.transporter.vehicle },
                ].map((d) => (
                  <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{d.label}</span>
                    <span style={{ fontWeight: 'var(--font-medium)', textAlign: 'right' }}>{d.value}</span>
                  </div>
                ))}
                {shipment.quantityVerification.verified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-success)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)' }}>
                    ✅ Quantity verified at pickup
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Proof */}
        {shipment.pickup.photo && (
          <div className="card" style={{ borderRadius: 'var(--radius-xl)', marginTop: 'var(--space-6)', padding: 'var(--space-6)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-5)' }}>Pickup Proof</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
              {[
                { icon: '📸', label: 'Pickup Photo', status: 'Attached', color: 'var(--color-success-bg)', textColor: 'var(--color-success)' },
                { icon: '📍', label: 'GPS Location', status: 'Verified', color: 'var(--color-success-bg)', textColor: 'var(--color-success)' },
                { icon: '🕐', label: 'Timestamp', status: formatTime(shipment.pickup.confirmedAt!), color: 'var(--color-info-bg)', textColor: 'var(--color-info)' },
              ].map((proof) => (
                <div key={proof.label} style={{ padding: 'var(--space-4)', background: proof.color, borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 'var(--space-2)' }}>{proof.icon}</div>
                  <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{proof.label}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: proof.textColor, fontWeight: 'var(--font-semibold)', marginTop: 4 }}>{proof.status}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-8)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
          Powered by{' '}
          <Link href="/" style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-semibold)' }}>Krushiva</Link>
          {' '}— Where Agriculture Connects
        </div>
      </div>
    </div>
  );
}
