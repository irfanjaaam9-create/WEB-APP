'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';
import { requireAdminSession } from '@/lib/session';

export async function updateSiteSettings(data) {
  try {
    await requireAdminSession(data);
    await connectDB();

    const existing = await SiteSettings.findOne({ key: 'global' }).lean();
    const merged = {
      ...(existing || {}),
      ...(data || {}),
      key: 'global',
    };

    const settings = await SiteSettings.findOneAndUpdate(
      { key: 'global' },
      { $set: merged },
      { returnDocument: 'after', upsert: true, runValidators: true }
    );

    revalidatePath('/', 'layout');
    revalidatePath('/admin/settings');

    return { success: true, settings: JSON.parse(JSON.stringify(settings)) };
  } catch (error) {
    return { success: false, error: error.message || 'Unable to save settings' };
  }
}
