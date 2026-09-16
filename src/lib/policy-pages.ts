import { connectDB } from '@/lib/mongodb';
import PolicyPage from '@/models/PolicyPage';

export async function getPolicyPageBySlug(slug: string) {
  await connectDB();
  return PolicyPage.findOne({ slug, isPublished: true }).lean();
}

export async function getPolicyPageById(id: string) {
  await connectDB();
  return PolicyPage.findById(id).lean();
}

export async function getAllPolicyPages() {
  await connectDB();
  return PolicyPage.find().sort({ updatedAt: -1 }).lean();
}
