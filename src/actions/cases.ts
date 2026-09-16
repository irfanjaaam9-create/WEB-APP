'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';
import { requireAdminSession } from '@/lib/session';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function createCaseStudy(data) {
  try {
    await requireAdminSession(data);
    await connectDB();
    const caseStudy = await CaseStudy.create(data);
    revalidatePath('/cases');
    revalidatePath('/admin/cases');
    return { success: true, caseStudy: JSON.parse(JSON.stringify(caseStudy)) };
  } catch (error) {
    return { success: false, error: error.message || 'Unable to create case study' };
  }
}

export async function updateCaseStudy(id, data) {
  try {
    await requireAdminSession(data);
    await connectDB();
    const caseStudy = await CaseStudy.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!caseStudy) throw new Error('Case study not found');
    revalidatePath('/cases');
    revalidatePath(`/cases/${caseStudy.slug}`);
    revalidatePath('/admin/cases');
    return { success: true, caseStudy: JSON.parse(JSON.stringify(caseStudy)) };
  } catch (error) {
    return { success: false, error: error.message || 'Unable to update case study' };
  }
}

export async function deleteCaseStudy(id, payload = {}) {
  try {
    await requireAdminSession(payload);
    await connectDB();
    const caseStudy = await CaseStudy.findById(id);
    if (!caseStudy) throw new Error('Case study not found');

    for (const image of caseStudy.images || []) {
      if (image?.public_id) {
        await deleteFromCloudinary(image.public_id);
      }
    }

    await CaseStudy.findByIdAndDelete(id);
    revalidatePath('/cases');
    revalidatePath('/admin/cases');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || 'Unable to delete case study' };
  }
}
