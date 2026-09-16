'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail, Phone, ChevronDown } from 'lucide-react';

interface PublicHeaderProps {
  settings: any;
}

export default function PublicHeader({ settings }: PublicHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = (settings?.navItems && settings.navItems.length > 0
    ? settings.navItems
    : [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Products', href: '/products' },
        { label: 'Cases', href: '/cases' },
        { label: 'Contact', href: '/contact' },
      ]).map((item) => ({
        name: item.label,
        href: item.href,
      }));

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-stone-200 bg-white">
      <div className="hidden border-b border-stone-200 bg-stone-950 px-4 py-2 text-[11px] text-stone-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`mailto:${settings?.contactEmail || 'info@zoy-tech.com'}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="h-3.5 w-3.5" />
              {settings?.contactEmail || 'info@zoy-tech.com'}
            </a>
            <a href={`tel:${settings?.contactPhone || '+86 15307600828'}`} className="flex items-center gap-2 hover:text-white">
              <Phone className="h-3.5 w-3.5" />
              {settings?.contactPhone || '+86 15307600828'}
            </a>
          </div>
          <span className="uppercase tracking-[0.2em] text-stone-400">Factory sourcing • quality control • export support</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          {settings?.logoUrl ? (
            <img src={settings.logoUrl} alt={settings.companyName || 'Company logo'} className="h-11 w-11 object-contain rounded-md border border-stone-200 bg-white" />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center border border-stone-900 bg-stone-900 text-lg font-black text-white">
              Z
            </div>
          )}
          <div>
            <div className="text-lg font-black tracking-tight text-stone-900">{settings?.companyName || 'Source by Zahid'}</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">Industrial supply</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <div key={item.name} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive ? 'text-stone-900' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                {item.dropdown && (
                  <div className="invisible absolute left-0 top-full mt-2 w-72 border border-stone-200 bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block border-b border-stone-100 px-4 py-3 text-sm text-stone-600 transition-colors last:border-b-0 hover:bg-stone-50 hover:text-stone-900"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}` : 'https://wa.me/8615307600828'} target="_blank" rel="noreferrer" className="border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:border-stone-900 hover:text-stone-900">
            WhatsApp
          </a>
          <Link href="/contact" className="btn-primary py-2.5 px-5 text-sm">
            Request quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center border border-stone-300 bg-white text-stone-700 md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-stone-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <React.Fragment key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-3 text-sm font-semibold ${pathname === item.href ? 'bg-stone-100 text-stone-900' : 'text-stone-700'}`}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-4">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-stone-600"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="btn-primary mt-4 block w-full text-center">
              Request quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
