import React from 'react';
import { getOrCreateSettings } from '@/lib/site-settings';
import SettingsForm from './SettingsForm';
import AdminPasswordForm from './AdminPasswordForm';
import AdminAccountForm from './AdminAccountForm';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { getSession } from '@/lib/session';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await getOrCreateSettings();
  await connectDB();
  const session = await getSession();
  const user = session?.userId ? await User.findById(session.userId).lean() : null;

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black font-heading text-slate-900">Site Settings</h1>
        <p className="text-slate-500 mt-2">Manage global branding, contact information, and the homepage hero carousel.</p>
      </div>

      <SettingsForm initialData={JSON.parse(JSON.stringify(settings))} />
      <AdminAccountForm initialEmail={user?.email || ''} initialName={user?.name || ''} />
      <AdminPasswordForm />
    </div>
  );
}
