'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { submitInquiry } from '@/actions/inquiries';
import { useSearchParams } from 'next/navigation';

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" /> }>
      <ContactPageContent />
    </Suspense>
  );
}

function ContactPageContent() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    contactPhone2: '',
    whatsapp: '',
    address: '',
    officeHours: '',
  });

  useEffect(() => {
    fetch('/api/site-settings')
      .then((response) => response.json())
      .then((data) => setSettings((current) => ({ ...current, ...data })))
      .catch(() => undefined);
  }, []);

  const initialProduct = searchParams.get('product') || searchParams.get('interest') || '';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await submitInquiry(data);
    if (res.success) {
      setSuccess(true);
      e.currentTarget.reset();
    } else {
      setError(res.error || 'Failed to submit inquiry.');
    }
    setIsSubmitting(false);
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-heading text-slate-900 mb-6">
            Contact {settings.companyName || 'Our Team'}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get in touch with our experts for product inquiries, project consultations, or technical support.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Contact Info */}
            <div className="p-8 md:p-12 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10">
                <h2 className="text-3xl font-black font-heading mb-8">Get In Touch</h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold font-heading mb-1 text-slate-200">Headquarters</h4>
                      <p className="text-slate-400">{settings.address || 'Address available upon inquiry'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold font-heading mb-1 text-slate-200">Phone / WhatsApp</h4>
                      <p className="text-slate-400">{settings.contactPhone || settings.whatsapp || 'Phone available upon inquiry'}</p>
                      {settings.contactPhone2 && <p className="text-slate-400">{settings.contactPhone2}</p>}
                      {settings.officeHours && <p className="text-slate-400 mt-1 text-sm">{settings.officeHours}</p>}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold font-heading mb-1 text-slate-200">Email</h4>
                      <p className="text-slate-400">{settings.contactEmail || 'Email available upon inquiry'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-black font-heading text-slate-900 mb-2">Send us a message</h3>
              <p className="text-slate-500 mb-8">Fill out the form below and we will reply within 12 hours.</p>

              {success ? (
                <div className="bg-green-50 text-green-700 p-8 rounded-2xl border border-green-200 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 font-heading">Inquiry Submitted Successfully!</h4>
                  <p className="text-green-600/80">Thank you for contacting ZOY Medical Technology. Our sales engineer will be in touch with you shortly.</p>
                  <button onClick={() => setSuccess(false)} className="mt-6 btn-outline text-green-700 border-green-200 hover:bg-green-100">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && <div className="text-red-500 text-sm p-3 bg-red-50 border border-red-200 rounded-lg">{error}</div>}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name *</label>
                      <input name="fullName" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address *</label>
                      <input name="email" type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                      <input name="phone" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
                      <input name="company" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Interest</label>
                    <input name="productRef" defaultValue={initialProduct} placeholder="e.g. PSA Oxygen Generator" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Requirements *</label>
                    <textarea name="message" required rows={5} placeholder="Please describe your project needs, required capacity, purity, or any other specifications..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"></textarea>
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full btn-primary py-4 text-base">
                    {isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
