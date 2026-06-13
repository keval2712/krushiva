import type { Metadata } from 'next';
import PortalLayout from '@/components/portal/PortalLayout';

export const metadata: Metadata = { title: 'Admin Panel | Krushiva' };

export default function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout portal="admin" user={{ name: 'Admin User', role: 'admin' }}>
      {children}
    </PortalLayout>
  );
}
