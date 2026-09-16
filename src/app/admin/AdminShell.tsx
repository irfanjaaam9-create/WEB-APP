'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
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
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    setCsrfToken(ensureCsrfToken());
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
          <div className="font-heading font-black text-xl text-white">ZOY Admin</div>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-4">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-800 font-heading">Content Management System</h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {session?.role === 'admin' ? 'A' : session?.role === 'editor' ? 'E' : 'U'}
            </div>
            <span className="text-sm font-medium text-slate-600 capitalize">{session?.role || 'User'}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
