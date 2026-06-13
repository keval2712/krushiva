import type { Metadata } from 'next';
import PortalLayout from '@/components/portal/PortalLayout';

export const metadata: Metadata = { title: 'Farmer Portal | Krushiva' };

export default function FarmerPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout portal="farmer" user={{ name: 'Ravi Kumar', role: 'farmer', trustScore: 94 }}>
      {children}
    </PortalLayout>
  );
}
