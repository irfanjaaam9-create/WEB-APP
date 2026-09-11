import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ success: true, projects });
}

export async function POST(req: NextRequest) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  try {
    const body = await req.json();
    const { title, clientCountry, productType, buyerRequirement, sourcingChallenge, workPerformed, result, images, videoUrl, testimonial, isPublished } = body;

    if (!title || !clientCountry || !buyerRequirement) {
      return NextResponse.json({ error: 'Title, client country, and requirement are required' }, { status: 400 });
    }

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let count = 1;
    while (await prisma.project.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        clientCountry,
        productType: productType || 'Product Sourcing',
        buyerRequirement,
        sourcingChallenge: sourcingChallenge || '',
        workPerformed: workPerformed || '',
        result: result || '',
        images: typeof images === 'string' ? images : JSON.stringify(images || []),
        videoUrl: videoUrl || null,
        testimonial: testimonial || null,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error('Error creating project case study:', error);
    return NextResponse.json({ error: error.message || 'Failed to create case study' }, { status: 500 });
  }
}
