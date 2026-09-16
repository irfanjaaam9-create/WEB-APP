import React from 'react';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCategory from '@/models/ProductCategory';
import ProductCard from '@/components/public/ProductCard';

export const revalidate = 60;

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  await connectDB();

  const query: any = { isPublished: true };
  if (searchParams.category && searchParams.category !== 'all') {
    query.category = searchParams.category;
  }

  const [products, categories] = await Promise.all([
    Product.find(query).sort({ createdAt: -1 }).lean(),
    ProductCategory.find().sort({ name: 1 }).lean(),
  ]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-heading text-slate-900 mb-6">
            Our Products
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our comprehensive range of high-quality oxygen generation systems designed for medical and industrial applications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <Link
            href="/products"
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              !searchParams.category || searchParams.category === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary'
            }`}
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                searchParams.category === cat.slug
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
              <ProductCard
                key={product._id}
                product={JSON.parse(JSON.stringify(product))}
                categoryLabel={categories.find((category) => category.slug === product.category)?.name || product.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">No Products Found</h3>
            <p className="text-slate-500">There are currently no products available in this category.</p>
            <Link href="/products" className="btn-primary mt-6">
              View All Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
