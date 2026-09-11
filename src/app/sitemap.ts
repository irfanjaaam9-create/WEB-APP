import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sourcebyzahid.com';

  const [products, posts] = await Promise.all([
    prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes = [
    '',
    '/services/pricing',
    '/product-sourcing',
    '/machinery-sourcing',
    '/products',
    '/how-it-works',
    '/projects',
    '/about',
    '/contact',
    '/faq',
    '/blog',
    '/privacy-policy',
    '/terms',
    '/refund-policy',
    '/machinery/pallet-making',
    '/machinery/biomass-pellet',
    '/machinery/roll-forming',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
