'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Edit, CheckCircle, Loader2, Save, X } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [priceUsd, setPriceUsd] = useState<number | string>('');
  const [priceSuffix, setPriceSuffix] = useState('');
  const [saving, setSaving] = useState(false);

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const startEdit = (pkg: any) => {
    setEditingId(pkg.id);
    setPriceUsd(pkg.priceUsd !== null ? pkg.priceUsd : '');
    setPriceSuffix(pkg.priceSuffix || '');
  };

  const handleSave = async (pkg: any) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pkg.id,
          title: pkg.title,
          priceUsd: pkg.isCustomQuote ? null : parseFloat(String(priceUsd)),
          isCustomQuote: pkg.isCustomQuote,
          priceSuffix,
          badge: pkg.badge,
          features: pkg.features,
          ctaText: pkg.ctaText,
          orderIndex: pkg.orderIndex,
        }),
      });

      if (res.ok) {
        setEditingId(null);
        loadServices();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
          <DollarSign className="w-7 h-7 text-emerald-400" />
          <span>Service Packages & Pricing Management</span>
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Edit launch service package rates ($49 Starter, $149 Plus, $99 Samples, $35 Supplier Call, Custom Quotes). All changes reflect instantly across the public site.
        </p>
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-400 flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading pricing packages...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((pkg) => {
            let features: string[] = [];
            try {
              features = typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features || [];
            } catch {
              features = [];
            }

            const isEditing = editingId === pkg.id;

            return (
              <div
                key={pkg.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                {pkg.badge && (
                  <span className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{pkg.title}</h3>

                  {isEditing ? (
                    <div className="mt-3 space-y-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                      <div>
                        <label className="text-[10px] text-slate-400 font-semibold uppercase">Price USD</label>
                        <input
                          type="number"
                          value={priceUsd}
                          onChange={(e) => setPriceUsd(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                          placeholder="49"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-semibold uppercase">Display Suffix</label>
                        <input
                          type="text"
                          value={priceSuffix}
                          onChange={(e) => setPriceSuffix(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                          placeholder="US$49"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleSave(pkg)}
                          disabled={saving}
                          className="flex-1 bg-emerald-500 text-slate-950 font-bold py-1.5 text-xs rounded-lg flex items-center justify-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" /> Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 bg-slate-800 text-slate-400 text-xs rounded-lg"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white">{pkg.priceSuffix || `US$${pkg.priceUsd}`}</span>
                      <button
                        onClick={() => startEdit(pkg)}
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400"
                        title="Edit Price"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <ul className="mt-5 space-y-2 text-xs text-slate-300">
                    {features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800 text-center">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    CTA Button: {pkg.ctaText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
