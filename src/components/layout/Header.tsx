'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

const navLinks = [
  { name: 'Services', href: '/services/pricing' },
  { name: 'Product Sourcing', href: '/product-sourcing' },
  { name: 'Machinery', href: '/machinery-sourcing' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const whatsapp = getWhatsAppLink('Hello Zahid, I would like to discuss product sourcing from China.');

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : '#ffffff',
          borderBottom: '1px solid #e7e5e4',
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
          transition: 'box-shadow 0.2s ease, background-color 0.2s ease',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
        }}
      >
        <div className="container-xl">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>

            {/* ── Brand ── */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '8px',
                background: '#1c1917', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '14px', letterSpacing: '-0.02em' }}>Z</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1c1917', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  Source by Zahid
                </div>
                <div style={{ fontSize: '10px', color: '#78716c', fontWeight: 500, marginTop: '2px', letterSpacing: '0.02em' }}>
                  China Sourcing & Procurement
                </div>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav style={{ display: 'none', alignItems: 'center', gap: '2px' }} className="desktop-nav">
              {navLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    style={{
                      fontSize: '13px',
                      fontWeight: active ? 600 : 500,
                      color: active ? '#1d4ed8' : '#57534e',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      backgroundColor: active ? '#eff6ff' : 'transparent',
                      textDecoration: 'none',
                      transition: 'color 0.15s, background-color 0.15s',
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.color = '#1c1917';
                        (e.currentTarget as HTMLElement).style.backgroundColor = '#fafaf9';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.color = '#57534e';
                        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* ── Header CTAs ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm hide-mobile"
                style={{ gap: '6px' }}
              >
                <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                WhatsApp
              </a>
              <Link href="/contact" className="btn btn-primary btn-sm">
                Get Quote
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="mobile-menu-btn"
                aria-label="Toggle navigation"
                style={{
                  display: 'none',
                  padding: '6px',
                  border: '1px solid #e7e5e4',
                  borderRadius: '8px',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: '#57534e',
                }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

          </div>
        </div>

        {/* ── Mobile Nav Drawer ── */}
        {mobileOpen && (
          <div style={{
            borderTop: '1px solid #e7e5e4',
            background: '#fff',
            padding: '12px 0',
          }}>
            <div className="container-xl">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '12px' }}>
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      style={{
                        display: 'block',
                        padding: '10px 12px',
                        fontSize: '14px',
                        fontWeight: active ? 600 : 500,
                        color: active ? '#1d4ed8' : '#1c1917',
                        backgroundColor: active ? '#eff6ff' : 'transparent',
                        borderRadius: '8px',
                        textDecoration: 'none',
                      }}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              <div style={{ borderTop: '1px solid #f5f5f4', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ justifyContent: 'center' }}
                >
                  <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a' }} />
                  Chat on WhatsApp (+86 197 1202 0155)
                </a>
                <Link href="/contact" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                  Send Product Request
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .hide-mobile { display: inline-flex !important; }
        }
        @media (max-width: 1023px) {
          .hide-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
