import React from 'react';
import AdminShell from './AdminShell';
import { getSession } from '@/lib/session';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    return children;
  }

  return <AdminShell session={session}>{children}</AdminShell>;
}
