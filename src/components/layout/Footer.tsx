import React from 'react';
import Link from 'next/link';
import { getWhatsAppLink } from '@/lib/utils';

const services = [
  { name: 'Service Packages & Pricing', href: '/services/pricing' },
  { name: 'Product Supplier Research', href: '/product-sourcing' },
  { name: 'Machinery Procurement', href: '/machinery-sourcing' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Projects & Case Studies', href: '/projects' },
  { name: 'Contact & Get a Quote', href: '/contact' },
];

const machinery = [
  { name: 'Pallet-Making Machinery', href: '/machinery/pallet-making' },
  { name: 'Biomass Pellet Equipment', href: '/machinery/biomass-pellet' },
  { name: 'Roll-Forming Machines', href: '/machinery/roll-forming' },
  { name: 'Products Catalog', href: '/products' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Blog', href: '/blog' },
];

const legal = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Refund Policy', href: '/refund-policy' },
];

export default function Footer() {
  const whatsapp = getWhatsAppLink();

  return (
    <footer style={{ background: '#1c1917', color: '#a8a29e', fontFamily: 'Inter, sans-serif' }}>
      {/* Main Footer Grid */}
      <div className="container-xl" style={{ paddingTop: '56px', paddingBottom: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>

          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1', maxWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '8px',
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ color: '#1c1917', fontWeight: 800, fontSize: '14px' }}>Z</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff', letterSpacing: '-0.02em' }}>Source by Zahid</div>
                <div style={{ fontSize: '10px', color: '#78716c', marginTop: '2px' }}>China Sourcing & Machinery Procurement</div>
              </div>
            </div>

            <p style={{ fontSize: '13px', lineHeight: '1.65', color: '#a8a29e', marginBottom: '20px' }}>
              Your sourcing partner on the ground in China. We help international buyers find suppliers, compare quotes, and procure machinery.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#d6d3d1', textDecoration: 'none', fontWeight: 500 }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                +86 197 1202 0155 (WhatsApp)
              </a>
              <a
                href="mailto:contact@sourcebyzahid.com"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#a8a29e', textDecoration: 'none' }}
              >
                <span style={{ fontSize: '10px' }}>✉</span>
                contact@sourcebyzahid.com
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#78716c' }}>
                <span style={{ fontSize: '10px' }}>📍</span>
                Guangzhou & Yiwu, China
              </span>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e7e5e4', marginBottom: '16px' }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    style={{ fontSize: '13px', color: '#a8a29e', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#a8a29e'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Machinery Column */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e7e5e4', marginBottom: '16px' }}>
              Machinery & Products
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {machinery.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    style={{ fontSize: '13px', color: '#a8a29e', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#a8a29e'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Markets Column */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e7e5e4', marginBottom: '16px' }}>
              Markets Served
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {['Australia & New Zealand', 'USA & Canada', 'Poland, Germany & Europe', 'India, Pakistan & Bangladesh', 'Gulf & Middle East', 'Nepal & Afghanistan'].map((m) => (
                <li key={m} style={{ fontSize: '13px', color: '#78716c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '9px', color: '#57534e' }}>—</span> {m}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Fee Notice */}
      <div style={{ borderTop: '1px solid #292524' }}>
        <div className="container-xl" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <div style={{ background: '#292524', borderRadius: '8px', padding: '14px 18px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '13px', color: '#a8a29e', flexShrink: 0, marginTop: '1px' }}>ⓘ</span>
            <p style={{ fontSize: '12px', color: '#78716c', lineHeight: '1.6', margin: 0 }}>
              <strong style={{ color: '#a8a29e', fontWeight: 600 }}>Fee notice:</strong> Service fees cover sourcing research, supplier comparison, English-Mandarin communication, and local coordination. Sample costs, freight, travel, testing, and third-party inspection fees are quoted separately. Scope and pricing confirmed before any payment is requested.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid #292524' }}>
        <div
          className="container-xl"
          style={{
            paddingTop: '18px', paddingBottom: '18px',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between', gap: '12px',
          }}
        >
          <p style={{ fontSize: '12px', color: '#57534e', margin: 0 }}>
            © {new Date().getFullYear()} Source by Zahid. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {legal.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                style={{ fontSize: '12px', color: '#57534e', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#a8a29e'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#57534e'}
              >
                {l.name}
              </Link>
            ))}
            <Link
              href="/admin/login"
              style={{ fontSize: '12px', color: '#44403c', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#78716c'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#44403c'}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
