import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const service = searchParams.get('service');
  const query = searchParams.get('q');

  const where: any = {};
  if (status && status !== 'ALL') where.status = status;
  if (service && service !== 'ALL') where.serviceRequired = service;
  if (query) {
    where.OR = [
      { leadId: { contains: query } },
      { fullName: { contains: query } },
      { companyName: { contains: query } },
      { email: { contains: query } },
      { country: { contains: query } },
      { productName: { contains: query } },
      { machineRequired: { contains: query } },
    ];
  }

  const leads = await prisma.lead.findMany({
    where,
    include: { internalNotes: { orderBy: { createdAt: 'desc' } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ success: true, leads });
}
