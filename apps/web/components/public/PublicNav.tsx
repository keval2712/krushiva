'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'For Farmers', href: '/for-farmers' },
  { label: 'For Buyers', href: '/for-buyers' },
  { label: 'For Transporters', href: '/for-transporters' },
  { label: 'Marketplace', href: '/marketplace' },
];

export default function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav-solid' : 'nav-transparent'}`} style={{ padding: '0 var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 'var(--container-2xl)', margin: '0 auto' }}>
          {/* Logo */}
          <Link href="/" className="nav-brand" style={{ color: scrolled ? 'var(--color-primary)' : 'white' }}>
            KRUS<span style={{ color: 'var(--color-secondary)' }}>IV</span>A
          </Link>

          {/* Desktop Links */}
          <div className="nav-links" style={{ display: 'flex' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{ color: scrolled ? undefined : 'rgba(255,255,255,0.85)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Link
              href="/login"
              className="btn btn-ghost btn-sm"
              style={{
                color: scrolled ? 'var(--color-text-secondary)' : 'rgba(255,255,255,0.9)',
                borderColor: scrolled ? undefined : 'rgba(255,255,255,0.3)',
              }}
            >
              Sign In
            </Link>
            <Link href="/register" className="btn btn-secondary btn-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="btn btn-ghost btn-icon"
            style={{ display: 'none' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99, background: 'var(--color-primary)',
          display: 'flex', flexDirection: 'column', padding: 'var(--space-6)',
          paddingTop: 'calc(var(--nav-height) + var(--space-6))',
          animation: 'fadeIn 200ms ease',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: 'var(--space-4) 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-semibold)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Link href="/login" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
              Sign In
            </Link>
            <Link href="/register" className="btn btn-secondary btn-lg">
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {open ? (
        <>
          <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
