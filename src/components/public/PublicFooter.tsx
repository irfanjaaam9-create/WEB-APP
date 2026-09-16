import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

interface PublicFooterProps {
  settings: any;
}

export default function PublicFooter({ settings }: PublicFooterProps) {
  const footerLinks = settings?.footerLinks && settings.footerLinks.length > 0
    ? settings.footerLinks
    : [
        { label: 'Terms', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Refund Policy', href: '/refund-policy' },
      ];

  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt={settings.companyName || 'Company logo'} className="h-10 w-10 object-contain rounded-md border border-white/10 bg-white" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white text-sm font-black text-stone-900">
                  Z
                </div>
              )}
              <div>
                <div className="text-xl font-black tracking-tight text-white">{settings?.companyName || 'Source by Zahid'}</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">Industrial supply</div>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-stone-400">
              {settings?.companyTagline || 'Procurement, factory verification, and plant equipment sourcing with a practical China-based operation.'}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-white">Company</h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="/about" className="hover:text-white">About us</Link></li>
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/cases" className="hover:text-white">Projects</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-white">Categories</h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="/products?category=psa-oxygen-generator" className="hover:text-white">PSA oxygen generators</Link></li>
              <li><Link href="/products?category=hyperbaric-oxygen-chamber" className="hover:text-white">Hyperbaric chambers</Link></li>
              <li><Link href="/products?category=oxygen-cylinder-filling" className="hover:text-white">Cylinder filling systems</Link></li>
              <li><Link href="/products?category=container-package-system" className="hover:text-white">Container package systems</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-white">Contact</h3>
            <ul className="space-y-4 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-amber-400" />
                <span>{settings?.address || 'Hunan Province, China'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-amber-400" />
                <span>{settings?.contactPhone || '+86 15307600828'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-amber-400" />
                <span>{settings?.contactEmail || 'info@zoy-tech.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-stone-800 pt-6 text-xs text-stone-500 md:flex-row md:items-center md:justify-between">
          <p>{settings?.footerText || '© 2026 Source by Zahid. All rights reserved.'}</p>
          <div className="flex flex-wrap gap-3">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
