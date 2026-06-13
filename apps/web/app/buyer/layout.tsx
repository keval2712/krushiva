import type { Metadata } from 'next';
import PortalLayout from '@/components/portal/PortalLayout';

export const metadata: Metadata = { title: 'Buyer Portal | Krushiva' };

export default function BuyerPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout portal="buyer" user={{ name: 'Priya Mehta', role: 'buyer', trustScore: 88 }}>
      {children}
    </PortalLayout>
  );
}
