import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';
import { getSession } from '@/lib/session';

const defaults = [
  { id: 'pallet-making', name: 'Pallet-Making Machinery', slug: 'pallet-making', overview: 'Industrial pallet production and wood recycling equipment.' },
  { id: 'biomass-pellet', name: 'Biomass Pellet Equipment', slug: 'biomass-pellet', overview: 'Biomass processing and pellet production equipment.' },
  { id: 'roll-forming', name: 'Roll-Forming Machines', slug: 'roll-forming', overview: 'Continuous roll-forming and profile production machinery.' },
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

async function settings() {
  return SiteSettings.findOneAndUpdate({ key: 'global' }, { $setOnInsert: { key: 'global', machineryCategories: defaults } }, { upsert: true, returnDocument: 'after' });
}

async function admin() {
  const session = await getSession();
  return session?.role === 'admin';
}

export async function GET() {
  if (!(await admin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const site = await settings();
  if (!site.machineryCategories?.length) {
    site.machineryCategories = defaults;
    await site.save();
  }
  const categories = site.machineryCategories.map((category: any) => ({
    ...category,
    machinery: (site.machineryCatalog || [])
      .filter((machine: any) => machine.categoryId === category.id)
      .map((machine: any) => ({ ...machine, id: String(machine.id || machine._id) })),
  }));
  return NextResponse.json({ categories });
}

export async function POST(request: NextRequest) {
  if (!(await admin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const name = String(body.name || '').trim();
  if (!name) return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
  await connectDB();
  const site = await settings();
  const slug = slugify(name);
  if (site.machineryCategories.some((category: any) => category.slug === slug)) return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
  const category = { id: crypto.randomUUID(), name, slug, overview: String(body.overview || '').trim(), featuredImage: String(body.featuredImage || '').trim() };
  site.machineryCategories.push(category);
  site.markModified('machineryCategories');
  await site.save();
  return NextResponse.json({ success: true, category });
}

export async function PUT(request: NextRequest) {
  if (!(await admin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  await connectDB();
  const site = await settings();
  const index = site.machineryCategories.findIndex((category: any) => category.id === String(body.id));
  if (index < 0) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  const oldId = site.machineryCategories[index].id;
  const updated = { ...site.machineryCategories[index], name: String(body.name || '').trim(), slug: slugify(String(body.name || '')), overview: String(body.overview || '').trim(), featuredImage: String(body.featuredImage || '').trim() };
  site.machineryCategories[index] = updated;
  if (oldId !== updated.id) site.machineryCatalog.forEach((machine: any) => { if (machine.categoryId === oldId) machine.categoryId = updated.id; });
  site.markModified('machineryCategories');
  site.markModified('machineryCatalog');
  await site.save();
  return NextResponse.json({ success: true, category: updated });
}

export async function DELETE(request: NextRequest) {
  if (!(await admin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Category id is required' }, { status: 400 });
  await connectDB();
  const site = await settings();
  if ((site.machineryCatalog || []).some((machine: any) => machine.categoryId === id)) return NextResponse.json({ error: 'Move or delete machinery in this category first' }, { status: 409 });
  const before = site.machineryCategories.length;
  site.machineryCategories = site.machineryCategories.filter((category: any) => category.id !== id);
  if (before === site.machineryCategories.length) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  site.markModified('machineryCategories');
  await site.save();
  return NextResponse.json({ success: true });
}