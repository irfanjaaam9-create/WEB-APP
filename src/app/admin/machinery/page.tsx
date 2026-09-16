'use client';

import React, { useState, useEffect } from 'react';
import { Cog, Plus, Edit, Trash2, Loader2, CheckCircle, X, Upload } from 'lucide-react';

export default function AdminMachineryPage() {
  const [machineryCategories, setMachineryCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [overview, setOverview] = useState('');
  const [applications, setApplications] = useState('');
  const [outputCapacity, setOutputCapacity] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/machinery');
      const data = await res.json();
      if (data.machineryCategories) setMachineryCategories(data.machineryCategories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteMachine = async (id: string) => {
    if (!window.confirm('Delete this machine model?')) return;
    const response = await fetch(`/api/admin/machinery?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (response.ok) loadData();
  };

  const openModal = (catId?: string) => {
    setName('');
    setCategoryId(catId || machineryCategories[0]?.id || '');
    setOverview('');
    setApplications('');
    setOutputCapacity('');
    setSpecifications('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !categoryId || !overview) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/machinery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          categoryId,
          overview,
          applications,
          outputCapacity,
          specifications,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <Cog className="w-7 h-7 text-amber-400" />
            <span>Machinery Sourcing Management</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Manage machinery lines (Pallet-Making, Biomass Pellet, and Roll-Forming equipment).
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Machine Model</span>
        </button>
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-400 flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
          <span>Loading machinery catalog...</span>
        </div>
      ) : (
        <div className="space-y-8">
          {machineryCategories.map((mcat) => (
            <div key={mcat.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{mcat.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-3xl">{mcat.overview}</p>
                </div>
                <button
                  onClick={() => openModal(mcat.id)}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Model</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mcat.machinery?.length === 0 ? (
                  <div className="col-span-2 p-6 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500 text-xs">
                    No machine models added under {mcat.name} yet.
                  </div>
                ) : (
                  mcat.machinery?.map((mach: any) => (
                    <div key={mach.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm">{mach.name}</h4>
                        <button onClick={() => deleteMachine(mach.id)} className="text-slate-400 hover:text-red-400" title="Delete machine"><Trash2 className="w-4 h-4" /></button>
                        <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
                          {mach.outputCapacity || 'Industrial'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{mach.overview}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Industrial Machine Specification</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Machine Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                  placeholder="e.g. Automatic Molded Wood Pallet Press Line"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Machinery Category *</label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                >
                  {machineryCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Output / Production Capacity</label>
                <input
                  type="text"
                  value={outputCapacity}
                  onChange={(e) => setOutputCapacity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                  placeholder="e.g. 300 - 800 pallets / 8-hour shift"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Overview & Technical Parameters *</label>
                <textarea
                  required
                  rows={4}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                  placeholder="Technical specs, hydraulic pressure, power ratings, raw material inputs..."
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-amber-500 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Machine</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
