'use client';

import React from 'react';
import { deleteInquiry, updateInquiryStatus } from '@/actions/inquiries';
import { Mail, Phone, Calendar, Building, Package, Trash2 } from 'lucide-react';

interface InquiriesClientProps {
  inquiries: any[];
}

export default function InquiriesClient({ inquiries }: InquiriesClientProps) {
  const handleStatusChange = async (id: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    await updateInquiryStatus(id, newStatus);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this inquiry?')) return;
    await deleteInquiry(id);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {inquiries.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
          <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">No Inquiries</h3>
          <p className="text-slate-500">You don't have any customer inquiries yet.</p>
        </div>
      ) : (
        inquiries.map((inq) => (
          <div key={inq._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            
            {/* Meta Sidebar */}
            <div className="w-full md:w-64 bg-slate-50 p-6 border-b md:border-b-0 md:border-r border-slate-200 shrink-0 space-y-5">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</div>
                <select 
                  value={inq.status}
                  onChange={(e) => handleStatusChange(inq._id, e.target.value as any)}
                  className={`w-full text-sm font-bold rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-primary ${
                    inq.status === 'new' ? 'bg-red-50 text-red-700 border-red-200' :
                    inq.status === 'contacted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-green-50 text-green-700 border-green-200'
                  }`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date Received</div>
                <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {new Date(inq.createdAt).toLocaleDateString()}
                </div>
              </div>

              {inq.productRef && (
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Product Interest</div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <Package className="w-4 h-4 text-slate-400" />
                    {inq.productRef}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="p-6 md:p-8 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 mb-1">{inq.fullName}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <Mail className="w-4 h-4" /> {inq.email}
                    </a>
                    {inq.phone && (
                      <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Phone className="w-4 h-4" /> {inq.phone}
                      </a>
                    )}
                  </div>
                </div>
                {inq.company && (
                  <div className="bg-slate-100 px-4 py-2 rounded-xl flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-bold text-slate-700">{inq.company}</span>
                  </div>
                )}
                <button onClick={() => handleDelete(inq._id)} className="p-2 text-slate-400 hover:text-red-500" title="Delete inquiry"><Trash2 className="w-4 h-4" /></button>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Message Content</div>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  {inq.message}
                </p>
              </div>
            </div>

          </div>
        ))
      )}
    </div>
  );
}
