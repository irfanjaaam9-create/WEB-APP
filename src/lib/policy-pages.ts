import { connectDB } from '@/lib/mongodb';
import PolicyPage from '@/models/PolicyPage';

const defaultPolicies = [
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    summary: 'Last updated: September 2026',
    content: '<h2>1. Scope of Service</h2><p>We provide supplier research, quotation comparison, English-Mandarin communication, sample coordination, and operational support for industrial sourcing projects.</p><h2>2. Service Fees and Third-Party Costs</h2><p>Our service fees cover research, coordination, and communication work. They do not include product manufacturing costs, shipping, customs, testing, or supplier-side charges.</p>',
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    summary: 'Last updated: September 2026',
    content: '<h2>1. Information We Collect</h2><p>We collect your name, email, phone number, company details, product requirements, and information needed to evaluate a sourcing request.</p><h2>2. How We Use Your Data</h2><p>Your information is used to assess feasibility, coordinate supplier communication, prepare quotations, and manage client project requests.</p>',
  },
  {
    slug: 'refund-policy',
    title: 'Refund & Cancellation Policy',
    summary: 'Last updated: September 2026',
    content: '<h2>1. Initial Review</h2><p>No payment is required for a preliminary feasibility review. We assess your requirement and confirm scope before moving forward.</p><h2>2. Service Fees</h2><p>Service fees cover research and coordination work. Refund eligibility depends on work completed and the agreed commercial scope.</p>',
  },
];

async function ensureDefaultPolicyPages() {
  await Promise.all(defaultPolicies.map((policy) => PolicyPage.updateOne(
    { slug: policy.slug },
    { $setOnInsert: { ...policy, isPublished: true } },
    { upsert: true }
  )));
}

export async function getPolicyPageBySlug(slug: string) {
  await connectDB();
  await ensureDefaultPolicyPages();
  return PolicyPage.findOne({ slug, isPublished: true }).lean();
}

export async function getPolicyPageById(id: string) {
  await connectDB();
  return PolicyPage.findById(id).lean();
}

export async function getAllPolicyPages() {
  await connectDB();
  await ensureDefaultPolicyPages();
  return PolicyPage.find().sort({ updatedAt: -1 }).lean();
}

export async function getPublishedPolicyPages() {
  await connectDB();
  await ensureDefaultPolicyPages();
  return PolicyPage.find({ isPublished: true }).sort({ updatedAt: -1 }).lean();
}
