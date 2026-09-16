'use client';

import React, { useActionState, useState } from 'react';
import { KeyRound, Loader2, CheckCircle2 } from 'lucide-react';
import { changeAdminPassword } from '@/actions/auth';

const initialState = { success: false, error: '', message: '' };

export default function AdminPasswordForm() {
  const [state, formAction, isPending] = useActionState(changeAdminPassword, initialState);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
          <KeyRound className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black font-heading text-slate-900">Change admin password</h2>
          <p className="text-sm text-slate-500">Update your secure login credentials.</p>
        </div>
      </div>

      <form action={formAction} className="space-y-5">
        {state?.error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</div>
        ) : null}

        {state?.success && state.message ? (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            <span>{state.message}</span>
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Current password</label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              name="currentPassword"
              required
              className="admin-input pr-11"
              placeholder="Enter current password"
            />
            <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              {showCurrent ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">New password</label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              name="newPassword"
              required
              minLength={8}
              className="admin-input pr-11"
              placeholder="Enter new password"
            />
            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              {showNew ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm new password</label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              required
              minLength={8}
              className="admin-input pr-11"
              placeholder="Confirm new password"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              {showConfirm ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating...</> : 'Update password'}
          </button>
        </div>
      </form>
    </div>
  );
}
