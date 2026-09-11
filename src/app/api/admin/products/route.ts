import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';
import { slugify } from '@/lib/utils';

// GET: List products
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');
  const query = searchParams.get('q');

  const where: any = {};
  if (categoryId) where.categoryId = categoryId;
  if (query) {
    where.OR = [
      { name: { contains: query } },
      { description: { contains: query } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ success: true, products });
}

// POST: Create product (Admin only)
export async function POST(req: NextRequest) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  try {
    const body = await req.json();
    const { name, categoryId, description, moq, estPriceRange, images, specifications, isFeatured } = body;

    if (!name || !categoryId || !description) {
      return NextResponse.json({ error: 'Name, categoryId, and description are required' }, { status: 400 });
    }

    const baseSlug = slugify(name);
    let slug = baseSlug;
    let count = 1;
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        categoryId,
        description,
        moq: moq || null,
        estPriceRange: estPriceRange || null,
        images: typeof images === 'string' ? images : JSON.stringify(images || []),
        specifications: typeof specifications === 'string' ? specifications : JSON.stringify(specifications || {}),
        isFeatured: Boolean(isFeatured),
      },
      include: { category: true },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}
