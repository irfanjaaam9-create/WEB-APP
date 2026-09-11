import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: September 2026</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-xs text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Information We Collect</h2>
          <p>
            When you submit a sourcing enquiry form on Source by Zahid, we collect contact information including your full name, company name, email address, WhatsApp number, destination country, product specifications, budget, and attached files.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. How We Use Your Data</h2>
          <p>
            Your information is used solely to evaluate sourcing feasibility, communicate with Chinese suppliers on your behalf, provide service quotes, and manage your procurement project.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">3. Confidentiality & Non-Disclosure</h2>
          <p>
            We treat your product designs, proprietary drawings, and commercial parameters with strict confidentiality. We do not sell or share your personal contact details with third-party marketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">4. Contact Us</h2>
          <p>
            If you have questions regarding your data privacy, contact us at contact@sourcebyzahid.com or via WhatsApp at +86 197 1202 0155.
          </p>
        </section>
      </div>
    </div>
  );
}
