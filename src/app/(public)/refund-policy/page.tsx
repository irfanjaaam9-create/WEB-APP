import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Refund & Cancellation Policy</h1>
        <p className="text-xs text-slate-400">Last updated: September 2026</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-xs text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Initial Feasibility Review</h2>
          <p>
            No payment is requested when you submit a product sourcing request. We review your specifications and confirm feasibility before agreeing on scope and service fee.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Service Fee Refunds</h2>
          <p>
            Service fees cover our dedicated labor, research, and communication work. If after initial research we are unable to identify suitable Chinese suppliers meeting your agreed parameters, we will notify you before initiating further work.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">3. Third-Party Costs & Supplier Orders</h2>
          <p>
            Payments made directly to Chinese factories, sample fees, courier charges, or third-party inspection agencies are subject to the respective supplier or provider’s cancellation terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">4. Contact For Support</h2>
          <p>
            For questions regarding service scope adjustments or order inquiries, contact Zahid via email at contact@sourcebyzahid.com or WhatsApp at +86 197 1202 0155.
          </p>
        </section>
      </div>
    </div>
  );
}
