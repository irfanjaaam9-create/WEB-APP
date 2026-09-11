'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Send } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export default function StickyMobileBar() {
  const whatsapp = getWhatsAppLink('Hello Zahid, I would like to discuss sourcing products from China.');

  return (
    <div
      className="sm:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: '#fff',
        borderTop: '1px solid #e7e5e4',
        padding: '10px 16px',
        display: 'flex',
        gap: '8px',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
      }}
    >
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '11px 0',
          borderRadius: '8px',
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          color: '#15803d',
          fontWeight: 600,
          fontSize: '13px',
          textDecoration: 'none',
        }}
      >
        <Phone size={15} />
        WhatsApp
      </a>
      <Link
        href="/contact"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '11px 0',
          borderRadius: '8px',
          background: '#1d4ed8',
          border: '1px solid #1d4ed8',
          color: '#fff',
          fontWeight: 600,
          fontSize: '13px',
          textDecoration: 'none',
        }}
      >
        <Send size={15} />
        Get Quote
      </Link>
    </div>
  );
}
