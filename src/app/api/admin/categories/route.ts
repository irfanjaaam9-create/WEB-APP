import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCategory from '@/models/ProductCategory';
import { getSession } from '@/lib/session';

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function requireAdmin() {
  const session = await getSession();
  return session?.role === 'admin';
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const categories = await ProductCategory.find().sort({ name: 1 }).lean();
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => ({
        ...category,
        id: category._id.toString(),
        _count: { products: await Product.countDocuments({ category: category.slug }) },
      }))
    );

    return NextResponse.json({ categories: categoriesWithCounts });
  } catch (error: unknown) {
    return NextResponse.json({ error: errorMessage(error, 'Unable to load categories') }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const name = String(body.name || '').trim();
    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const slug = slugify(name);
    if (!slug) {
      return NextResponse.json({ error: 'Category name must contain letters or numbers' }, { status: 400 });
    }

    await connectDB();
    const category = await ProductCategory.create({
      name,
      slug,
      description: String(body.description || '').trim(),
      featuredImage: String(body.featuredImage || '').trim(),
      seoTitle: String(body.seoTitle || '').trim(),
      seoDescription: String(body.seoDescription || '').trim(),
    });

    return NextResponse.json({
      success: true,
      category: { ...category.toObject(), id: category._id.toString(), _count: { products: 0 } },
    });
  } catch (error: unknown) {
    const duplicate = typeof error === 'object' && error !== null && 'code' in error && error.code === 11000;
    const message = duplicate ? 'A category with this name already exists' : errorMessage(error, 'Unable to create category');
    return NextResponse.json({ error: message }, { status: duplicate ? 409 : 500 });
  }
}
