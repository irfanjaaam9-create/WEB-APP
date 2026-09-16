'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCaseStudy, updateCaseStudy } from '@/actions/cases';
import { ensureCsrfToken } from '@/lib/csrf';

interface CaseFormProps {
  initialData?: any;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export default function CaseForm({ initialData }: CaseFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function submit(formData: FormData) {
    setSubmitting(true);
    setError('');
    const title = String(formData.get('title') || '').trim();
    const data = {
      csrfToken: ensureCsrfToken(),
      title,
      slug: initialData?.slug || `${slugify(title)}-${Date.now()}`,
      clientName: String(formData.get('clientName') || '').trim(),
      location: String(formData.get('location') || '').trim(),
      productCategory: String(formData.get('productCategory') || '').trim(),
      excerpt: String(formData.get('excerpt') || '').trim(),
      content: String(formData.get('content') || '').trim(),
      isPublished: formData.get('isPublished') === 'on',
    };
    const result = initialData ? await updateCaseStudy(initialData._id, data) : await createCaseStudy(data);
    if (result.success) router.push('/admin/cases');
    else {
      setError(result.error || 'Unable to save case study');
      setSubmitting(false);
    }
  }

  return (
    <form action={submit} className="max-w-3xl space-y-6">
      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">{error}</div>}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <h1 className="text-2xl font-black font-heading text-slate-900">{initialData ? 'Edit Case Study' : 'New Case Study'}</h1>
        <input name="title" required defaultValue={initialData?.title} placeholder="Case study title" className="admin-input" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="clientName" required defaultValue={initialData?.clientName} placeholder="Client name" className="admin-input" />
          <input name="location" required defaultValue={initialData?.location} placeholder="Client country or location" className="admin-input" />
        </div>
        <input name="productCategory" defaultValue={initialData?.productCategory} placeholder="Product category" className="admin-input" />
        <textarea name="excerpt" required defaultValue={initialData?.excerpt} rows={3} placeholder="Short summary" className="admin-input h-auto" />
        <textarea name="content" required defaultValue={initialData?.content} rows={10} placeholder="Full case study content" className="admin-input h-auto" />
        <label className="flex items-center gap-3 text-sm font-semibold text-slate-700"><input type="checkbox" name="isPublished" defaultChecked={initialData?.isPublished ?? true} /> Publish on the public site</label>
        <button disabled={submitting} className="btn-primary disabled:opacity-50">{submitting ? 'Saving...' : 'Save Case Study'}</button>
      </div>
    </form>
  );
}
