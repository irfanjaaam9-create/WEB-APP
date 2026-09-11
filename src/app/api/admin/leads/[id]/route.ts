import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { internalNotes: { orderBy: { createdAt: 'desc' } } },
  });

  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, lead });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await req.json();
    const { status, noteContent } = body;

    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Update lead status if provided
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        status: status || lead.status,
      },
    });

    // Add internal note if provided
    if (noteContent && noteContent.trim()) {
      await prisma.leadNote.create({
        data: {
          leadId: id,
          content: noteContent.trim(),
          author: admin.name || 'Admin',
        },
      });
    }

    const fullLead = await prisma.lead.findUnique({
      where: { id },
      include: { internalNotes: { orderBy: { createdAt: 'desc' } } },
    });

    return NextResponse.json({ success: true, lead: fullLead });
  } catch (error: any) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: error.message || 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  try {
    const { id } = await params;
    await prisma.lead.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Lead deleted' });
  } catch (error: any) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete lead' }, { status: 500 });
  }
}
