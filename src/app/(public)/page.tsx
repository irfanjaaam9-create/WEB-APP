import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, Factory, Award } from 'lucide-react';
import HeroCarousel from '@/components/public/HeroCarousel';
import ProductCard from '@/components/public/ProductCard';
import { connectDB } from '@/lib/mongodb';
import { getOrCreateSettings } from '@/lib/site-settings';
import Product from '@/models/Product';
import CaseStudy from '@/models/CaseStudy';

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function HomePage() {
  await connectDB();
  const settings = await getOrCreateSettings();
  
  // Fetch top 6 published products
  const products = await Product.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  // Fetch top 3 published case studies
  const cases = await CaseStudy.find({ isPublished: true })
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  const heroSlides = settings.heroSlides?.length > 0 
    ? [...settings.heroSlides].sort((a, b) => a.order - b.order)
    : [
        {
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000',
          title: settings.companyTagline || 'Dedicated to Oxygen Generation For 10+ Years',
          subtitle: 'More than 10 Patents • 2000m² production workshop • Professional R&D team',
          ctaText: 'View Products',
          ctaLink: '/products'
        }
      ];

  return (
    <div>
      {/* 1. Hero Carousel */}
      <HeroCarousel slides={JSON.parse(JSON.stringify(heroSlides))} />

      {/* 2. Key Metrics / Stats Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            {(settings.homeMetrics?.length ? settings.homeMetrics : [
              { value: '10+', label: 'Years Experience' },
              { value: '2000m²', label: 'Production Workshop' },
              { value: '10+', label: 'Patents' },
              { value: '30+', label: 'Countries Exported' },
            ]).map((metric: any) => (
              <div key={metric.label} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-heading font-black text-primary mb-2">{metric.value}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Products Showcase */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
              {settings.homeIntroTitle || 'Reliable manufacturing and sourcing from China for industrial equipment buyers'}
            </h2>
            <p className="text-lg text-slate-600">
              {settings.homeIntroBody || 'We help companies source machinery, industrial systems, and production equipment with verified factories, direct communication, and practical export support.'}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={JSON.parse(JSON.stringify(product))} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 border-2 border-dashed border-slate-300 rounded-2xl">
              No products published yet.
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link href="/products" className="btn-outline text-primary hover:bg-primary hover:text-white hover:border-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Factory & Capabilities (Static Info Block) */}
      <section className="section-padding bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-white">
                {settings.capabilitiesTitle || 'Reliable Manufacturing & Quality Control'}
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {settings.capabilitiesBody || 'ZOY Medical Technology is a professional manufacturer engaged in the research, development, production, sale and service of PSA oxygen generators and hyperbaric oxygen chambers.'}
              </p>
              
              <div className="space-y-4 mb-10">
                {(settings.capabilitiesItems?.length ? settings.capabilitiesItems : [
                  'Turnkey Solution for Hospital Oxygen Supply',
                  'CE, ISO9001, ISO13485 Certified',
                  'Strict Pre-shipment Testing',
                  '24/7 After-sales Support & Remote Assistance',
                ]).map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                    <span className="font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <Link href={settings.capabilitiesCtaLink || '/about'} className="btn-secondary">
                {settings.capabilitiesCtaText || 'Learn More About Us'}
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                  <Factory className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2 font-heading">{settings.capabilityCards?.[0]?.title || 'Modern Facility'}</h3>
                  <p className="text-white/70 text-sm">{settings.capabilityCards?.[0]?.body || 'Standardized production lines ensuring high-volume capacity.'}</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                  <ShieldCheck className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2 font-heading">{settings.capabilityCards?.[1]?.title || 'Quality Assured'}</h3>
                  <p className="text-white/70 text-sm">{settings.capabilityCards?.[1]?.body || 'Every unit undergoes 72-hour continuous testing before delivery.'}</p>
                </div>
              </div>
              <div className="space-y-4 pb-8">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                  <Award className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2 font-heading">{settings.capabilityCards?.[2]?.title || 'Certifications'}</h3>
                  <p className="text-white/70 text-sm">{settings.capabilityCards?.[2]?.body || 'Complying with international medical device standards.'}</p>
                </div>
                <div className="rounded-2xl overflow-hidden h-64 relative">
                  <img src={settings.capabilitiesImage || 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=600'} alt="Factory" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">Frequently asked questions</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Questions buyers ask before ordering</h2>
          </div>

          <div className="space-y-4">
            {(Array.isArray(settings.faqs) && settings.faqs.length > 0 ? settings.faqs : [
              {
                id: 'default-1',
                category: 'General',
                question: 'Do you help source equipment from multiple factories?',
                answer: 'Yes. We can shortlist factories, compare quotations, assess capabilities, and coordinate communication for industrial equipment projects.',
              },
              {
                id: 'default-2',
                category: 'Process',
                question: 'Can you support both sample and mass production?',
                answer: 'Absolutely. We assist during sample review, supplier negotiation, production follow-up, and shipment coordination for ongoing supply programs.',
              },
              {
                id: 'default-3',
                category: 'Payment',
                question: 'Are prices and costs disclosed upfront?',
                answer: 'We aim for clear cost communication. Service fees and third-party costs are discussed before project work begins so there are no surprises.',
              }
            ]).map((faq: any) => (
              <details key={faq.id || faq._id || faq.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" open={false}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-bold text-slate-900">
                  <span>{faq.question}</span>
                  <span className="text-primary text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-base leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Recent Cases */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Successful Projects</h2>
              <p className="text-lg text-slate-600">
                See how our oxygen solutions are helping hospitals and facilities worldwide.
              </p>
            </div>
            <Link href="/cases" className="inline-flex items-center gap-2 font-bold text-primary hover:text-secondary transition-colors">
              View All Cases <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {cases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.map((cs: any) => (
                <Link key={cs._id} href={`/cases/${cs.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden bg-slate-100 mb-4 h-64 relative">
                    <img 
                      src={cs.images?.[0]?.url || 'https://via.placeholder.com/600x400?text=No+Image'} 
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {cs.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{cs.location}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500 border-2 border-dashed border-slate-300 rounded-2xl">
              No project cases published yet.
            </div>
          )}
        </div>
      </section>

      {/* 7. Final CTA Slider */}
      <section className="bg-slate-950 py-10">
        <HeroCarousel compact slides={JSON.parse(JSON.stringify(heroSlides))} />
      </section>
    </div>
  );
}
