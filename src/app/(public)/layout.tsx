import React from 'react';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';
import FloatingSidebar from '@/components/public/FloatingSidebar';
import { connectDB } from '@/lib/mongodb';
import { getOrCreateSettings } from '@/lib/site-settings';
import { getPublishedPolicyPages } from '@/lib/policy-pages';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  await connectDB();
  const settings = await getOrCreateSettings();
  const policies = await getPublishedPolicyPages();
  
  // Convert mongoose doc to plain object
  const settingsData = { ...JSON.parse(JSON.stringify(settings)), policyPages: JSON.parse(JSON.stringify(policies)) };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader settings={settingsData} />
      
      <main className="flex-grow pt-[80px] md:pt-[116px]">
        {children}
      </main>

      <PublicFooter settings={settingsData} />
      <FloatingSidebar settings={settingsData} />
    </div>
  );
}
