'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Loader2,
  Trash2,
} from 'lucide-react';

const leadStatuses = [
  'ALL',
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

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let url = '/api/admin/leads?';
      if (selectedStatus !== 'ALL') url += `status=${selectedStatus}&`;
      if (search) url += `q=${encodeURIComponent(search)}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `source_by_zahid_leads_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'QUALIFIED':
      case 'COMPLETED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'CONTACTED':
      case 'IN_PROGRESS':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'PROPOSAL_SENT':
      case 'PAYMENT_PENDING':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'NOT_QUALIFIED':
      case 'CLOSED':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <Inbox className="w-7 h-7 text-emerald-400" />
            <span>Lead & Sourcing Enquiry Management</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Review incoming product and machinery requests from international buyers, track status, add internal notes, and export lead data.
          </p>
        </div>

        <button
          onClick={handleExportJson}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Leads (JSON)</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by Lead ID, Buyer Name, Company, Country, or Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </form>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="text-xs text-slate-400 font-semibold shrink-0">Status:</span>
          {leadStatuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                selectedStatus === st
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading leads database...</span>
        </div>
      ) : leads.length === 0 ? (
        <div className="p-16 text-center bg-slate-900 border border-dashed border-slate-800 rounded-3xl space-y-2">
          <Inbox className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Enquiries Found</h3>
          <p className="text-xs text-slate-400">
            No leads match the current status filter or search parameters.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Lead ID</th>
                  <th className="p-4">Buyer & Company</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Product / Machine</th>
                  <th className="p-4">Service Required</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-emerald-400">{lead.leadId}</td>
                    <td className="p-4 font-semibold text-white">
                      <div>{lead.fullName}</div>
                      {lead.companyName && (
                        <div className="text-[11px] text-slate-400 font-normal">{lead.companyName}</div>
                      )}
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{lead.email}</div>
                    </td>
                    <td className="p-4 text-slate-300 font-medium">{lead.country}</td>
                    <td className="p-4 text-slate-200 font-medium">
                      {lead.productName || lead.machineRequired || 'General Enquiry'}
                    </td>
                    <td className="p-4 text-slate-300">{lead.serviceRequired}</td>
                    <td className="p-4 text-emerald-400 font-semibold">{lead.targetBudget || 'N/A'}</td>
                    <td className="p-4 text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getStatusBadge(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs inline-flex items-center gap-1.5 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage Lead</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
