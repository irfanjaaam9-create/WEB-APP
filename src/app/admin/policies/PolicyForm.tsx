'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { createPolicyPage, updatePolicyPage } from '@/actions/policies';
import { ensureCsrfToken } from '@/lib/csrf';

interface PolicyFormProps {
  initialData?: any;
}

export default function PolicyForm({ initialData }: PolicyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    setCsrfToken(ensureCsrfToken());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      csrfToken,
      slug: String(formData.get('slug') || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/\s+/g, '-'),
      title: String(formData.get('title') || '').trim(),
      summary: String(formData.get('summary') || '').trim(),
      content: String(formData.get('content') || '').trim(),
      isPublished: formData.get('isPublished') === 'on',
    };

    const res = initialData
      ? await updatePolicyPage(initialData._id, data)
      : await createPolicyPage(data);

    if (res.success) {
      router.push('/admin/policies');
    } else {
      setError(res.error || 'Failed to save policy page');
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>}

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="text-3xl font-black font-heading text-slate-900">
          {initialData ? 'Edit Policy Page' : 'Create Policy Page'}
        </h1>

        <div>
          <label className="admin-label mb-2 block">Page Title *</label>
          <input name="title" required defaultValue={initialData?.title} className="admin-input" />
        </div>

        <div>
          <label className="admin-label mb-2 block">Slug *</label>
          <input name="slug" required defaultValue={initialData?.slug} className="admin-input" placeholder="terms" />
        </div>

        <div>
          <label className="admin-label mb-2 block">Short Summary</label>
          <textarea name="summary" defaultValue={initialData?.summary} rows={3} className="admin-input h-auto" />
        </div>

        <div>
          <label className="admin-label mb-2 block">Content *</label>
          <textarea name="content" required defaultValue={initialData?.content} rows={14} className="admin-input h-auto font-mono text-sm" />
        </div>

        <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
          <input type="checkbox" name="isPublished" defaultChecked={initialData?.isPublished ?? true} className="w-4 h-4 text-primary rounded" />
          <span className="font-bold text-sm text-slate-900">Published</span>
        </label>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed" disabled={isSubmitting || !csrfToken}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : initialData ? 'Update Policy' : 'Create Policy'}
          </button>
        </div>
      </div>
    </form>
  );
}
