import React from 'react';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';
import { deleteCaseStudy } from '@/actions/cases';

export const revalidate = 0;

export default async function AdminCasesPage() {
  await connectDB();
  const cases = await CaseStudy.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black font-heading text-slate-900">Project Cases</h1>
        {/* We stub the New Case functionality since a full WYSIWYG would be needed for content */}
        <button className="btn-primary flex items-center gap-2 opacity-50 cursor-not-allowed" title="Requires rich text editor implementation">
          New Case Study
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Project Case</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Location / Client</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {cases.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-500">
                  No project cases found.
                </td>
              </tr>
            ) : (
              cases.map((cs: any) => (
                <tr key={cs._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                        <img 
                          src={cs.images?.[0]?.url || 'https://via.placeholder.com/150?text=No+Img'} 
                          alt={cs.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{cs.title}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{cs.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-bold text-slate-700">{cs.location}</div>
                    <div className="text-xs text-slate-500">{cs.clientName}</div>
                  </td>
                  <td className="py-4 px-6">
                    {cs.isPublished ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <CheckCircle className="w-3.5 h-3.5" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                        <XCircle className="w-3.5 h-3.5" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <form action={async () => {
                        'use server';
                        await deleteCaseStudy(cs._id);
                      }}>
                        <button 
                          type="submit"
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={(e) => {
                            if(!confirm('Are you sure you want to delete this case study?')) e.preventDefault();
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
