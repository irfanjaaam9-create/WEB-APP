'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit, Trash2, Loader2, CheckCircle, X, Upload } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const deletePost = async (id: string) => {
    if (!window.confirm('Delete this article?')) return;
    const response = await fetch(`/api/admin/blog?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (response.ok) loadPosts();
  };

  const editPost = (post: any) => {
    setEditingId(post.id);
    setTitle(post.title || '');
    setExcerpt(post.excerpt || '');
    setContent(post.content || '');
    setFeaturedImage(post.featuredImage || '');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/blog', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, title, excerpt, content, featuredImage }),
      });

      if (res.ok) {
        setTitle('');
        setExcerpt('');
        setContent('');
        setFeaturedImage('');
        setEditingId(null);
        setModalOpen(false);
        loadPosts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <FileText className="w-7 h-7 text-emerald-400" />
            <span>Blog & SEO Sourcing Guides</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">Publish articles, supplier guides, and SEO content.</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setTitle('');
            setExcerpt('');
            setContent('');
            setFeaturedImage('');
            setModalOpen(true);
          }}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Article</span>
        </button>
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-400 flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading blog posts...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{post.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{post.excerpt}</p>
                <div className="text-[10px] text-emerald-400 mt-2">Published: {new Date(post.publishedAt).toLocaleDateString()}</div>
              </div>
              <div className="flex gap-2"><button onClick={() => editPost(post)} className="p-2 text-slate-400 hover:text-white" title="Edit article"><Edit className="w-4 h-4" /></button><button onClick={() => deletePost(post.id)} className="p-2 text-slate-400 hover:text-red-400" title="Delete article"><Trash2 className="w-4 h-4" /></button></div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">{editingId ? 'Edit Sourcing Guide' : 'Create Sourcing Guide'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                  placeholder="e.g. How to Negotiate Product Samples from Chinese Suppliers"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Excerpt / Summary</label>
                <input
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                  placeholder="Brief summary for preview cards..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Article Content (Markdown/HTML) *</label>
                <textarea
                  required
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white resize-none"
                  placeholder="Full article content..."
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="bg-emerald-500 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs">
                  {submitting ? 'Saving...' : editingId ? 'Update Guide' : 'Publish Guide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
