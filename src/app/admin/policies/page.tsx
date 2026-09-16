import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getAllPolicyPages } from '@/lib/policy-pages';
import { deletePolicyPage } from '@/actions/policies';

export default async function AdminPoliciesPage() {
  const pages = await getAllPolicyPages();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black font-heading text-slate-900">Policy Pages</h1>
        <Link href="/admin/policies/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Policy
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Slug</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {pages.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-500">
                  No policy pages found. Click "New Policy" to create one.
                </td>
              </tr>
            ) : (
              pages.map((page: any) => (
                <tr key={page._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{page.title}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">/{page.slug}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${page.isPublished ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      {page.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/policies/${page._id}/edit`} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={async () => {
                        'use server';
                        await deletePolicyPage(page._id);
                      }}>
                        <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={(e) => {
                          if (!confirm('Delete this policy page?')) e.preventDefault();
                        }}>
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
