'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Loader2, X, Pencil, Trash2 } from 'lucide-react';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('General');

  const loadFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/faqs');
      const data = await res.json();
      if (data.faqs) setFaqs(data.faqs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setQuestion('');
    setAnswer('');
    setCategory('General');
  };

  const openCreateModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (faq: any) => {
    setEditingId(faq.id || faq._id || null);
    setQuestion(faq.question || '');
    setAnswer(faq.answer || '');
    setCategory(faq.category || 'General');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;

    try {
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/faqs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, question, answer, category }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Unable to save FAQ');
      }

      resetForm();
      setModalOpen(false);
      loadFaqs();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Unable to save FAQ');
    }
  };

  const handleDelete = async (faqId: string) => {
    if (!faqId) return;
    if (!window.confirm('Delete this FAQ permanently?')) return;

    try {
      const res = await fetch(`/api/admin/faqs?id=${encodeURIComponent(faqId)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Unable to delete FAQ');
      }
      loadFaqs();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Unable to delete FAQ');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-emerald-400" />
            <span>FAQ Content Management</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">Manage public FAQs and service scope questions.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-400 flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading FAQs...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => {
            const faqId = faq.id || faq._id;
            return (
              <div key={faqId} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded-md font-semibold">
                      {faq.category}
                    </span>
                    <h3 className="font-bold text-white text-sm mt-2">{faq.question}</h3>
                    <p className="text-xs text-slate-300 mt-1">{faq.answer}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(faq)} className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(faqId)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">{editingId ? 'Edit FAQ' : 'Add Frequently Asked Question'}</h3>
              <button onClick={() => { resetForm(); setModalOpen(false); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                  placeholder="e.g. Do you inspect factories before production?"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                >
                  <option value="General">General</option>
                  <option value="Packages & Pricing">Packages & Pricing</option>
                  <option value="Machinery">Machinery</option>
                  <option value="Process">Process</option>
                  <option value="Payment & Contract">Payment & Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Answer *</label>
                <textarea
                  required
                  rows={4}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => { resetForm(); setModalOpen(false); }} className="px-4 py-2 text-xs text-slate-400">
                  Cancel
                </button>
                <button type="submit" className="bg-emerald-500 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs">
                  {editingId ? 'Update FAQ' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
