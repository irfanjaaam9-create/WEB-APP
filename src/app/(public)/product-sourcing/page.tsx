import React from 'react';
import Link from 'next/link';
import { Search, Scale, PackageCheck, MessageSquare, Handshake, Truck, Send, CheckCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export default function ProductSourcingPage() {
  const whatsapp = getWhatsAppLink('Hello Zahid, I want to inquire about consumer product sourcing in China.');

  const services = [
    {
      icon: Search,
      title: 'Supplier Research',
      body: 'We screen Chinese manufacturers matching your product specifications, raw material requirements, and target unit cost parameters.',
    },
    {
      icon: Scale,
      title: 'Quotation Comparison',
      body: 'Receive structured comparison tables breaking down factory unit pricing, MOQs, sample fees, and production lead times.',
    },
    {
      icon: PackageCheck,
      title: 'Sample Coordination',
      body: 'We coordinate pre-production samples from Chinese suppliers, inspect locally, and arrange consolidated dispatch to your country.',
    },
    {
      icon: MessageSquare,
      title: 'Factory Communication',
      body: 'Bridge language barriers with fluent English-Mandarin communication directly with factory engineers and management.',
    },
    {
      icon: Handshake,
      title: 'Price Negotiation',
      body: 'Negotiate per-unit pricing, order volumes, payment terms, and custom packaging directly with Chinese factories.',
    },
    {
      icon: Truck,
      title: 'Order Coordination',
      body: 'Track production milestones with photo updates, coordinate logistics, and manage export shipping documentation.',
    },
  ];

  return (
    <div style={{ paddingTop: '60px', background: '#f5f5f4', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '48px 0 44px' }}>
        <div className="container-xl" style={{ maxWidth: '800px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1d4ed8', display: 'block', marginBottom: '12px' }}>
            Consumer Product Sourcing
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1c1917', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '12px' }}>
            Find Reliable Chinese Product Suppliers
          </h1>
          <p style={{ fontSize: '15px', color: '#78716c', lineHeight: 1.65, maxWidth: '600px' }}>
            We help importers, e-commerce brands, retailers, and wholesalers research Chinese factories, compare pricing, negotiate MOQs, and coordinate prototype samples.
          </p>
        </div>
      </div>

      <div className="container-xl" style={{ padding: '56px 1.5rem' }}>

        {/* Services Grid */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1d4ed8', display: 'block', marginBottom: '10px' }}>What's Included</span>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1c1917', letterSpacing: '-0.02em', marginBottom: '28px' }}>Product Sourcing Services</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px', marginBottom: '48px' }}>
          {services.map(({ icon: Icon, title, body }, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '22px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f5f4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Icon size={18} style={{ color: '#57534e' }} />
              </div>
              <h3 style={{ fontWeight: 600, fontSize: '14px', color: '#1c1917', marginBottom: '6px', letterSpacing: '-0.01em' }}>{title}</h3>
              <p style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.6, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: '#1c1917', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Have a Specific Product Requirement?
          </h2>
          <p style={{ fontSize: '14px', color: '#a8a29e', maxWidth: '460px', margin: '0 auto 24px', lineHeight: 1.65 }}>
            Send your product link, target budget, or photos. We'll review feasibility and guide you through the next step.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            <Send size={15} />
            Send Product Sourcing Request
          </Link>
        </div>
      </div>
    </div>
  );
}
