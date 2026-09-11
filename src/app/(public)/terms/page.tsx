import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Terms & Service Policy</h1>
        <p className="text-xs text-slate-400">Last updated: September 2026</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-xs text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Scope of Service</h2>
          <p>
            Source by Zahid provides dedicated supplier research, quotation comparison, English-Mandarin communication, sample ordering coordination, and local procurement support on the ground in China.
          </p>
        </section>

        <section className="space-y-2 bg-slate-950 p-5 rounded-2xl border border-slate-800">
          <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>2. Distinction Between Service Fees and Third-Party Costs</span>
          </h2>
          <p className="text-white font-semibold">
            Our agreed service fees cover our dedicated research, communication, and coordination work. Service fees DO NOT include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Factory product manufacturing costs</li>
            <li>Tooling / molding / sample production fees</li>
            <li>International air freight, sea freight, or courier shipping</li>
            <li>Customs duties, import taxes, or clearance fees</li>
            <li>Third-party laboratory testing or accredited pre-shipment inspections</li>
            <li>Travel expenses for customized on-site factory visits</li>
          </ul>
          <p className="text-slate-400 pt-1">
            All third-party costs are quoted separately when required and agreed upon before proceeding.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">3. Direct Payment to Suppliers</h2>
          <p>
            For production purchase orders, international buyers maintain direct control. Payments for production orders are remitted directly by your company to the agreed Chinese factory or supplier. All commercial invoices and supply contracts remain between your business and the supplier.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">4. Disclaimers & Responsibilities</h2>
          <p>
            While we research and screen suppliers thoroughly, supplier suitability, technical parameters, pricing stability, and production output capabilities are confirmed directly with the relevant Chinese manufacturer.
          </p>
        </section>
      </div>
    </div>
  );
}
