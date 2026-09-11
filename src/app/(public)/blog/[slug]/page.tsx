import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, Calendar, User, Send } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.metaTitle || post.title} | Source by Zahid`,
    description: post.metaDescription || post.excerpt,
  };
}

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post || !post.isPublished) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Sourcing Guides</span>
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1 font-semibold text-emerald-400">
            <User className="w-4 h-4" /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />{' '}
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-slate-300 leading-relaxed font-normal italic border-l-2 border-emerald-500 pl-4 py-1">
          {post.excerpt}
        </p>
      </div>

      {post.featuredImage && (
        <div className="h-80 sm:h-96 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Main Content Render */}
      <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
        <div className="whitespace-pre-line">{post.content}</div>
      </div>

      {/* Bottom CTA Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 pt-8">
        <h3 className="text-xl font-bold text-white">Need Practical On-Ground Sourcing Help in China?</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Send your product requirement to Zahid directly. We review feasibility and verify Chinese suppliers matching your specifications.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20"
        >
          <Send className="w-4 h-4" />
          <span>Send Your Product Request</span>
        </Link>
      </div>
    </article>
  );
}
