import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';
import Inquiry from '@/models/Inquiry';
import SiteSettings from '@/models/SiteSettings';
import { getSession } from '@/lib/session';
import cloudinary from '@/lib/cloudinary';

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

async function isAdmin() {
  const session = await getSession();
  return session?.role === 'admin';
}

async function getSettings() {
  return SiteSettings.findOneAndUpdate(
    { key: 'global' },
    { $setOnInsert: { key: 'global' } },
    { upsert: true, returnDocument: 'after' }
  );
}

function idFor(item: any) {
  return String(item?.id || item?._id || `${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

function serialize(item: any) {
  return { ...item, id: idFor(item) };
}

function mapLead(inquiry: any) {
  const id = idFor(inquiry);
  return {
    ...inquiry,
    id,
    leadId: `INQ-${id.slice(-8).toUpperCase()}`,
    companyName: inquiry.company || '',
    whatsApp: inquiry.phone || '',
    country: '',
    productName: inquiry.productRef || '',
    serviceRequired: 'Supplier Research',
    targetBudget: '',
    status: String(inquiry.status || 'new').toUpperCase(),
    internalNotes: inquiry.notes || [],
  };
}

export async function GET(request: NextRequest) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const resource = request.nextUrl.pathname.split('/').pop();

    if (resource === 'blog' || resource === 'machinery' || resource === 'services') {
      const settings = await getSettings();
      if (resource === 'blog') return NextResponse.json({ posts: (settings.blogPosts || []).map(serialize) });
      if (resource === 'services') return NextResponse.json({ services: (settings.servicePackages || []).map(serialize) });

      const groups = new Map<string, any>();
      for (const item of settings.machineryCatalog || []) {
        const categoryId = item.categoryId || 'general';
        if (!groups.has(categoryId)) groups.set(categoryId, { id: categoryId, name: categoryId === 'general' ? 'General Machinery' : categoryId, overview: '', machinery: [] });
        groups.get(categoryId).machinery.push(serialize(item));
      }
      return NextResponse.json({ machineryCategories: Array.from(groups.values()) });
    }

    if (resource === 'projects') {
      const projects = await CaseStudy.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json({ projects: projects.map((project: any) => ({ ...project, id: project._id.toString(), clientCountry: project.location, productType: project.productCategory, buyerRequirement: project.excerpt })) });
    }

    if (resource === 'leads') {
      const status = request.nextUrl.searchParams.get('status');
      const query = request.nextUrl.searchParams.get('q')?.trim();
      const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
      let leads = inquiries.map(mapLead);
      if (status && status !== 'ALL') leads = leads.filter((lead) => lead.status === status);
      if (query) {
        const normalized = query.toLowerCase();
        leads = leads.filter((lead) => JSON.stringify(lead).toLowerCase().includes(normalized));
      }
      return NextResponse.json({ leads });
    }

    if (resource === 'media') {
      const result = await cloudinary.api.resources({ type: 'upload', resource_type: 'image', max_results: 100 });
      const media = result.resources.map((item: any) => ({
        id: item.public_id,
        fileName: item.public_id.split('/').pop(),
        fileUrl: item.secure_url,
      }));
      return NextResponse.json({ media });
    }
    return NextResponse.json({ error: 'Unknown admin resource' }, { status: 404 });
  } catch (error: unknown) {
    return NextResponse.json({ error: errorMessage(error, 'Unable to load admin resource') }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const resource = request.nextUrl.pathname.split('/').pop();
    const body = await request.json();
    await connectDB();

    if (resource === 'blog' || resource === 'machinery' || resource === 'services') {
      const settings = await getSettings();
      if (resource === 'blog') {
        if (!body.title || !body.content) return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
        settings.blogPosts.push({ id: crypto.randomUUID(), ...body, publishedAt: new Date() });
        await settings.save();
        return NextResponse.json({ success: true });
      }
      if (resource === 'machinery') {
        if (!body.name || !body.overview || !body.categoryId) return NextResponse.json({ error: 'Name, category, and overview are required' }, { status: 400 });
        settings.machineryCatalog.push({ id: crypto.randomUUID(), ...body });
        await settings.save();
        return NextResponse.json({ success: true });
      }
      settings.servicePackages.push({ id: crypto.randomUUID(), ...body });
      await settings.save();
      return NextResponse.json({ success: true });
    }

    if (resource === 'projects') {
      if (!body.title || !body.buyerRequirement) return NextResponse.json({ error: 'Title and buyer requirement are required' }, { status: 400 });
      const project = await CaseStudy.create({
        title: body.title,
        slug: `${slugify(body.title)}-${Date.now()}`,
        clientName: body.clientCountry || 'Client',
        location: body.clientCountry || '',
        productCategory: body.productType || '',
        excerpt: body.buyerRequirement,
        content: [body.sourcingChallenge, body.workPerformed, body.result].filter(Boolean).join('\n\n'),
        isPublished: true,
      });
      return NextResponse.json({ success: true, project: { ...project.toObject(), id: project._id.toString() } });
    }

    return NextResponse.json({ error: 'Unsupported admin resource' }, { status: 400 });
  } catch (error: unknown) {
    return NextResponse.json({ error: errorMessage(error, 'Unable to save admin resource') }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const resource = request.nextUrl.pathname.split('/').pop();
    const body = await request.json();
    await connectDB();
    const settings = await getSettings();
    const collections: Record<string, string> = { blog: 'blogPosts', machinery: 'machineryCatalog', services: 'servicePackages' };
    if (resource && collections[resource]) {
      const items = settings[collections[resource]] || [];
      const index = items.findIndex((item: any) => idFor(item) === String(body.id));
      if (index < 0) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
      items[index] = { ...items[index], ...body, id: idFor(items[index]) };
      settings[collections[resource]] = items;
      await settings.save();
      return NextResponse.json({ success: true, item: serialize(items[index]) });
    }
    if (resource === 'projects') {
      const project = await CaseStudy.findByIdAndUpdate(body.id, {
        title: body.title,
        clientName: body.clientCountry || 'Client',
        location: body.clientCountry || '',
        productCategory: body.productType || '',
        excerpt: body.buyerRequirement || '',
        content: [body.sourcingChallenge, body.workPerformed, body.result].filter(Boolean).join('\n\n'),
      }, { new: true, runValidators: true });
      if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      return NextResponse.json({ success: true, project });
    }
    return NextResponse.json({ error: 'Unsupported admin resource' }, { status: 400 });
  } catch (error: unknown) {
    return NextResponse.json({ error: errorMessage(error, 'Unable to update admin resource') }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const resource = request.nextUrl.pathname.split('/').pop();
    const id = request.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Item id is required' }, { status: 400 });
    await connectDB();

    if (resource === 'projects') {
      const project = await CaseStudy.findByIdAndDelete(id);
      return project ? NextResponse.json({ success: true }) : NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    if (resource === 'media') {
      await cloudinary.uploader.destroy(id);
      return NextResponse.json({ success: true });
    }
    const settings = await getSettings();
    const collections: Record<string, string> = { blog: 'blogPosts', machinery: 'machineryCatalog', services: 'servicePackages' };
    if (!resource || !collections[resource]) return NextResponse.json({ error: 'Unsupported admin resource' }, { status: 400 });
    const items = settings[collections[resource]] || [];
    const nextItems = items.filter((item: any) => idFor(item) !== id);
    if (nextItems.length === items.length) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    settings[collections[resource]] = nextItems;
    await settings.save();
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: errorMessage(error, 'Unable to delete admin resource') }, { status: 500 });
  }
}
