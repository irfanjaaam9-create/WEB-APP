'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

interface ProductCardProps {
  product: any;
  categoryLabel?: string;
}

export default function ProductCard({ product, categoryLabel }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80';
  const label = categoryLabel || product.category;

  return (
    <article className="group flex h-full flex-col border border-stone-200 bg-white transition-transform duration-200 hover:-translate-y-1 hover:border-stone-900">
      <div className="relative overflow-hidden border-b border-stone-200 bg-stone-100">
        <img src={imageUrl} alt={product.title} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 border border-stone-900 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-700">
          {label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 text-xl font-black tracking-tight text-stone-900">{product.title}</h3>
        <p className="mb-6 flex-1 text-sm leading-6 text-stone-600">{product.shortDesc}</p>

        <div className="flex items-center justify-between border-t border-stone-200 pt-4">
          <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-stone-900 hover:text-amber-700">
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>

          {product.brochureUrl && (
            <a href={product.brochureUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 hover:text-stone-900">
              <FileText className="h-3.5 w-3.5" />
              Brochure
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
