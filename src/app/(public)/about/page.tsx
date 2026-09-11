import React from 'react';
import Link from 'next/link';
import { MapPin, MessageSquare, ShieldCheck, Send, Phone } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export default function AboutPage() {
  const whatsapp = getWhatsAppLink('Hello Zahid, I would like to discuss working directly with you on China sourcing.');

  return (
    <div style={{ paddingTop: '60px', background: '#f5f5f4', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '48px 0 44px' }}>
        <div className="container-xl" style={{ maxWidth: '800px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1d4ed8', display: 'block', marginBottom: '12px' }}>
            On-Ground Partner in China
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: '#1c1917', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
            "Hi, I'm Zahid — the person behind Source by Zahid."
          </h1>
          <p style={{ fontSize: '16px', color: '#57534e', lineHeight: 1.7, maxWidth: '640px' }}>
            I am based on the ground in China and work directly with international buyers, brand owners, importers, and procurement managers across Australia, Europe, North America, and Asia.
          </p>
          <p style={{ fontSize: '14px', color: '#78716c', lineHeight: 1.7, maxWidth: '640px', marginTop: '12px' }}>
            Sourcing from China requires clear communication, factory verification, unit price comparison, sample coordination, and local follow-up. I bridge that gap by communicating with factories directly in Mandarin on your behalf.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="container-xl" style={{ padding: '56px 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {[
            {
              icon: MapPin,
              title: 'Direct Presence in China',
              body: 'Located within China\'s major manufacturing provinces — Guangzhou, Yiwu, Zhejiang — providing practical local access to factories.',
            },
            {
              icon: MessageSquare,
              title: 'English & Mandarin Fluency',
              body: 'Your product specifications, engineering standards, and commercial terms translated fluently into factory technical discussions in Mandarin.',
            },
            {
              icon: ShieldCheck,
              title: 'Work Directly With Zahid',
              body: 'You deal directly with me. No account managers, no bureaucracy. Transparent service scopes confirmed before work begins.',
            },
          ].map(({ icon: Icon, title, body }, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Icon size={20} style={{ color: '#1d4ed8' }} />
              </div>
              <h2 style={{ fontWeight: 700, fontSize: '15px', color: '#1c1917', marginBottom: '8px', letterSpacing: '-0.01em' }}>{title}</h2>
              <p style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.65, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          background: '#1c1917', borderRadius: '12px', padding: '40px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '10px' }}>
            Let's Discuss Your Sourcing Requirement
          </h2>
          <p style={{ fontSize: '14px', color: '#a8a29e', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.65 }}>
            Send your product link or machinery requirements. I'll review feasibility and get back to you with clear information.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            <Link href="/contact" className="btn btn-primary">
              <Send size={14} />
              Send Your Product Request
            </Link>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#292524', color: '#e7e5e4', border: '1px solid #44403c' }}>
              <Phone size={14} />
              Chat Directly on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
