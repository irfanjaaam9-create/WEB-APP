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
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-slate-500 font-medium">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
            <Link href="/products" className="hover:text-primary">Products</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
            <Link href={`/products?category=${product.category}`} className="hover:text-primary">{categoryLabel}</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
            <span className="text-slate-900 truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Gallery */}
            <div className="p-8 lg:p-12 bg-slate-50/50 lg:border-r border-slate-200">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm mb-6">
                <img 
                  src={product.images?.[0]?.url || 'https://via.placeholder.com/800x600?text=No+Image'} 
                  alt={product.title} 
                  className="absolute inset-0 w-full h-full object-contain p-4"
                />
              </div>
              
              {/* Thumbnails if > 1 image */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img: any, idx: number) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-white border border-slate-200 cursor-pointer hover:border-primary transition-colors">
                      <img src={img.url} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12 flex flex-col">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full w-fit mb-4 uppercase tracking-wider">
                {categoryLabel}
              </span>
              
              <h1 className="text-3xl lg:text-4xl font-black font-heading text-slate-900 mb-6 leading-tight">
                {product.title}
              </h1>
              
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {product.shortDesc}
              </p>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 font-heading border-b border-slate-100 pb-2">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="pt-0.5">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto pt-8 border-t border-slate-200 flex flex-wrap gap-4">
                {/* Scroll to Inquiry Form (handled by floating sidebar usually, or just link to contact page) */}
                <Link href={`/contact?product=${product.slug}`} className="btn-primary">
                  Inquire Now
                </Link>
                
                {product.brochureUrl && (
                  <a 
                    href={product.brochureUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-outline inline-flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" /> Download Brochure
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        {Object.keys(specsObj).length > 0 && (
          <div className="mt-12 bg-white rounded-3xl shadow-sm border border-slate-200 p-8 lg:p-12">
            <h2 className="text-2xl font-black font-heading text-slate-900 mb-8 border-l-4 border-secondary pl-4">
              Technical Specifications
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {Object.entries(specsObj).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <th className="py-4 px-6 text-sm font-semibold text-slate-900 border-b border-slate-200 w-1/3">
                        {key}
                      </th>
                      <td className="py-4 px-6 text-sm text-slate-600 border-b border-slate-200">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
