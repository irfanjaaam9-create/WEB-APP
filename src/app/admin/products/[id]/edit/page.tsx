import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '@/app/admin/products/ProductForm';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findById(params.id).lean();

  if (!product) {
    notFound();
  }

  // Convert map to object for the client component
  if (product.specifications && product.specifications instanceof Map) {
    (product as any).specifications = Object.fromEntries(product.specifications);
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-500" />
        </Link>
        <h1 className="text-3xl font-black font-heading text-slate-900">Edit Product</h1>
      </div>
      <ProductForm initialData={JSON.parse(JSON.stringify(product))} />
    </div>
  );
}
