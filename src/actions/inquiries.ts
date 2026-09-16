'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import { requireAdminSession } from '@/lib/session';
import { z } from 'zod';

const InquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  productRef: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitInquiry(data) {
  try {
    const validatedData = InquirySchema.parse(data);
    await connectDB();
    await Inquiry.create(validatedData);
    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Invalid inquiry data' };
    }

    const message = error instanceof Error ? error.message : 'Unable to submit inquiry';
    return { success: false, error: message };
  }
}

export async function updateInquiryStatus(id, status, payload = {}) {
  try {
    await requireAdminSession(payload);
    await connectDB();
    await Inquiry.findByIdAndUpdate(id, { status });
    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || 'Unable to update inquiry status' };
  }
}

export async function deleteInquiry(id, payload = {}) {
  try {
    await requireAdminSession(payload);
    await connectDB();
    await Inquiry.findByIdAndDelete(id);
    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unable to delete inquiry' };
  }
}
