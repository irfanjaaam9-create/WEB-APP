'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Phone, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const leadId = searchParams?.get('leadId') || 'SBZ-2026';
  const whatsapp = getWhatsAppLink(`Hello Zahid, I just submitted enquiry ${leadId} on the website.`);

  return (
    <div style={{ paddingTop: '60px', background: '#f5f5f4', minHeight: '100vh' }}>
      <div className="container-xl" style={{ padding: '72px 1.5rem', maxWidth: '600px', textAlign: 'center' }}>

        {/* Success Icon */}
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <CheckCircle size={28} style={{ color: '#16a34a' }} />
        </div>

        {/* Reference */}
        <div style={{
          display: 'inline-block', fontSize: '11px', fontWeight: 600,
          color: '#78716c', background: '#fafaf9', border: '1px solid #e7e5e4',
          borderRadius: '6px', padding: '4px 12px', marginBottom: '16px',
          fontFamily: 'monospace',
        }}>
          Ref: {leadId}
        </div>

        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, color: '#1c1917', letterSpacing: '-0.03em', marginBottom: '12px' }}>
          Sourcing Request Received
        </h1>
        <p style={{ fontSize: '15px', color: '#78716c', lineHeight: 1.65, marginBottom: '32px' }}>
          Thank you. We'll review your requirements and confirm whether we can help before requesting any payment.
        </p>

        {/* Next Steps */}
        <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '24px', textAlign: 'left', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <ShieldCheck size={16} style={{ color: '#1d4ed8' }} />
            <span style={{ fontWeight: 700, fontSize: '13px', color: '#1c1917' }}>What Happens Next?</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'We review your request and evaluate factory availability in China.',
              'You receive a WhatsApp or email response confirming feasibility and service scope.',
              'No payment is requested until scope, pricing, and lead times are agreed.',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '5px',
                  background: '#eff6ff', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '11px', fontWeight: 700,
                  color: '#1d4ed8', flexShrink: 0, marginTop: '1px',
                }}>{i + 1}</div>
                <p style={{ fontSize: '13px', color: '#57534e', lineHeight: 1.5, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-green">
            <Phone size={14} />
            Follow Up on WhatsApp
          </a>
          <Link href="/" className="btn btn-secondary">
            Return to Homepage
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={24} style={{ color: '#a8a29e' }} />
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
