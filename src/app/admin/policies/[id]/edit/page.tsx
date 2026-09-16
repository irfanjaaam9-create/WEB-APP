import React from 'react';
import PolicyForm from '../../PolicyForm';
import { getPolicyPageById } from '@/lib/policy-pages';

export default async function EditPolicyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getPolicyPageById(id);

  if (!page) {
    return <div className="p-8 text-red-600">Policy page not found.</div>;
  }

  return <PolicyForm initialData={JSON.parse(JSON.stringify(page))} />;
}
