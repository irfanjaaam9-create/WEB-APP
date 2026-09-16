import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, FileText, CheckCircle } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCategory from '@/models/ProductCategory';

export const revalidate = 60;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug, isPublished: true }).lean();

  if (!product) {
    notFound();
  }

  const category = await ProductCategory.findOne({ slug: product.category }).lean();
  const categoryLabel = category?.name || product.category;
  
  // Safe parsing for Map if it comes back weird from lean()
  let specsObj: Record<string, string> = {};
  if (product.specifications) {
    if (product.specifications instanceof Map) {
      specsObj = Object.fromEntries(product.specifications);
    } else {
      specsObj = product.specifications as Record<string, string>;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/80 text-slate-800">
      <div className="border-b border-slate-200/60 bg-white/60 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex flex-wrap items-center text-sm font-medium text-slate-500">
            <Link href="/" className="transition-colors hover:text-stone-900">Home</Link>
            <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
            <Link href="/products" className="transition-colors hover:text-stone-900">Products</Link>
            <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
            <Link href={`/products?category=${product.category}`} className="transition-colors hover:text-stone-900">{categoryLabel}</Link>
            <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
            <span className="max-w-[180px] truncate text-slate-900 sm:max-w-none">{product.title}</span>
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <article className="overflow-hidden rounded-[32px] border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
          <div className="grid grid-cols-1 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="bg-slate-100/80 p-4 sm:p-6 lg:p-8 xl:border-r xl:border-slate-200">
              <div className="rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                <div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-slate-50">
                  <img
                    src={product.images?.[0]?.url || 'https://via.placeholder.com/800x600?text=No+Image'}
                    alt={product.title}
                    className="h-full w-full object-contain p-4 sm:p-6"
                  />
                </div>
              </div>

              {product.images && product.images.length > 1 && (
                <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4">
                  {product.images.map((img: any, idx: number) => (
                    <div
                      key={idx}
                      className="aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:border-stone-900 hover:shadow-sm"
                    >
                      <img src={img.url} alt={`${product.title} ${idx + 1}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col p-5 sm:p-7 lg:p-10">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full border border-stone-900/10 bg-stone-900 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                  {categoryLabel}
                </span>
                {product.isFeatured && (
                  <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700">
                    Recommended
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-black tracking-tight leading-tight text-slate-900 sm:text-4xl lg:text-[3rem] lg:leading-[1.05]">
                {product.title}
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
                {product.shortDesc}
              </p>

              {product.features && product.features.length > 0 && (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <h3 className="mb-4 text-lg font-bold text-slate-900">Key Features</h3>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
                <Link href={`/contact?product=${product.slug}`} className="btn-primary w-full justify-center sm:w-auto shadow-lg shadow-stone-900/20 hover:-translate-y-0.5 transition-all">
                  Inquire Now
                </Link>

                {product.brochureUrl && (
                  <a
                    href={product.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex w-full items-center justify-center gap-2 sm:w-auto hover:-translate-y-0.5 transition-all bg-white"
                  >
                    <FileText className="h-4 w-4" />
                    Download Brochure
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>

        {Object.keys(specsObj).length > 0 && (
          <section className="mt-12 rounded-[32px] border border-slate-200/60 bg-white/80 backdrop-blur-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8 lg:p-12">
            <h2 className="mb-6 border-l-4 border-amber-500 pl-4 text-2xl font-black text-slate-900 sm:text-3xl">
              Technical Specifications
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-slate-200">
                <tbody>
                  {Object.entries(specsObj).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <th className="w-1/3 border-b border-slate-200 px-5 py-4 text-left text-sm font-semibold text-slate-900">
                        {key}
                      </th>
                      <td className="border-b border-slate-200 px-5 py-4 text-sm leading-6 text-slate-700">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
