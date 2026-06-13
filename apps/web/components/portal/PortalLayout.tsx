'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const farmerNav = [
  { section: 'Overview', items: [
    { label: 'Dashboard', href: '/farmer', icon: '🏠' },
    { label: 'Trust Score', href: '/farmer/trust', icon: '⭐' },
  ]},
  { section: 'My Farm', items: [
    { label: 'Farm Profile', href: '/farmer/profile', icon: '🌾' },
    { label: 'My Products', href: '/farmer/products', icon: '📦' },
    { label: 'Add Product', href: '/farmer/products/new', icon: '➕' },
  ]},
  { section: 'Business', items: [
    { label: 'RFQ Inbox', href: '/farmer/rfq', icon: '📋', badge: 3 },
    { label: 'Orders', href: '/farmer/orders', icon: '📑', badge: 2 },
    { label: 'Transport Requests', href: '/farmer/transport', icon: '🚚' },
  ]},
  { section: 'Communication', items: [
    { label: 'Messages', href: '/farmer/chat', icon: '💬', badge: 5 },
    { label: 'Notifications', href: '/farmer/notifications', icon: '🔔', badge: 8 },
  ]},
  { section: 'Account', items: [
    { label: 'Ratings & Reviews', href: '/farmer/ratings', icon: '⭐' },
    { label: 'Settings', href: '/farmer/settings', icon: '⚙️' },
  ]},
];

const buyerNav = [
  { section: 'Overview', items: [
    { label: 'Dashboard', href: '/buyer', icon: '🏠' },
    { label: 'Trust Score', href: '/buyer/trust', icon: '⭐' },
  ]},
  { section: 'Marketplace', items: [
    { label: 'Search Products', href: '/buyer/search', icon: '🔍' },
    { label: 'Saved Suppliers', href: '/buyer/saved', icon: '🏷️' },
    { label: 'My RFQs', href: '/buyer/rfq', icon: '📋', badge: 2 },
  ]},
  { section: 'Orders', items: [
    { label: 'My Orders', href: '/buyer/orders', icon: '📑', badge: 1 },
    { label: 'Track Shipment', href: '/buyer/tracking', icon: '📍' },
  ]},
  { section: 'Communication', items: [
    { label: 'Messages', href: '/buyer/chat', icon: '💬', badge: 3 },
    { label: 'Notifications', href: '/buyer/notifications', icon: '🔔', badge: 4 },
  ]},
  { section: 'Account', items: [
    { label: 'Ratings & Reviews', href: '/buyer/ratings', icon: '⭐' },
    { label: 'Settings', href: '/buyer/settings', icon: '⚙️' },
  ]},
];

const transporterNav = [
  { section: 'Overview', items: [
    { label: 'Dashboard', href: '/transporter', icon: '🏠' },
    { label: 'Trust Score', href: '/transporter/trust', icon: '⭐' },
  ]},
  { section: 'Fleet', items: [
    { label: 'Vehicles', href: '/transporter/vehicles', icon: '🚛' },
    { label: 'Drivers', href: '/transporter/drivers', icon: '👤' },
  ]},
  { section: 'Loads', items: [
    { label: 'Available Loads', href: '/transporter/loads', icon: '📦', badge: 12 },
    { label: 'My Shipments', href: '/transporter/shipments', icon: '📍', badge: 3 },
  ]},
  { section: 'Communication', items: [
    { label: 'Messages', href: '/transporter/chat', icon: '💬', badge: 2 },
    { label: 'Notifications', href: '/transporter/notifications', icon: '🔔', badge: 5 },
  ]},
  { section: 'Account', items: [
    { label: 'Ratings & Reviews', href: '/transporter/ratings', icon: '⭐' },
    { label: 'Settings', href: '/transporter/settings', icon: '⚙️' },
  ]},
];

const adminNav = [
  { section: 'Overview', items: [
    { label: 'Dashboard', href: '/admin', icon: '🏠' },
    { label: 'Analytics', href: '/admin/analytics', icon: '📊' },
  ]},
  { section: 'Users', items: [
    { label: 'All Users', href: '/admin/users', icon: '👥' },
    { label: 'KYC Pending', href: '/admin/kyc', icon: '🪪', badge: 7 },
    { label: 'Verifications', href: '/admin/verify', icon: '✅' },
  ]},
  { section: 'Marketplace', items: [
    { label: 'Products', href: '/admin/products', icon: '📦' },
    { label: 'Categories', href: '/admin/categories', icon: '🗂️' },
  ]},
  { section: 'Operations', items: [
    { label: 'Orders', href: '/admin/orders', icon: '📑' },
    { label: 'Shipments', href: '/admin/shipments', icon: '🚚' },
    { label: 'Disputes', href: '/admin/disputes', icon: '⚖️', badge: 3 },
  ]},
  { section: 'Trust', items: [
    { label: 'Trust Monitoring', href: '/admin/trust', icon: '🛡️' },
    { label: 'Reports', href: '/admin/reports', icon: '📈' },
  ]},
];

const founderNav = [
  { section: 'Overview', items: [
    { label: 'Live Overview', href: '/founder', icon: '🌐' },
    { label: 'Live Map', href: '/founder/map', icon: '🗺️' },
  ]},
  { section: 'Analytics', items: [
    { label: 'User Analytics', href: '/founder/analytics/users', icon: '👥' },
    { label: 'Order & Revenue', href: '/founder/analytics/orders', icon: '💰' },
    { label: 'Trust Analytics', href: '/founder/analytics/trust', icon: '🛡️' },
    { label: 'Growth', href: '/founder/analytics/growth', icon: '📈' },
  ]},
];

export type PortalType = 'farmer' | 'buyer' | 'transporter' | 'admin' | 'founder';

const navConfigs = {
  farmer: { nav: farmerNav, label: 'Farmer Portal', color: 'var(--color-primary)', emoji: '🌾' },
  buyer: { nav: buyerNav, label: 'Buyer Portal', color: 'var(--color-accent)', emoji: '🛒' },
  transporter: { nav: transporterNav, label: 'Transporter Portal', color: '#1e40af', emoji: '🚚' },
  admin: { nav: adminNav, label: 'Admin Panel', color: '#7c3aed', emoji: '⚙️' },
  founder: { nav: founderNav, label: 'Founder Dashboard', color: '#9f1239', emoji: '🔭' },
};

interface PortalLayoutProps {
  children: React.ReactNode;
  portal: PortalType;
  user?: { name: string; role: string; trustScore?: number; avatar?: string };
}

export default function PortalLayout({ children, portal, user = { name: 'Demo User', role: portal } }: PortalLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const config = navConfigs[portal];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-background)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 49, backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{ zIndex: 50 }}>
        {/* Brand + User */}
        <div className="sidebar-header">
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-md)',
            background: config.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>
            {config.emoji}
          </div>
          <div>
            <div style={{ fontWeight: 'var(--font-black)', fontSize: 'var(--text-sm)', letterSpacing: '-0.03em', color: 'var(--color-primary)' }}>
              KRUSHIVA
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{config.label}</div>
          </div>
        </div>

        {/* User Card */}
        <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)' }}>
            <div className="avatar avatar-md" style={{ background: config.color, color: 'white', flexShrink: 0 }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>{user.role}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {config.nav.map((section) => (
            <div key={section.section} className="sidebar-section">
              <div className="sidebar-section-label">{section.section}</div>
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== `/${portal}` && pathname.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href} className={`sidebar-item ${isActive ? 'active' : ''}`}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {(item as { badge?: number }).badge ? (
                      <span className="sidebar-badge">{(item as { badge?: number }).badge}</span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
          <Link href="/login" className="sidebar-item" style={{ color: 'var(--color-error)' }}>
            <span>🚪</span>
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="main-content" style={{ flex: 1 }}>
        {/* Top Bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(248, 250, 248, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
          padding: '0 var(--space-8)',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-2)' }}
            id="sidebar-toggle"
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            {/* Notifications Bell */}
            <button className="btn btn-ghost btn-icon btn-sm" id="topbar-notifications" style={{ position: 'relative' }}>
              🔔
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--color-error)',
                border: '2px solid white',
              }} />
            </button>

            {/* Portal Switch */}
            <div style={{ height: 24, width: 1, background: 'var(--color-border)' }} />
            <Link href={`/${portal}/settings`} style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
              padding: '4px var(--space-3)', borderRadius: 'var(--radius-full)',
              background: 'var(--color-surface-2)',
              fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', textDecoration: 'none', color: 'inherit',
            }}>
              <div className="avatar avatar-sm" style={{ background: config.color, color: 'white' }}>
                {user.name.charAt(0)}
              </div>
              {user.name.split(' ')[0]}
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="main-content-padded">
          {children}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #sidebar-toggle { display: flex !important; }
          .main-content { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
