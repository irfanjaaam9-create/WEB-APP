import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await checkAdminAuth(req);
  if (!admin) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await req.json();
    const { name, categoryId, description, moq, estPriceRange, images, specifications, isFeatured } = body;

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    let slug = existingProduct.slug;
    if (name && name !== existingProduct.name) {
      const baseSlug = slugify(name);
      slug = baseSlug;
      let count = 1;
      while (await prisma.product.findFirst({ where: { slug, NOT: { id } } })) {
        slug = `${baseSlug}-${count++}`;
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name ?? existingProduct.name,
        slug,
        categoryId: categoryId ?? existingProduct.categoryId,
        description: description ?? existingProduct.description,
        moq: moq !== undefined ? moq : existingProduct.moq,
        estPriceRange: estPriceRange !== undefined ? estPriceRange : existingProduct.estPriceRange,
        images: images !== undefined ? (typeof images === 'string' ? images : JSON.stringify(images)) : existingProduct.images,
        specifications: specifications !== undefined ? (typeof specifications === 'string' ? specifications : JSON.stringify(specifications)) : existingProduct.specifications,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : existingProduct.isFeatured,
      },
      include: { category: true },
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
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
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}
