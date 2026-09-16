'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import PolicyPage from '@/models/PolicyPage';
import { requireAdminSession } from '@/lib/session';

export async function createPolicyPage(data) {
  try {
    await requireAdminSession(data);
    await connectDB();
    const page = await PolicyPage.create(data);
    revalidatePath('/');
    revalidatePath('/terms');
    revalidatePath('/privacy-policy');
    revalidatePath('/refund-policy');
    revalidatePath('/admin/policies');
    return { success: true, page: JSON.parse(JSON.stringify(page)) };
  } catch (error) {
    return { success: false, error: error.message || 'Unable to create policy page' };
  }
}

export async function updatePolicyPage(id, data) {
  try {
    await requireAdminSession(data);
    await connectDB();
    const page = await PolicyPage.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!page) throw new Error('Policy page not found');
    revalidatePath('/');
    revalidatePath('/terms');
    revalidatePath('/privacy-policy');
    revalidatePath('/refund-policy');
    revalidatePath('/admin/policies');
    return { success: true, page: JSON.parse(JSON.stringify(page)) };
  } catch (error) {
    return { success: false, error: error.message || 'Unable to update policy page' };
  }
}

export async function deletePolicyPage(id, payload = {}) {
  try {
    await requireAdminSession(payload);
    await connectDB();
    const page = await PolicyPage.findByIdAndDelete(id);
    if (!page) throw new Error('Policy page not found');
    revalidatePath('/');
    revalidatePath('/terms');
    revalidatePath('/privacy-policy');
    revalidatePath('/refund-policy');
    revalidatePath('/admin/policies');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || 'Unable to delete policy page' };
  }
}
