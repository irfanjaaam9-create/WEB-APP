import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Package, ArrowRight, Star, Send } from 'lucide-react';

export const revalidate = 60;

export default async function ProductsCatalogPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } }),
    prisma.productCategory.findMany({ include: { _count: { select: { products: true } } } }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          CMS Driven Product Catalog
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Products We Source From China
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Browse sample products and categories we research and coordinate for international buyers. Can’t find your specific item? Tell us what you need and we will check feasibility.
        </p>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 justify-start sm:justify-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Categories:</span>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products/${cat.slug}`}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-200 text-xs font-semibold shrink-0 transition-all"
          >
            {cat.name} ({cat._count.products})
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          let parsedImages: string[] = [];
          try {
            parsedImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images || [];
          } catch {
            parsedImages = [];
          }
          const firstImg = parsedImages[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop';

          return (
            <div
              key={product.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div className="relative h-56 bg-slate-950 overflow-hidden">
                <img
                  src={firstImg}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                    {product.category?.name}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="font-extrabold text-white text-lg tracking-tight">{product.name}</h2>
                  <p className="text-xs text-slate-400 line-clamp-3 mt-2">{product.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Estimated MOQ</span>
                    <span className="font-semibold text-slate-200">{product.moq || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Est. Unit Price</span>
                    <span className="font-semibold text-emerald-400">{product.estPriceRange || 'Contact'}</span>
                  </div>
                </div>

                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-extrabold text-xs text-center transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Sourcing For This Item</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Can't Find Product Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Can't Find Your Product?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          We source customized products, unique catalog items, and specialty goods across Chinese manufacturing hubs.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20"
        >
          <Send className="w-4 h-4" />
          <span>Ask About Another Product</span>
        </Link>
      </div>
    </div>
  );
}
