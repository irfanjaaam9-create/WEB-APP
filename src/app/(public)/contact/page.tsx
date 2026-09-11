'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Send,
  Upload,
  Loader2,
  Package,
  Cog,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

const countriesList = [
  'Australia', 'United States', 'Canada', 'United Kingdom', 'Poland', 'Germany',
  'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'New Zealand',
  'India', 'Pakistan', 'Bangladesh', 'Nepal', 'Afghanistan',
  'United Arab Emirates', 'Saudi Arabia', 'South Africa', 'Mexico', 'Brazil', 'Other Country',
];

const serviceOptions = [
  'Supplier Research', 'Supplier Comparison', 'Samples Coordination',
  'Supplier Call (English-Mandarin)', 'Price Negotiation', 'Machinery Sourcing',
  'Factory Visit Support', 'Order Coordination', 'Other Scope',
];

function ContactFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialService = searchParams?.get('service') || 'Supplier Research';
  const initialProduct = searchParams?.get('product') || '';
  const initialMachinery = searchParams?.get('machinery') || '';

  const [activeTab, setActiveTab] = useState<'product' | 'machinery'>(
    initialMachinery ? 'machinery' : 'product'
  );

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [country, setCountry] = useState('Australia');
  const [productName, setProductName] = useState(initialProduct);
  const [productUrl, setProductUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [targetBudget, setTargetBudget] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [serviceRequired, setServiceRequired] = useState(initialService);
  const [needCustomization, setNeedCustomization] = useState(false);
  const [privateLabeling, setPrivateLabeling] = useState(false);
  const [machineRequired, setMachineRequired] = useState(
    initialMachinery ? `${initialMachinery} Machinery` : 'Pallet-Making Line'
  );
  const [materialProcessed, setMaterialProcessed] = useState('');
  const [outputCapacity, setOutputCapacity] = useState('');
  const [finishedSpecs, setFinishedSpecs] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [utilities, setUtilities] = useState('380V / 50Hz 3-Phase');
  const [existingEquipment, setExistingEquipment] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Upload failed');
      setImageUrl(data.url);
    } catch (err: any) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !whatsApp || !country) {
      setError('Please fill in your name, email, WhatsApp number, and country.');
      return;
    }
    setSubmitting(true);
    setError('');
    const payload = {
      fullName, companyName, email, whatsApp, country,
      productName: activeTab === 'product' ? productName : null,
      productUrl: activeTab === 'product' ? productUrl : null,
      imageUrl: activeTab === 'product' ? imageUrl : null,
      description: activeTab === 'product' ? description : null,
      quantity: activeTab === 'product' ? quantity : null,
      targetBudget,
      deliveryDate: activeTab === 'product' ? deliveryDate : null,
      destinationCountry: country,
      machineRequired: activeTab === 'machinery' ? machineRequired : null,
      materialProcessed: activeTab === 'machinery' ? materialProcessed : null,
      outputCapacity: activeTab === 'machinery' ? outputCapacity : null,
      finishedSpecs: activeTab === 'machinery' ? finishedSpecs : null,
      siteLocation: activeTab === 'machinery' ? siteLocation : null,
      utilities: activeTab === 'machinery' ? utilities : null,
      existingEquipment: activeTab === 'machinery' ? existingEquipment : null,
      serviceRequired: activeTab === 'machinery' ? 'Machinery Sourcing' : serviceRequired,
      needCustomization, privateLabeling, additionalMessage,
    };
    try {
      const res = await fetch('/api/submit-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to submit');
      router.push(`/thank-you?leadId=${encodeURIComponent(data.leadId)}`);
    } catch (err: any) {
      setError(err.message || 'Submission error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = getWhatsAppLink();

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#fff',
    border: '1px solid #d6d3d1',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#1c1917',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#57534e',
    marginBottom: '6px',
  };

  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#a8a29e',
    borderBottom: '1px solid #e7e5e4',
    paddingBottom: '10px',
    marginBottom: '16px',
  };

  return (
    <div style={{ paddingTop: '60px', background: '#f5f5f4', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '40px 0 36px' }}>
        <div className="container-xl">
          <span style={{
            fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.08em', color: '#1d4ed8', display: 'block', marginBottom: '10px',
          }}>
            Sourcing Enquiry
          </span>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: '#1c1917',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '10px',
          }}>
            Send Your Product Request
          </h1>
          <p style={{ fontSize: '15px', color: '#78716c', maxWidth: '520px', lineHeight: 1.6 }}>
            Tell us what you need. We review your requirements and confirm whether we can help — before requesting any payment.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-xl" style={{ padding: '40px 1.5rem', display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'minmax(0,1fr)' }} className="contact-grid">

          {/* ── Form ── */}
          <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '28px' }}>

            {/* Tab Switcher */}
            <div style={{
              display: 'flex', gap: '4px', padding: '4px',
              background: '#f5f5f4', borderRadius: '10px', marginBottom: '28px',
              border: '1px solid #e7e5e4',
            }}>
              <button
                type="button"
                onClick={() => setActiveTab('product')}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '7px', padding: '10px 16px', borderRadius: '7px', border: 'none',
                  cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                  background: activeTab === 'product' ? '#fff' : 'transparent',
                  color: activeTab === 'product' ? '#1c1917' : '#78716c',
                  boxShadow: activeTab === 'product' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                }}
              >
                <Package size={15} />
                Consumer Products
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('machinery')}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '7px', padding: '10px 16px', borderRadius: '7px', border: 'none',
                  cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                  background: activeTab === 'machinery' ? '#fff' : 'transparent',
                  color: activeTab === 'machinery' ? '#1c1917' : '#78716c',
                  boxShadow: activeTab === 'machinery' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                }}
              >
                <Cog size={15} />
                Industrial Machinery
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                padding: '12px 14px', background: '#fef2f2',
                border: '1px solid #fecaca', borderRadius: '8px', marginBottom: '20px',
              }}>
                <AlertCircle size={15} style={{ color: '#dc2626', flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontSize: '13px', color: '#dc2626', margin: 0 }}>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Section 1: Contact Info */}
              <div>
                <p style={sectionHeaderStyle}>1. Your Contact Information</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
                      style={inputStyle} placeholder="John Doe" />
                  </div>
                  <div>
                    <label style={labelStyle}>Company Name</label>
                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}
                      style={inputStyle} placeholder="Import Trading Co." />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      style={inputStyle} placeholder="john@company.com" />
                  </div>
                  <div>
                    <label style={labelStyle}>WhatsApp / Phone *</label>
                    <input type="text" required value={whatsApp} onChange={e => setWhatsApp(e.target.value)}
                      style={inputStyle} placeholder="+61 400 000 000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Your Country *</label>
                    <select value={country} onChange={e => setCountry(e.target.value)} style={inputStyle}>
                      {countriesList.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Product or Machinery */}
              {activeTab === 'product' ? (
                <div>
                  <p style={sectionHeaderStyle}>2. Product Requirements</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                      <div>
                        <label style={labelStyle}>Product Name *</label>
                        <input type="text" required value={productName} onChange={e => setProductName(e.target.value)}
                          style={inputStyle} placeholder="e.g. Tactical Backpack / Leather Handbag" />
                      </div>
                      <div>
                        <label style={labelStyle}>Reference URL (Alibaba / Amazon)</label>
                        <input type="url" value={productUrl} onChange={e => setProductUrl(e.target.value)}
                          style={inputStyle} placeholder="https://..." />
                      </div>
                      <div>
                        <label style={labelStyle}>Order Quantity</label>
                        <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)}
                          style={inputStyle} placeholder="e.g. 500 units" />
                      </div>
                      <div>
                        <label style={labelStyle}>Target Budget (USD)</label>
                        <input type="text" value={targetBudget} onChange={e => setTargetBudget(e.target.value)}
                          style={inputStyle} placeholder="e.g. $5,000–$10,000" />
                      </div>
                      <div>
                        <label style={labelStyle}>Delivery Date</label>
                        <input type="text" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)}
                          style={inputStyle} placeholder="e.g. Q4 2026" />
                      </div>
                      <div>
                        <label style={labelStyle}>Service Required</label>
                        <select value={serviceRequired} onChange={e => setServiceRequired(e.target.value)} style={inputStyle}>
                          {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Product Specifications & Notes</label>
                      <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)}
                        style={{ ...inputStyle, resize: 'vertical' as const }}
                        placeholder="Describe material type, dimensions, colors, custom packaging requirements..." />
                    </div>

                    {/* Upload */}
                    <div>
                      <label style={labelStyle}>Upload Product Photo / Drawing</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <label style={{
                          display: 'inline-flex', alignItems: 'center', gap: '7px',
                          padding: '9px 16px', background: '#f5f5f4', border: '1px solid #d6d3d1',
                          borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#57534e',
                          cursor: 'pointer',
                        }}>
                          {uploading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={14} />}
                          {uploading ? 'Uploading...' : 'Attach Image'}
                          <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} style={{ display: 'none' }} />
                        </label>
                        {imageUrl && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#15803d', fontWeight: 500 }}>
                            <CheckCircle size={14} /> Uploaded
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#57534e', cursor: 'pointer' }}>
                        <input type="checkbox" checked={needCustomization} onChange={e => setNeedCustomization(e.target.checked)}
                          style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: '#1d4ed8' }} />
                        Custom Engineering / Specs Required
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#57534e', cursor: 'pointer' }}>
                        <input type="checkbox" checked={privateLabeling} onChange={e => setPrivateLabeling(e.target.checked)}
                          style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: '#1d4ed8' }} />
                        Private Label / Logo Branding
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ ...sectionHeaderStyle, color: '#b45309' }}>2. Machinery Technical Parameters</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={labelStyle}>Machine Required *</label>
                      <select value={machineRequired} onChange={e => setMachineRequired(e.target.value)} style={inputStyle}>
                        <option>Pallet-Making Machinery Line</option>
                        <option>Biomass Pellet Equipment Line</option>
                        <option>Roll-Forming Machines Line</option>
                        <option>Other Industrial Equipment</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Raw Material Processed</label>
                      <input type="text" value={materialProcessed} onChange={e => setMaterialProcessed(e.target.value)}
                        style={inputStyle} placeholder="e.g. Sawdust, GI Steel Coil" />
                    </div>
                    <div>
                      <label style={labelStyle}>Required Output / Capacity</label>
                      <input type="text" value={outputCapacity} onChange={e => setOutputCapacity(e.target.value)}
                        style={inputStyle} placeholder="e.g. 2 tons/hr" />
                    </div>
                    <div>
                      <label style={labelStyle}>Power / Utilities Available</label>
                      <input type="text" value={utilities} onChange={e => setUtilities(e.target.value)}
                        style={inputStyle} placeholder="e.g. 380V / 50Hz 3-Phase" />
                    </div>
                    <div>
                      <label style={labelStyle}>Installation Site / Port</label>
                      <input type="text" value={siteLocation} onChange={e => setSiteLocation(e.target.value)}
                        style={inputStyle} placeholder="City / Port Location" />
                    </div>
                    <div>
                      <label style={labelStyle}>Project Budget (USD)</label>
                      <input type="text" value={targetBudget} onChange={e => setTargetBudget(e.target.value)}
                        style={inputStyle} placeholder="e.g. $25,000–$80,000" />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Finished Product Specs & Drawings</label>
                      <textarea rows={4} value={finishedSpecs} onChange={e => setFinishedSpecs(e.target.value)}
                        style={{ ...inputStyle, resize: 'vertical' as const }}
                        placeholder="Pallet dimensions, pellet diameter (6mm/8mm), metal profile drawings..." />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit */}
              <div style={{ borderTop: '1px solid #e7e5e4', paddingTop: '20px' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%', padding: '14px', borderRadius: '8px', border: 'none',
                    background: submitting ? '#94a3b8' : '#1d4ed8',
                    color: '#fff', fontWeight: 700, fontSize: '14px',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'background 0.15s ease',
                    fontFamily: 'inherit',
                  }}
                >
                  {submitting ? (
                    <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Submitting...</>
                  ) : (
                    <><Send size={16} />{activeTab === 'machinery' ? 'Discuss Machinery Requirement' : 'Send My Product Request'}</>
                  )}
                </button>
                <div style={{
                  marginTop: '12px', padding: '12px 14px',
                  background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px',
                  display: 'flex', alignItems: 'flex-start', gap: '8px',
                }}>
                  <ShieldCheck size={14} style={{ color: '#15803d', flexShrink: 0, marginTop: '1px' }} />
                  <p style={{ fontSize: '12px', color: '#15803d', margin: 0, lineHeight: 1.5 }}>
                    We review your requirements and confirm whether we can help before requesting any payment.
                  </p>
                </div>
              </div>

            </form>
          </div>

          {/* ── Sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="contact-sidebar">

            <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#1c1917', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                Direct Contact
              </h3>
              <p style={{ fontSize: '13px', color: '#78716c', marginBottom: '18px', lineHeight: 1.6 }}>
                Prefer immediate chat? Contact Zahid directly on WhatsApp for urgent requirements.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '12px 14px', background: '#f0fdf4',
                    border: '1px solid #bbf7d0', borderRadius: '8px',
                    fontSize: '13px', fontWeight: 600, color: '#15803d', textDecoration: 'none',
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                  +86 197 1202 0155
                </a>
                <a
                  href="mailto:contact@sourcebyzahid.com"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '12px 14px', background: '#fafaf9',
                    border: '1px solid #e7e5e4', borderRadius: '8px',
                    fontSize: '13px', color: '#57534e', textDecoration: 'none',
                  }}
                >
                  <Mail size={14} style={{ color: '#a8a29e' }} />
                  contact@sourcebyzahid.com
                </a>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '9px',
                  padding: '12px 14px',
                  fontSize: '13px', color: '#78716c',
                }}>
                  <MapPin size={14} style={{ color: '#a8a29e' }} />
                  Guangzhou & Yiwu, China
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '14px', color: '#1c1917', marginBottom: '14px', letterSpacing: '-0.01em' }}>
                What Happens Next?
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { n: '1', text: 'We review your request within 1 business day' },
                  { n: '2', text: 'We confirm if we can help and outline scope' },
                  { n: '3', text: 'You approve scope & fee before work begins' },
                  { n: '4', text: 'We start supplier research and report back' },
                ].map(step => (
                  <div key={step.n} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '6px',
                      background: '#eff6ff', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '11px', fontWeight: 700,
                      color: '#1d4ed8', flexShrink: 0,
                    }}>{step.n}</div>
                    <p style={{ fontSize: '13px', color: '#57534e', lineHeight: 1.5, margin: 0 }}>{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: minmax(0, 1fr) 320px !important;
            align-items: start;
          }
          .contact-sidebar {
            position: sticky;
            top: 80px;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={24} style={{ color: '#a8a29e', animation: 'spin 1s linear infinite' }} />
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  );
}
