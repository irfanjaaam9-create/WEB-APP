import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';
import { getSession } from '@/lib/session';

function normalizeFaq(faq: any) {
  if (!faq) return null;
  const id = faq.id || faq._id || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return {
    id,
    question: String(faq.question || '').trim(),
    answer: String(faq.answer || '').trim(),
    category: String(faq.category || 'General').trim() || 'General',
  };
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const settings = await SiteSettings.findOne({ key: 'global' }).lean();
    const faqs = Array.isArray(settings?.faqs) ? settings.faqs.map(normalizeFaq).filter(Boolean) : [];

    return NextResponse.json({ faqs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unable to load FAQs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const faq = normalizeFaq({
      id: body.id || undefined,
      question: body.question,
      answer: body.answer,
      category: body.category || 'General',
    });

    if (!faq || !faq.question || !faq.answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    await connectDB();
    const settings = await SiteSettings.findOne({ key: 'global' });
    const existingFaqs = Array.isArray(settings?.faqs) ? settings.faqs.map((item: any) => ({ ...item, id: item.id || item._id?.toString?.() || undefined })) : [];

    existingFaqs.push(faq);

    settings.faqs = existingFaqs;
    await settings.save();

    return NextResponse.json({ success: true, faq });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unable to save FAQ' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const faqId = String(body.id || '');
    if (!faqId) {
      return NextResponse.json({ error: 'FAQ id is required' }, { status: 400 });
    }

    const faq = normalizeFaq({
      id: faqId,
      question: body.question,
      answer: body.answer,
      category: body.category || 'General',
    });

    if (!faq || !faq.question || !faq.answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    await connectDB();
    const settings = await SiteSettings.findOne({ key: 'global' });
    const existingFaqs = Array.isArray(settings?.faqs) ? settings.faqs : [];
    const updatedFaqs = existingFaqs.map((item: any) => {
      const itemId = item.id || item._id?.toString?.();
      return itemId === faqId ? faq : item;
    });

    settings.faqs = updatedFaqs;
    await settings.save();

    return NextResponse.json({ success: true, faq });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unable to update FAQ' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const faqId = request.nextUrl.searchParams.get('id');
    if (!faqId) {
      return NextResponse.json({ error: 'FAQ id is required' }, { status: 400 });
    }

    await connectDB();
    const settings = await SiteSettings.findOne({ key: 'global' });
    const existingFaqs = Array.isArray(settings?.faqs) ? settings.faqs : [];
    settings.faqs = existingFaqs.filter((item: any) => {
      const itemId = item.id || item._id?.toString?.();
      return itemId !== faqId;
    });
    await settings.save();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unable to delete FAQ' }, { status: 500 });
  }
}
