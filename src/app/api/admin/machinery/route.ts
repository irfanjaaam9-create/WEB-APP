import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  const machineryCategories = await prisma.machineryCategory.findMany({
    include: { machinery: true },
    orderBy: { name: 'asc' },
  });

  return NextResponse.json({ success: true, machineryCategories });
}

export async function POST(req: NextRequest) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  try {
    const body = await req.json();
    const { name, categoryId, overview, applications, outputCapacity, specifications, images, isFeatured } = body;

    if (!name || !categoryId || !overview) {
      return NextResponse.json({ error: 'Name, categoryId, and overview are required' }, { status: 400 });
    }

    const baseSlug = slugify(name);
    let slug = baseSlug;
    let count = 1;
    while (await prisma.machinery.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    const machinery = await prisma.machinery.create({
      data: {
        name,
        slug,
        categoryId,
        overview,
        applications: applications || null,
        outputCapacity: outputCapacity || null,
        specifications: typeof specifications === 'string' ? specifications : JSON.stringify(specifications || {}),
        images: typeof images === 'string' ? images : JSON.stringify(images || []),
        isFeatured: Boolean(isFeatured),
      },
      include: { category: true },
    });

    return NextResponse.json({ success: true, machinery });
  } catch (error: any) {
    console.error('Error creating machinery:', error);
    return NextResponse.json({ error: error.message || 'Failed to create machinery' }, { status: 500 });
  }
}
