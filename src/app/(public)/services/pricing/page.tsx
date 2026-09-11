import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { CheckCircle, ShieldCheck, Phone, Send } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export const revalidate = 60;

export default async function ServicesPricingPage() {
  const servicePackages = await prisma.servicePackage.findMany({
    orderBy: { orderIndex: 'asc' },
  });

  const whatsapp = getWhatsAppLink('Hello Zahid, I would like to discuss service packages and pricing.');

  return (
    <div style={{ paddingTop: '60px', background: '#f5f5f4', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '48px 0 44px' }}>
        <div className="container-xl" style={{ maxWidth: '800px', textAlign: 'center', margin: '0 auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1d4ed8', display: 'block', marginBottom: '12px' }}>
            Transparent Service Scopes
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1c1917', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '12px' }}>
            Services & Pricing Packages
          </h1>
          <p style={{ fontSize: '15px', color: '#78716c', lineHeight: 1.65, maxWidth: '520px', margin: '0 auto' }}>
            Clear, fixed service fees for dedicated sourcing research, factory communication, and local coordination work in China.
          </p>
        </div>
      </div>

      <div className="container-xl" style={{ padding: '56px 1.5rem' }}>

        {/* Pricing Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {servicePackages.length > 0 ? servicePackages.map((pkg) => {
            let features: string[] = [];
            try {
              features = typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features || [];
            } catch { features = []; }

            return (
              <div
                key={pkg.id}
                style={{
                  background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px',
                  padding: '24px', display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between', position: 'relative',
                }}
              >
                {pkg.badge && (
                  <span className="badge badge-blue" style={{ position: 'absolute', top: '16px', right: '16px' }}>
                    {pkg.badge}
                  </span>
                )}
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    {pkg.title}
                  </p>
                  <div style={{ fontSize: '36px', fontWeight: 900, color: '#1c1917', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '4px' }}>
                    {pkg.priceSuffix || `US$${pkg.priceUsd}`}
                  </div>
                  {pkg.priceNote && (
                    <p style={{ fontSize: '12px', color: '#a8a29e', marginBottom: '20px' }}>{pkg.priceNote}</p>
                  )}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '13px', color: '#57534e', lineHeight: 1.5 }}>
                        <CheckCircle size={14} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/contact?service=${encodeURIComponent(pkg.title)}`}
                  className="btn btn-secondary"
                  style={{ justifyContent: 'center', width: '100%' }}
                >
                  {pkg.ctaText}
                </Link>
              </div>
            );
          }) : (
            /* Fallback placeholder cards */
            [
              { name: 'Starter Research', price: 'US$149', features: ['3–5 supplier options', 'Price & MOQ comparison', 'English summary report'] },
              { name: 'Full Sourcing Package', price: 'US$349', features: ['Supplier research', 'Sample coordination', 'Negotiation support', 'Progress tracking'] },
              { name: 'Machinery Sourcing', price: 'Custom', features: ['Technical evaluation', 'Factory visits if needed', 'Mandarin negotiation', 'Install coordination'] },
            ].map((pkg) => (
              <div key={pkg.name} style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{pkg.name}</p>
                  <div style={{ fontSize: '36px', fontWeight: 900, color: '#1c1917', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '20px' }}>{pkg.price}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pkg.features.map((f) => (
                      <li key={f} style={{ display: 'flex', gap: '9px', fontSize: '13px', color: '#57534e', alignItems: 'flex-start' }}>
                        <CheckCircle size={14} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="btn btn-secondary" style={{ justifyContent: 'center' }}>Get Started</Link>
              </div>
            ))
          )}
        </div>

        {/* Disclaimer */}
        <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '24px', maxWidth: '800px', margin: '0 auto 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <ShieldCheck size={16} style={{ color: '#1d4ed8' }} />
            <span style={{ fontWeight: 700, fontSize: '14px', color: '#1c1917' }}>Pricing & Scope Notice</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Service Fees Cover', text: 'Dedicated sourcing research, factory identification, quotation comparison, English-Mandarin communication, and local coordination work.' },
              { label: 'Excluded (Quoted Separately)', text: 'Sample costs, tooling fees, international freight, customs duties, travel, third-party testing, and pre-shipment inspection.' },
              { label: 'Scope Confirmation', text: 'Final scope and pricing are confirmed with you before work begins. No hidden fees.' },
            ].map(({ label, text }) => (
              <div key={label} style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#a8a29e', marginTop: '2px' }}>—</span>
                <p style={{ fontSize: '13px', color: '#57534e', lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ color: '#1c1917', fontWeight: 600 }}>{label}: </strong>{text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#78716c', marginBottom: '16px' }}>Not sure which package fits your needs?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-primary">
              <Send size={14} />
              Discuss Your Requirement
            </Link>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <Phone size={14} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
