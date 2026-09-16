import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, MapPin, Calendar, User } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

export const revalidate = 60;

export default async function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  await connectDB();
  const cs = await CaseStudy.findOne({ slug: params.slug, isPublished: true }).lean();

  if (!cs) {
    notFound();
  }

  const date = cs.publishedAt ? new Date(cs.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  }) : '';

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-slate-500 font-medium">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
            <Link href="/cases" className="hover:text-primary">Project Cases</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
            <span className="text-slate-900 truncate">{cs.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Image */}
          {cs.images && cs.images.length > 0 && (
            <div className="w-full h-[40vh] min-h-[300px] relative bg-slate-100">
              <img 
                src={cs.images[0].url} 
                alt={cs.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading text-slate-900 mb-8 leading-tight">
              {cs.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-slate-100 mb-10 bg-slate-50/50 rounded-xl px-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</div>
                  <div className="text-sm font-semibold text-slate-900">{cs.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client</div>
                  <div className="text-sm font-semibold text-slate-900">{cs.clientName}</div>
                </div>
              </div>
              {date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</div>
                    <div className="text-sm font-semibold text-slate-900">{date}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div 
              className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary hover:prose-a:text-secondary prose-img:rounded-2xl prose-img:border prose-img:border-slate-200"
              dangerouslySetInnerHTML={{ __html: cs.content }}
            />
          </div>
          
          {/* Gallery Footer if more than 1 image */}
          {cs.images && cs.images.length > 1 && (
            <div className="p-8 md:p-12 bg-slate-50 border-t border-slate-200">
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-6">Project Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cs.images.slice(1).map((img: any, idx: number) => (
                  <a key={idx} href={img.url} target="_blank" rel="noopener noreferrer" className="block aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 hover:border-primary transition-colors bg-white">
                    <img src={img.url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-primary rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black font-heading mb-4">Need a Similar Solution?</h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Our engineering team can design a customized oxygen generation system tailored exactly to your facility's requirements.
            </p>
            <Link href={`/contact?interest=${encodeURIComponent(cs.title)}`} className="btn-secondary">
              Request a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
