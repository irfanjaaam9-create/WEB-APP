import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import InquiriesClient from './InquiriesClient';

export const revalidate = 0;

export default async function AdminInquiriesPage() {
  await connectDB();
  const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black font-heading text-slate-900">Customer Inquiries</h1>
      </div>

      <InquiriesClient inquiries={JSON.parse(JSON.stringify(inquiries))} />
    </div>
  );
}
