import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import { getOrCreateSettings } from '@/lib/site-settings';
import { ChevronRight, Settings, CheckCircle } from 'lucide-react';

export const revalidate = 60;

export default async function MachineryCategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  await connectDB();
  const settings = await getOrCreateSettings();
  
  const category = (settings.machineryCategories || []).find((item: any) => item.slug === slug);
  if (!category) {
    notFound();
  }
  
  const machines = (settings.machineryCatalog || []).filter((item: any) => item.categoryId === category.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 py-20 text-white sm:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex flex-wrap items-center text-sm font-medium text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link href="/products" className="transition-colors hover:text-white">Products & Machinery</Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-amber-400">{category.name}</span>
          </nav>
          
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-amber-400">
              <Settings className="h-4 w-4" /> Industrial Machinery
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {category.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
              {category.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Machinery Models List */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {machines.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {machines.map((machine: any) => (
              <article 
                key={machine.id} 
                className="group flex flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                    {machine.name}
                  </h2>
                  
                  {machine.outputCapacity && (
                    <div className="mt-4 inline-flex self-start rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                      Capacity: {machine.outputCapacity}
                    </div>
                  )}

                  <p className="mt-5 text-sm leading-6 text-slate-600 flex-1">
                    {machine.overview}
                  </p>
                  
                  {machine.applications && (
                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Applications</h4>
                      <p className="text-sm text-slate-600 line-clamp-2">{machine.applications}</p>
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <Link 
                      href={`/contact?machinery=${encodeURIComponent(machine.name)}`} 
                      className="btn-primary w-full justify-center shadow-md shadow-stone-900/10 group-hover:shadow-lg transition-all"
                    >
                      Inquire About This Model
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/50 p-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-6">
              <Settings className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No models listed yet</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              We are currently updating our catalog for {category.name}. Please contact us directly for product specifications and quotes.
            </p>
            <Link href="/contact" className="btn-primary mt-8">
              Contact Sales Team
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
