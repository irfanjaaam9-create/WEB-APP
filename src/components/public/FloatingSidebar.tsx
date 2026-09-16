'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, X } from 'lucide-react';
import { submitInquiry } from '@/actions/inquiries';

interface FloatingSidebarProps {
  settings: any;
}

export default function FloatingSidebar({ settings }: FloatingSidebarProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const whatsappLink = `https://wa.me/${(settings?.whatsapp || '').replace(/[^0-9]/g, '')}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await submitInquiry(data);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        setIsFormOpen(false);
        setSuccess(false);
      }, 3000);
    } else {
      setError(res.error || 'Failed to submit inquiry.');
    }
    setIsSubmitting(false);
  }

  return (
    <>
      {/* Sidebar Buttons */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        <a 
          href={whatsappLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-l-xl shadow-lg hover:w-14 transition-all"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp
          </span>
        </a>
        
        <button 
          onClick={() => setIsFormOpen(true)}
          className="group relative flex items-center justify-center w-12 h-12 bg-primary text-white rounded-l-xl shadow-lg hover:w-14 transition-all"
        >
          <Mail className="w-6 h-6" />
          <span className="absolute right-full mr-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Send Inquiry
          </span>
        </button>
      </div>

      {/* Inquiry Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">Request a Quote</h3>
              <p className="text-sm text-slate-500 mb-6">Fill out the form below and our sales team will contact you shortly.</p>
              
              {success ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-center">
                  <p className="font-bold mb-1">Message Sent!</p>
                  <p className="text-sm">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  
                  <div>
                    <input name="fullName" required placeholder="Your Name *" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <input name="email" type="email" required placeholder="Email Address *" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <input name="phone" placeholder="Phone Number (Optional)" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <textarea name="message" required placeholder="Your Message *" rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full btn-primary">
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
