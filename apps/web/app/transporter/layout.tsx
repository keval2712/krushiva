import type { Metadata } from 'next';
import PortalLayout from '@/components/portal/PortalLayout';

export const metadata: Metadata = { title: 'Transporter Portal | Krushiva' };

export default function TransporterPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout portal="transporter" user={{ name: 'Ajay Transport', role: 'transporter', trustScore: 91 }}>
      {children}
    </PortalLayout>
  );
}
