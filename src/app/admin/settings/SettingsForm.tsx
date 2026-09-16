'use client';

import React, { useEffect, useState } from 'react';
import { updateSiteSettings } from '@/actions/settings';
import { Upload, X, Loader2, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { ensureCsrfToken } from '@/lib/csrf';

interface SettingsFormProps {
  initialData: any;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [heroSlides, setHeroSlides] = useState<any[]>(initialData.heroSlides || []);
  const [navItems, setNavItems] = useState<any[]>(initialData.navItems || [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Cases', href: '/cases' },
    { label: 'Contact', href: '/contact' },
  ]);
  const [footerLinks, setFooterLinks] = useState<any[]>(initialData.footerLinks || [
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Refund Policy', href: '/refund-policy' },
  ]);
  const [logoUrl, setLogoUrl] = useState(initialData.logoUrl || '');
  const [isUploadingSlide, setIsUploadingSlide] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    setCsrfToken(ensureCsrfToken());
  }, []);

  const handleUpload = async (file: File, target: 'logo' | 'slide') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', target === 'logo' ? 'settings' : 'site');

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Upload failed');
    }

    if (target === 'logo') {
      setLogoUrl(data.url);
    } else {
      setHeroSlides((current) => [...current, {
        imageUrl: data.url,
        public_id: data.public_id,
        title: 'New Slide Title',
        subtitle: '',
        ctaText: 'Contact Us',
        ctaLink: '/contact',
        order: current.length,
      }]);
    }
  };

  const handleSlideUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingSlide(true);
    try {
      await handleUpload(file, 'slide');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
    setIsUploadingSlide(false);
    e.target.value = '';
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await handleUpload(file, 'logo');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
    e.target.value = '';
  };

  const removeSlide = (index: number) => {
    setHeroSlides(heroSlides.filter((_, i) => i !== index));
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === heroSlides.length - 1) return;
    
    const newSlides = [...heroSlides];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    [newSlides[index], newSlides[targetIdx]] = [newSlides[targetIdx], newSlides[index]];
    
    // Update order prop
    newSlides.forEach((s, i) => s.order = i);
    setHeroSlides(newSlides);
  };

  const updateSlideProp = (index: number, prop: string, value: string) => {
    const newSlides = [...heroSlides];
    newSlides[index][prop] = value;
    setHeroSlides(newSlides);
  };

  const updateNavItem = (index: number, field: 'label' | 'href', value: string) => {
    const next = [...navItems];
    next[index][field] = value;
    setNavItems(next);
  };

  const updateFooterLink = (index: number, field: 'label' | 'href', value: string) => {
    const next = [...footerLinks];
    next[index][field] = value;
    setFooterLinks(next);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data: any = {
      csrfToken,
      logoUrl,
      homeIntroTitle: formData.get('homeIntroTitle'),
      homeIntroBody: formData.get('homeIntroBody'),
      contactEmail: formData.get('contactEmail'),
      contactPhone: formData.get('contactPhone'),
      whatsapp: formData.get('whatsapp'),
      address: formData.get('address'),
      officeHours: formData.get('officeHours'),
      facebook: formData.get('facebook'),
      linkedin: formData.get('linkedin'),
      youtube: formData.get('youtube'),
      companyName: formData.get('companyName'),
      companyTagline: formData.get('companyTagline'),
      footerText: formData.get('footerText'),
      navItems,
      footerLinks,
      heroSlides,
    };

    const res = await updateSiteSettings(data);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(res.error || 'Failed to save settings');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      
      {success && (
        <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl font-bold">
          Settings saved successfully! Site has been updated.
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold">
          {error}
        </div>
      )}

      {/* Global Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold font-heading mb-4 border-b border-slate-100 pb-2">Global Branding</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="admin-label mb-2 block">Company Logo</label>
            <div className="flex items-center gap-4">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-16 w-16 object-contain rounded-lg border border-slate-200 bg-slate-50" />
              ) : (
                <div className="h-16 w-16 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-xs text-slate-500">Logo</div>
              )}
              <label className="btn-primary text-sm h-10 px-4 cursor-pointer inline-flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload Logo
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>
          </div>
          <div>
            <label className="admin-label mb-2 block">Company Name</label>
            <input name="companyName" defaultValue={initialData.companyName} className="admin-input" />
          </div>
          <div>
            <label className="admin-label mb-2 block">Company Tagline</label>
            <input name="companyTagline" defaultValue={initialData.companyTagline} className="admin-input" />
          </div>
          <div className="md:col-span-2">
            <label className="admin-label mb-2 block">Homepage Intro Title</label>
            <input name="homeIntroTitle" defaultValue={initialData.homeIntroTitle} className="admin-input" />
          </div>
          <div className="md:col-span-2">
            <label className="admin-label mb-2 block">Homepage Intro Body</label>
            <textarea name="homeIntroBody" defaultValue={initialData.homeIntroBody} rows={3} className="admin-input h-auto" />
          </div>
          <div className="md:col-span-2">
            <label className="admin-label mb-2 block">Footer Text</label>
            <input name="footerText" defaultValue={initialData.footerText} className="admin-input" />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold font-heading mb-4 border-b border-slate-100 pb-2">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="admin-label mb-2 block">Contact Email</label>
            <input name="contactEmail" defaultValue={initialData.contactEmail} className="admin-input" />
          </div>
          <div>
            <label className="admin-label mb-2 block">Primary Phone</label>
            <input name="contactPhone" defaultValue={initialData.contactPhone} className="admin-input" />
          </div>
          <div>
            <label className="admin-label mb-2 block">WhatsApp Number (inc. country code)</label>
            <input name="whatsapp" defaultValue={initialData.whatsapp} className="admin-input" />
          </div>
          <div>
            <label className="admin-label mb-2 block">Headquarters Address</label>
            <input name="address" defaultValue={initialData.address} className="admin-input" />
          </div>
          <div className="md:col-span-2">
            <label className="admin-label mb-2 block">Office Hours</label>
            <input name="officeHours" defaultValue={initialData.officeHours} className="admin-input" />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold font-heading mb-4 border-b border-slate-100 pb-2">Social Media Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="admin-label mb-2 block">Facebook URL</label>
            <input name="facebook" defaultValue={initialData.facebook} className="admin-input" />
          </div>
          <div>
            <label className="admin-label mb-2 block">LinkedIn URL</label>
            <input name="linkedin" defaultValue={initialData.linkedin} className="admin-input" />
          </div>
          <div>
            <label className="admin-label mb-2 block">YouTube URL</label>
            <input name="youtube" defaultValue={initialData.youtube} className="admin-input" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold font-heading mb-4 border-b border-slate-100 pb-2">Header Navigation</h2>
        <div className="space-y-3">
          {navItems.map((item, index) => (
            <div key={`${item.label}-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
              <input value={item.label} onChange={(e) => updateNavItem(index, 'label', e.target.value)} className="admin-input" placeholder="Menu label" />
              <input value={item.href} onChange={(e) => updateNavItem(index, 'href', e.target.value)} className="admin-input" placeholder="/contact" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold font-heading mb-4 border-b border-slate-100 pb-2">Footer Links</h2>
        <div className="space-y-3">
          {footerLinks.map((item, index) => (
            <div key={`${item.label}-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
              <input value={item.label} onChange={(e) => updateFooterLink(index, 'label', e.target.value)} className="admin-input" placeholder="Policy name" />
              <input value={item.href} onChange={(e) => updateFooterLink(index, 'href', e.target.value)} className="admin-input" placeholder="/terms" />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Carousel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <h2 className="text-xl font-bold font-heading">Homepage Hero Carousel</h2>
          <label className="btn-primary text-sm h-10 px-4 cursor-pointer inline-flex items-center gap-2">
            {isUploadingSlide ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {isUploadingSlide ? 'Uploading...' : 'Add Slide Image'}
            <input type="file" accept="image/*" onChange={handleSlideUpload} className="hidden" disabled={isUploadingSlide} />
          </label>
        </div>

        {heroSlides.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
            <p className="text-slate-500">No slides configured. The homepage will display a fallback hero.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {heroSlides.map((slide, idx) => (
              <div key={idx} className="flex gap-6 p-4 border border-slate-200 rounded-xl bg-slate-50 relative">
                <div className="w-64 h-36 bg-slate-200 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                  <img src={slide.imageUrl} alt="Slide" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Slide Title</label>
                    <input value={slide.title} onChange={(e) => updateSlideProp(idx, 'title', e.target.value)} className="admin-input h-8 text-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Slide Subtitle</label>
                    <input value={slide.subtitle} onChange={(e) => updateSlideProp(idx, 'subtitle', e.target.value)} className="admin-input h-8 text-sm" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">CTA Text</label>
                      <input value={slide.ctaText} onChange={(e) => updateSlideProp(idx, 'ctaText', e.target.value)} className="admin-input h-8 text-sm" />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">CTA Link</label>
                      <input value={slide.ctaLink} onChange={(e) => updateSlideProp(idx, 'ctaLink', e.target.value)} className="admin-input h-8 text-sm" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-between shrink-0 ml-4 border-l border-slate-200 pl-4">
                  <button type="button" onClick={() => moveSlide(idx, 'up')} disabled={idx === 0} className="p-2 text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400">
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <button type="button" onClick={() => removeSlide(idx)} className="p-2 text-red-400 hover:text-red-600 bg-white rounded-lg shadow-sm border border-slate-200">
                    <X className="w-5 h-5" />
                  </button>
                  <button type="button" onClick={() => moveSlide(idx, 'down')} disabled={idx === heroSlides.length - 1} className="p-2 text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400">
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white/80 backdrop-blur border-t border-slate-200 p-4 rounded-t-xl flex justify-end">
        <button disabled={isSubmitting || !csrfToken} type="submit" className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-4" /> : 'Save All Settings'}
        </button>
      </div>
    </form>
  );
}
