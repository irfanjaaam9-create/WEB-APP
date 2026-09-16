import { NextRequest, NextResponse } from 'next/server';
import Inquiry from '@/models/Inquiry';
import { connectDB } from '@/lib/mongodb';
import { getSession } from '@/lib/session';

async function isAdmin() {
  const session = await getSession();
  return session?.role === 'admin';
}

function mapLead(inquiry: any) {
  const id = inquiry._id.toString();
  return {
    ...inquiry,
    id,
    leadId: `INQ-${id.slice(-8).toUpperCase()}`,
    companyName: inquiry.company || '',
    whatsApp: inquiry.phone || '',
    country: '',
    productName: inquiry.productRef || '',
    serviceRequired: 'Supplier Research',
    status: String(inquiry.status || 'new').toUpperCase(),
    internalNotes: inquiry.notes || [],
  };
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const { id } = await params;
  const inquiry = await Inquiry.findById(id).lean();
  if (!inquiry) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  return NextResponse.json({ lead: mapLead(inquiry) });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const { id } = await params;
  const body = await request.json();
  const statusMap: Record<string, 'new' | 'contacted' | 'resolved'> = {
    NEW: 'new',
    CONTACTED: 'contacted',
    QUALIFIED: 'contacted',
    PROPOSAL_SENT: 'contacted',
    PAYMENT_PENDING: 'contacted',
    IN_PROGRESS: 'contacted',
    COMPLETED: 'resolved',
    NOT_QUALIFIED: 'resolved',
    CLOSED: 'resolved',
  };
  const update: Record<string, unknown> = { status: statusMap[String(body.status)] || 'new' };
  if (String(body.noteContent || '').trim()) {
    update.$push = {
      notes: {
        id: crypto.randomUUID(),
        content: String(body.noteContent).trim(),
        author: 'Admin',
        createdAt: new Date(),
      },
    };
  }
  const inquiry = await Inquiry.findByIdAndUpdate(id, update, { new: true }).lean();
  if (!inquiry) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  return NextResponse.json({ lead: mapLead(inquiry) });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const { id } = await params;
  const result = await Inquiry.findByIdAndDelete(id);
  if (!result) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
