'use client';

import { useActionState, useEffect, useState } from 'react';
import { CheckCircle2, Loader2, UserRound } from 'lucide-react';
import { updateAdminAccount } from '@/actions/auth';
import { ensureCsrfToken } from '@/lib/csrf';

const initialState = { success: false, error: '', message: '' };

export default function AdminAccountForm({ initialEmail, initialName }: { initialEmail: string; initialName: string }) {
  const [state, formAction, isPending] = useActionState(updateAdminAccount, initialState);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    setCsrfToken(ensureCsrfToken());
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900"><UserRound className="h-5 w-5" /></div>
        <div>
          <h2 className="text-2xl font-black font-heading text-slate-900">Admin account</h2>
          <p className="text-sm text-slate-500">Change the admin email, name, and password.</p>
        </div>
      </div>

      <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        {state?.error && <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</div>}
        {state?.success && <div className="md:col-span-2 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"><CheckCircle2 className="h-4 w-4" />{state.message}</div>}
        <div><label className="admin-label mb-2 block">Admin email / username</label><input name="email" type="email" required defaultValue={initialEmail} className="admin-input" /></div>
        <div><label className="admin-label mb-2 block">Display name</label><input name="name" required defaultValue={initialName} className="admin-input" /></div>
        <div className="md:col-span-2"><label className="admin-label mb-2 block">Current password</label><input name="currentPassword" type="password" required className="admin-input" /></div>
        <div><label className="admin-label mb-2 block">New password (optional)</label><input name="newPassword" type="password" minLength={8} className="admin-input" /></div>
        <div><label className="admin-label mb-2 block">Confirm new password</label><input name="confirmPassword" type="password" minLength={8} className="admin-input" /></div>
        <div className="md:col-span-2 flex justify-end"><button type="submit" disabled={isPending || !csrfToken} className="btn-primary disabled:opacity-60">{isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating...</> : 'Update admin account'}</button></div>
      </form>
    </div>
  );
}