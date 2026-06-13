import type { Metadata } from 'next';
import PortalLayout from '@/components/portal/PortalLayout';

export const metadata: Metadata = { title: 'Founder Dashboard | Krushiva' };

export default function FounderPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout portal="founder" user={{ name: 'Founder', role: 'founder' }}>
      {children}
    </PortalLayout>
  );
}
