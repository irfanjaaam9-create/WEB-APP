import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCategory from '@/models/ProductCategory';
import { deleteProduct } from '@/actions/products';

export const revalidate = 0;

export default async function AdminProductsPage() {
  await connectDB();
  const [products, categories] = await Promise.all([
    Product.find().sort({ createdAt: -1 }).lean(),
    ProductCategory.find().lean(),
  ]);
  const categoryNames = new Map(categories.map((category) => [category.slug, category.name]));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black font-heading text-slate-900">Products</h1>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Product
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-500">
                  No products found. Click "New Product" to add one.
                </td>
              </tr>
            ) : (
              products.map((product: any) => {
                const categoryLabel = categoryNames.get(product.category) || product.category;

                return (
                  <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                          <img
                            src={product.images?.[0]?.url || 'https://via.placeholder.com/150?text=No+Img'}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{product.title}</div>
                          <div className="text-xs text-slate-500 font-mono mt-0.5">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {categoryLabel}
                    </td>
                    <td className="py-4 px-6">
                      {product.isPublished ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          <CheckCircle className="w-3.5 h-3.5" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                          <XCircle className="w-3.5 h-3.5" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deleteProduct(product._id);
                        }}>
                          <button
                            type="submit"
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={(e) => {
                              if(!confirm('Are you sure you want to delete this product?')) e.preventDefault();
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
