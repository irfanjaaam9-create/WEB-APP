import React from 'react';
import { notFound } from 'next/navigation';
import { getPolicyPageBySlug } from '@/lib/policy-pages';

export default async function CustomPolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = await getPolicyPageBySlug(slug);
  if (!policy) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-8 sm:px-10">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">Policy</span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{policy.title}</h1>
          <p className="mt-3 text-sm text-slate-600">{policy.summary}</p>
        </div>
        <div className="space-y-6 px-6 py-8 text-base leading-8 text-slate-700 sm:px-10 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-slate-900 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-800 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_li]:leading-7 [&_strong]:font-bold [&_strong]:text-slate-900" dangerouslySetInnerHTML={{ __html: policy.content }} />
      </div>
    </div>
  );
}