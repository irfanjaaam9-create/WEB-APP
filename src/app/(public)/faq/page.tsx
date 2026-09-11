import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Send } from 'lucide-react';

export const revalidate = 60;

export default async function FaqPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { orderIndex: 'asc' } });

  return (
    <div style={{ paddingTop: '60px', background: '#f5f5f4', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '48px 0 44px' }}>
        <div className="container-xl" style={{ maxWidth: '760px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1d4ed8', display: 'block', marginBottom: '12px' }}>
            Clear Answers
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1c1917', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '12px' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '15px', color: '#78716c', lineHeight: 1.65 }}>
            Everything you need to know about our China sourcing process, service scopes, pricing, factory communication, and machinery procurement.
          </p>
        </div>
      </div>

      <div className="container-xl" style={{ padding: '48px 1.5rem', maxWidth: '760px' }}>
        {faqs.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
            {faqs.map((faq) => (
              <div key={faq.id} style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '22px 24px' }}>
                {faq.category && (
                  <span className="badge badge-stone" style={{ marginBottom: '10px', display: 'inline-flex' }}>
                    {faq.category}
                  </span>
                )}
                <h2 style={{ fontWeight: 600, fontSize: '15px', color: '#1c1917', marginBottom: '8px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  {faq.question}
                </h2>
                <p style={{ fontSize: '14px', color: '#78716c', lineHeight: 1.7, margin: 0 }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '48px', textAlign: 'center', marginBottom: '32px' }}>
            <p style={{ color: '#a8a29e', fontSize: '14px' }}>FAQs will appear here once added via the admin panel.</p>
          </div>
        )}

        {/* CTA */}
        <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
          <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#1c1917', marginBottom: '6px' }}>
            Have a question not listed here?
          </h3>
          <p style={{ fontSize: '13px', color: '#78716c', marginBottom: '18px' }}>
            Send your query directly to Zahid and we'll clarify before taking any step.
          </p>
          <Link href="/contact" className="btn btn-primary">
            <Send size={14} />
            Ask Zahid Directly
          </Link>
        </div>
      </div>
    </div>
  );
}
