import React from 'react';
import { Box, FileText, MessageSquare, AlertCircle } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import CaseStudy from '@/models/CaseStudy';
import Inquiry from '@/models/Inquiry';
import Link from 'next/link';

export const revalidate = 0; // Always dynamic

export default async function AdminDashboardPage() {
  await connectDB();

  const [totalProducts, publishedProducts, totalCases, publishedCases, newInquiries, totalInquiries] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ isPublished: true }),
    CaseStudy.countDocuments(),
    CaseStudy.countDocuments({ isPublished: true }),
    Inquiry.countDocuments({ status: 'new' }),
    Inquiry.countDocuments(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-black font-heading text-slate-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Products Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Products</p>
            <h3 className="text-3xl font-black text-slate-900">{totalProducts}</h3>
            <p className="text-sm text-slate-500 mt-2">
              <span className="text-green-600 font-bold">{publishedProducts}</span> published
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Box className="w-6 h-6" />
          </div>
        </div>

        {/* Cases Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Project Cases</p>
            <h3 className="text-3xl font-black text-slate-900">{totalCases}</h3>
            <p className="text-sm text-slate-500 mt-2">
              <span className="text-green-600 font-bold">{publishedCases}</span> published
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Inquiries Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Inquiries</p>
            <h3 className="text-3xl font-black text-slate-900">{totalInquiries}</h3>
            <p className="text-sm text-slate-500 mt-2">
              <span className="text-red-500 font-bold">{newInquiries}</span> unread / new
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

      </div>

      {newInquiries > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-orange-900">Action Required</h4>
              <p className="text-sm text-orange-700">You have {newInquiries} new customer inquiries waiting for a response.</p>
            </div>
          </div>
          <Link href="/admin/inquiries" className="btn-primary bg-orange-600 hover:bg-orange-700 focus-visible:outline-orange-600">
            View Inquiries
          </Link>
        </div>
      )}
    </div>
  );
}
