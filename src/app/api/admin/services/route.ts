import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  const services = await prisma.servicePackage.findMany({
    orderBy: { orderIndex: 'asc' },
  });

  return NextResponse.json({ success: true, services });
}

export async function POST(req: NextRequest) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  try {
    const body = await req.json();
    const { title, priceUsd, isCustomQuote, priceSuffix, badge, features, ctaText, orderIndex } = body;

    if (!title) {
      return NextResponse.json({ error: 'Package title is required' }, { status: 400 });
    }

    const slug = slugify(title);

    const service = await prisma.servicePackage.create({
      data: {
        title,
        slug,
        priceUsd: isCustomQuote ? null : parseFloat(priceUsd) || 0,
        isCustomQuote: Boolean(isCustomQuote),
        priceSuffix: priceSuffix || (isCustomQuote ? 'Custom Quote' : `US$${priceUsd}`),
        badge: badge || null,
        features: typeof features === 'string' ? features : JSON.stringify(features || []),
        ctaText: ctaText || 'Choose Service',
        orderIndex: orderIndex !== undefined ? parseInt(orderIndex) : 0,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Error creating service package:', error);
    return NextResponse.json({ error: error.message || 'Failed to create service package' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  try {
    const body = await req.json();
    const { id, title, priceUsd, isCustomQuote, priceSuffix, badge, features, ctaText, orderIndex } = body;

    if (!id) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
    }

    const service = await prisma.servicePackage.update({
      where: { id },
      data: {
        title,
        priceUsd: isCustomQuote ? null : parseFloat(priceUsd),
        isCustomQuote: Boolean(isCustomQuote),
        priceSuffix,
        badge,
        features: typeof features === 'string' ? features : JSON.stringify(features || []),
        ctaText,
        orderIndex: orderIndex !== undefined ? parseInt(orderIndex) : 0,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Error updating service package:', error);
    return NextResponse.json({ error: error.message || 'Failed to update service package' }, { status: 500 });
  }
}
