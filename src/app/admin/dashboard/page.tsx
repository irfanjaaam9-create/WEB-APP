'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Package,
  FolderGit2,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  MessageSquare,
  Cog,
  Loader2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    productsCount: 0,
    projectsCount: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) {
          const leads = data.leads;
          setRecentLeads(leads.slice(0, 5));
          setStats({
            totalLeads: leads.length,
            newLeads: leads.filter((l: any) => l.status === 'NEW').length,
            qualifiedLeads: leads.filter((l: any) => l.status === 'QUALIFIED').length,
            productsCount: 6,
            projectsCount: 3,
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active On-Ground Operations in China
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, Zahid
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Here is your live procurement dashboard. Track buyer enquiries, add products, manage machinery listings, and update service pricing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Link
            href="/admin/products"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/admin/leads"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-all"
          >
            <Inbox className="w-4 h-4 text-emerald-400" />
            <span>View All Enquiries</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Enquiries</p>
            <h3 className="text-3xl font-bold text-white mt-1">{stats.newLeads}</h3>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Requires Initial Review
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Qualified Leads</p>
            <h3 className="text-3xl font-bold text-white mt-1">{stats.qualifiedLeads}</h3>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Ready for Supplier Research
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Enquiries</p>
            <h3 className="text-3xl font-bold text-white mt-1">{stats.totalLeads}</h3>
            <p className="text-[11px] text-slate-400 mt-1">All time sourcing submissions</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Machinery Categories</p>
            <h3 className="text-3xl font-bold text-white mt-1">3</h3>
            <p className="text-[11px] text-amber-400 mt-1">Pallet, Pellet & Roll-Forming</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Cog className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Buyer Sourcing Enquiries</h3>
            <p className="text-xs text-slate-400">Incoming inquiries from international buyers requiring response</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
            <span>Loading recent leads...</span>
          </div>
        ) : recentLeads.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm">
            No incoming leads recorded yet. Submissions from the website forms will appear here automatically.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Lead ID</th>
                  <th className="p-3.5">Buyer Name</th>
                  <th className="p-3.5">Country</th>
                  <th className="p-3.5">Product / Machinery</th>
                  <th className="p-3.5">Service</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-mono text-emerald-400 font-semibold">{lead.leadId}</td>
                    <td className="p-3.5 font-semibold text-white">
                      {lead.fullName}
                      {lead.companyName && (
                        <div className="text-[11px] text-slate-400 font-normal">{lead.companyName}</div>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-300">{lead.country}</td>
                    <td className="p-3.5 text-slate-200">
                      {lead.productName || lead.machineRequired || 'General Request'}
                    </td>
                    <td className="p-3.5 text-slate-300">{lead.serviceRequired}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          lead.status === 'NEW'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : lead.status === 'QUALIFIED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium text-xs transition-all"
                      >
                        Review Lead
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
