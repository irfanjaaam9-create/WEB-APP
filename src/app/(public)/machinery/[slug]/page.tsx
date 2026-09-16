import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import { getOrCreateSettings } from '@/lib/site-settings';

export default async function MachineryCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const settings = await getOrCreateSettings();
  const category = (settings.machineryCategories || []).find((item: any) => item.slug === slug);
  if (!category) notFound();
  const machines = (settings.machineryCatalog || []).filter((item: any) => item.categoryId === category.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Industrial Machinery</p><h1 className="mt-3 text-4xl font-black text-slate-900">{category.name}</h1><p className="mt-4 text-lg leading-8 text-slate-600">{category.overview}</p></div>
      {machines.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{machines.map((machine: any) => <article key={machine.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-slate-900">{machine.name}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{machine.overview}</p>{machine.outputCapacity && <p className="mt-4 text-xs font-bold uppercase tracking-wider text-amber-600">{machine.outputCapacity}</p>}<Link href={`/contact?machinery=${encodeURIComponent(machine.name)}`} className="mt-6 inline-flex rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950">Discuss this machine</Link></article>)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">No machinery models are published in this category yet.</div>}
    </div>
  );
}
