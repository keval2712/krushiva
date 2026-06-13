import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Shipment | Krushiva',
  description: 'Track your Krushiva agricultural shipment in real-time',
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
