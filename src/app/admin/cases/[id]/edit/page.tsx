import { notFound } from 'next/navigation';
import CaseForm from '../../CaseForm';
import { connectDB } from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

export default async function EditCasePage({ params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const caseStudy = await CaseStudy.findById(id).lean();
  if (!caseStudy) notFound();
  return <CaseForm initialData={JSON.parse(JSON.stringify(caseStudy))} />;
}
