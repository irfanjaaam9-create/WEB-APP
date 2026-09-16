import { connectDB } from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export async function getOrCreateSettings() {
  await connectDB();
  return SiteSettings.findOneAndUpdate(
    { key: 'global' },
    { $setOnInsert: { key: 'global' } },
    { upsert: true, returnDocument: 'after' }
  ).lean();
}
