import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

export const revalidate = 60;

export default async function CasesPage() {
  await connectDB();
  const cases = await CaseStudy.find({ isPublished: true }).sort({ publishedAt: -1 }).lean();

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-heading text-slate-900 mb-6">
            Global Project Cases
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover how ZOY Medical Technology provides tailored oxygen solutions for hospitals, clinics, and industrial facilities around the world.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {cases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((cs: any) => (
              <div key={cs._id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="relative h-60 bg-slate-100 overflow-hidden">
                  <img 
                    src={cs.images?.[0]?.url || 'https://via.placeholder.com/600x400?text=No+Image'} 
                    alt={cs.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center gap-1.5 text-white/90 text-sm font-bold">
                      <MapPin className="w-4 h-4" /> {cs.location}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/cases/${cs.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {cs.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
                    {cs.excerpt || 'Read the full project case study to learn more about the solution implemented and results achieved.'}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {cs.clientName}
                    </span>
                    <Link 
                      href={`/cases/${cs.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                      Read Case <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">No Project Cases Yet</h3>
            <p className="text-slate-500">Check back later for updates on our latest global projects.</p>
          </div>
        )}
      </div>
    </div>
  );
}
