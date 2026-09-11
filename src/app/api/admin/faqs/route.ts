import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { orderIndex: 'asc' },
  });
  return NextResponse.json({ success: true, faqs });
}

export async function POST(req: NextRequest) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  try {
    const body = await req.json();
    const { question, answer, category, orderIndex } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        category: category || 'General',
        orderIndex: orderIndex !== undefined ? parseInt(orderIndex) : 0,
      },
    });

    return NextResponse.json({ success: true, faq });
  } catch (error: any) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: error.message || 'Failed to create FAQ' }, { status: 500 });
  }
}
