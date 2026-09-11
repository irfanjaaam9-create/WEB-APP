import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const media = await prisma.media.findMany({
    orderBy: { uploadedAt: 'desc' },
  });
  return NextResponse.json({ success: true, media });
}
