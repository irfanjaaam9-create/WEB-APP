'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import { requireAdminSession } from '@/lib/session';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function createProduct(data) {
  try {
    await requireAdminSession(data);
    await connectDB();
    const product = await Product.create(data);
    revalidatePath('/products');
    revalidatePath('/admin/products');
    return { success: true, product: JSON.parse(JSON.stringify(product)) };
  } catch (error) {
    return { success: false, error: error.message || 'Unable to create product' };
  }
}

export async function updateProduct(id, data) {
  try {
    await requireAdminSession(data);
    await connectDB();
    const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!product) throw new Error('Product not found');
    revalidatePath('/products');
    revalidatePath(`/products/${product.slug}`);
    revalidatePath('/admin/products');
    return { success: true, product: JSON.parse(JSON.stringify(product)) };
  } catch (error) {
    return { success: false, error: error.message || 'Unable to update product' };
  }
}

export async function deleteProduct(id, payload = {}) {
  try {
    await requireAdminSession(payload);
    await connectDB();
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');

    for (const image of product.images || []) {
      if (image?.public_id) {
        await deleteFromCloudinary(image.public_id);
      }
    }

    await Product.findByIdAndDelete(id);
    revalidatePath('/products');
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || 'Unable to delete product' };
  }
}
