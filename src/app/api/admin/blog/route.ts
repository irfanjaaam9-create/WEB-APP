import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ success: true, posts });
}

export async function POST(req: NextRequest) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  try {
    const body = await req.json();
    const { title, excerpt, content, featuredImage, categoryId, metaTitle, metaDescription, tags, isPublished } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let count = 1;
    while (await prisma.blogPost.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || title,
        content,
        featuredImage: featuredImage || null,
        categoryId: categoryId || null,
        author: admin.name || 'Zahid',
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt || '',
        tags: typeof tags === 'string' ? tags : JSON.stringify(tags || []),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: error.message || 'Failed to create blog post' }, { status: 500 });
  }
}
