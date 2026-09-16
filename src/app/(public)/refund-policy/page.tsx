import React from 'react';
import { getPolicyPageBySlug } from '@/lib/policy-pages';

const fallbackRefund = `
  <h2>1. Initial Review</h2>
  <p>No payment is required for a preliminary feasibility review. We assess your requirement and confirm scope before moving forward.</p>
  <h2>2. Service Fees</h2>
  <p>Service fees cover research and coordination work. Refund eligibility depends on work completed and the agreed commercial scope.</p>
  <h2>3. Supplier and Third-Party Costs</h2>
  <p>Any producer, courier, inspection, or shipping charges are separate and subject to the supplier or provider's own cancellation rules.</p>
  <h2>4. Contact</h2>
  <p>If an issue arises, contact our team immediately with the order details and the agreed project scope.</p>
`;

export default async function RefundPolicyPage() {
  const policy = await getPolicyPageBySlug('refund-policy');
  const title = policy?.title || 'Refund & Cancellation Policy';
  const summary = policy?.summary || 'Last updated: September 2026';
  const content = policy?.content || fallbackRefund;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-8 sm:px-10">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">
            Policy
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-slate-600">{summary}</p>
        </div>

        <div
          className="space-y-6 px-6 py-8 text-base leading-8 text-slate-700 sm:px-10 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-slate-900 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-800 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_li]:leading-7 [&_strong]:font-bold [&_strong]:text-slate-900"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
