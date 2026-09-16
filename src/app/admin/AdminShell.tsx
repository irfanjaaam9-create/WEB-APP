'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { logoutAdmin } from '@/actions/auth';
import { adminNavItems } from '@/lib/admin-menu';
import { ensureCsrfToken } from '@/lib/csrf';

export default function AdminShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: { role?: 'admin' | 'editor' | null } | null;
}) {
  const pathname = usePathname();
  const [csrfToken, setCsrfToken] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setCsrfToken(ensureCsrfToken());
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const navLinkClass = (href: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
      pathname === href || pathname.startsWith(`${href}/`)
        ? 'bg-primary text-white shadow-lg shadow-primary/20'
        : 'hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="md:flex md:min-h-screen">
        <div
          className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-slate-900 text-slate-300 transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:w-64 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-16 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800">
            <div className="font-heading font-black text-xl text-white">ZEE Admin</div>
            <button
              type="button"
              className="md:hidden rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            <nav className="space-y-1 px-4">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={false}
                    className={navLinkClass(item.href)}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-slate-800">
            <form action={logoutAdmin}>
              <input type="hidden" name="csrfToken" value={csrfToken} />
              <button
                type="submit"
                className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors text-slate-400"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </form>
          </div>
        </div>

        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar overlay"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-slate-950/60 md:hidden"
          />
        )}

        <div className="flex min-h-screen w-full flex-1 flex-col overflow-hidden">
          <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 md:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h2 className="text-base font-bold text-slate-800 md:text-lg">Content Management System</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {session?.role === 'admin' ? 'A' : session?.role === 'editor' ? 'E' : 'U'}
              </div>
              <span className="hidden text-sm font-medium capitalize text-slate-600 sm:inline-block">
                {session?.role || 'User'}
              </span>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
