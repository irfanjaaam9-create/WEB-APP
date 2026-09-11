'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Inbox,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  Package,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Trash2,
  Clock,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

const leadStatuses = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'PROPOSAL_SENT',
  'PAYMENT_PENDING',
  'IN_PROGRESS',
  'COMPLETED',
  'NOT_QUALIFIED',
  'CLOSED',
];

export default function AdminLeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState('');

  const fetchLeadDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`);
      const data = await res.json();
      if (data.lead) {
        setLead(data.lead);
        setStatus(data.lead.status);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchLeadDetail();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setSuccess('');

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, noteContent }),
      });

      const data = await res.json();
      if (data.lead) {
        setLead(data.lead);
        setNoteContent('');
        setSuccess('Lead updated successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      if (res.ok) router.push('/admin/leads');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center text-slate-400 flex items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        <span>Loading lead details...</span>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-16 text-center text-slate-400 space-y-4">
        <h3 className="text-xl font-bold text-white">Lead Not Found</h3>
        <Link href="/admin/leads" className="text-xs text-emerald-400 underline">
          Back to all leads
        </Link>
      </div>
    );
  }

  const whatsAppUrl = getWhatsAppLink(
    `Hello ${lead.fullName}, this is Zahid regarding your sourcing request (${lead.leadId}) for ${
      lead.productName || lead.machineRequired || 'products'
    }.`,
    lead.whatsApp
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Enquiries</span>
        </Link>

        <button
          onClick={handleDelete}
          className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Lead</span>
        </button>
      </div>

      {/* Main Lead Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xl font-extrabold text-emerald-400">{lead.leadId}</span>
              <span className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full font-bold">
                {lead.serviceRequired}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-2">{lead.fullName}</h2>
            {lead.companyName && <p className="text-slate-400 text-sm">{lead.companyName}</p>}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Chat on WhatsApp ({lead.whatsApp})</span>
            </a>
          </div>
        </div>

        {/* Status Update Control */}
        <form onSubmit={handleUpdate} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Current Lead Status:
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
            >
              {leadStatuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {updating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Update Status</span>
          </button>
        </form>

        {success && (
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{success}</span>
          </div>
        )}

        {/* Lead Specs Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Buyer Information */}
          <div className="space-y-3 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" /> Buyer Contact Details
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Full Name:</span>
                <span className="font-semibold text-white">{lead.fullName}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Company Name:</span>
                <span className="font-semibold text-white">{lead.companyName || 'Not specified'}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Email Address:</span>
                <a href={`mailto:${lead.email}`} className="font-semibold text-emerald-400 underline">
                  {lead.email}
                </a>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">WhatsApp / Phone:</span>
                <span className="font-semibold text-white">{lead.whatsApp}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Destination Country:</span>
                <span className="font-semibold text-white">{lead.country}</span>
              </div>
            </div>
          </div>

          {/* Product / Machinery Information */}
          <div className="space-y-3 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-400" /> Sourcing Requirements
            </h3>

            <div className="space-y-2 text-xs">
              {lead.productName && (
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">Target Product:</span>
                  <span className="font-semibold text-white">{lead.productName}</span>
                </div>
              )}
              {lead.machineRequired && (
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">Machine Required:</span>
                  <span className="font-semibold text-amber-400">{lead.machineRequired}</span>
                </div>
              )}
              {lead.quantity && (
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">Expected Quantity:</span>
                  <span className="font-semibold text-white">{lead.quantity}</span>
                </div>
              )}
              {lead.targetBudget && (
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">Target Budget:</span>
                  <span className="font-semibold text-emerald-400">{lead.targetBudget}</span>
                </div>
              )}
              {lead.deliveryDate && (
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">Required Delivery Date:</span>
                  <span className="font-semibold text-white">{lead.deliveryDate}</span>
                </div>
              )}
              {lead.productUrl && (
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500">Reference Product URL:</span>
                  <a
                    href={lead.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 truncate max-w-[200px]"
                  >
                    <span>View Reference Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Machinery Technical Specs Breakdown */}
        {(lead.materialProcessed || lead.outputCapacity || lead.siteLocation || lead.utilities) && (
          <div className="space-y-3 bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Technical Machinery Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              {lead.materialProcessed && (
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Raw Material</span>
                  <span className="text-white font-medium">{lead.materialProcessed}</span>
                </div>
              )}
              {lead.outputCapacity && (
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Output Capacity</span>
                  <span className="text-white font-medium">{lead.outputCapacity}</span>
                </div>
              )}
              {lead.siteLocation && (
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Installation Site</span>
                  <span className="text-white font-medium">{lead.siteLocation}</span>
                </div>
              )}
              {lead.utilities && (
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Available Power / Utilities</span>
                  <span className="text-white font-medium">{lead.utilities}</span>
                </div>
              )}
              {lead.existingEquipment && (
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Existing Line Integration</span>
                  <span className="text-white font-medium">{lead.existingEquipment}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description & Additional Message */}
        {(lead.description || lead.additionalMessage) && (
          <div className="space-y-2 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Additional Message & Notes</h3>
            <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {lead.description || lead.additionalMessage}
            </p>
          </div>
        )}

        {/* Attachment Image Preview */}
        {lead.imageUrl && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Uploaded Reference Image</h3>
            <div className="h-48 w-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img src={lead.imageUrl} alt="Reference Attachment" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Internal Notes Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-400" />
          <span>Internal Action Notes</span>
        </h3>

        <form onSubmit={handleUpdate} className="space-y-3">
          <textarea
            rows={3}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Add internal research note (e.g. Spoke to factory in Guangzhou, quoted $14.50/unit at 500 units)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updating || !noteContent.trim()}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Add Note</span>
            </button>
          </div>
        </form>

        {/* Existing Notes List */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          {lead.internalNotes?.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">No internal notes added yet.</p>
          ) : (
            lead.internalNotes?.map((note: any) => (
              <div key={note.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-emerald-400">{note.author}</span>
                  <span className="text-slate-500">
                    {new Date(note.createdAt).toLocaleString('en-US', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{note.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
