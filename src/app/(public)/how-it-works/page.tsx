import React from 'react';
import Link from 'next/link';
import { Send, CheckCircle } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Send Your Requirement',
      desc: 'Submit your product link, image, target budget, quantity, destination country, or machinery technical requirements through our secure request form.',
    },
    {
      num: '02',
      title: 'Feasibility Review',
      desc: 'We evaluate your request against Chinese manufacturing capabilities to confirm whether your specifications and target parameters can be met.',
    },
    {
      num: '03',
      title: 'Scope & Fee Confirmation',
      desc: 'You receive clear information on the agreed sourcing service scope, transparent fee, and expected delivery target before making any commitment.',
    },
    {
      num: '04',
      title: 'Supplier Research & Coordination',
      desc: 'We communicate directly with relevant Chinese suppliers in Mandarin — verifying capabilities, unit pricing, MOQs, sample lead times, and technical specs.',
    },
    {
      num: '05',
      title: 'Review & Decide Next Step',
      desc: 'You review the structured supplier information report and decide whether to order samples, hold a supplier call, negotiate pricing, or coordinate production.',
    },
  ];

  return (
    <div style={{ paddingTop: '60px', background: '#f5f5f4', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '48px 0 44px' }}>
        <div className="container-xl" style={{ maxWidth: '760px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1d4ed8', display: 'block', marginBottom: '12px' }}>
            Transparent Process
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1c1917', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '12px' }}>
            How China Sourcing Works
          </h1>
          <p style={{ fontSize: '15px', color: '#78716c', lineHeight: 1.65 }}>
            A structured 5-step process giving international buyers complete clarity, local support, and direct communication control.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="container-xl" style={{ padding: '48px 1.5rem', maxWidth: '760px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex', gap: '20px', alignItems: 'flex-start',
                background: '#fff', border: '1px solid #e7e5e4',
                borderRadius: '12px', padding: '22px 24px',
              }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: '13px', color: '#1d4ed8',
              }}>
                {step.num}
              </div>
              <div>
                <h2 style={{ fontWeight: 700, fontSize: '15px', color: '#1c1917', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                  {step.title}
                </h2>
                <p style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '32px', background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#1c1917', marginBottom: '8px' }}>
            Ready to start the process?
          </h3>
          <p style={{ fontSize: '13px', color: '#78716c', marginBottom: '20px' }}>
            Submit your product request and we'll confirm whether we can help.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            <Send size={15} />
            Start Step 1: Send Product Request
          </Link>
        </div>
      </div>
    </div>
  );
}
