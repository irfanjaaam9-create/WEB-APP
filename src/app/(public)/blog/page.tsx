import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { FileText, ArrowRight, Calendar, User } from 'lucide-react';

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          Practical Insights & SEO Guides
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          China Sourcing Guides & Articles
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          In-depth guides on finding reliable Chinese suppliers, negotiating MOQs, inspecting product samples, comparing quotations, and machinery procurement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
          >
            {post.featuredImage && (
              <div className="h-56 bg-slate-950 overflow-hidden relative">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-semibold text-emerald-400">
                    <User className="w-3.5 h-3.5" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />{' '}
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <h2 className="font-extrabold text-white text-xl leading-snug group-hover:text-emerald-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{post.excerpt}</p>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-400 hover:text-emerald-300 pt-2"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
