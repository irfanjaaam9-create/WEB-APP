'use client';

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Loader2, Copy, CheckCircle, Trash2 } from 'lucide-react';

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      if (data.media) setMediaList(data.media);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', files[0]);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) loadMedia();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteMedia = async (id: string) => {
    if (!window.confirm('Delete this media asset?')) return;
    const response = await fetch(`/api/admin/media?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (response.ok) loadMedia();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <ImageIcon className="w-7 h-7 text-emerald-400" />
            <span>Cloudinary Media Library</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            All product photos, factory footage, and case study assets stored securely in Cloudinary CDN.
          </p>
        </div>

        <label className="cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <span>{uploading ? 'Uploading to Cloudinary...' : 'Upload Media Asset'}</span>
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
        </label>
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-400 flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading Cloudinary media assets...</span>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="p-16 text-center bg-slate-900 border border-dashed border-slate-800 rounded-3xl space-y-2">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Media Uploaded Yet</h3>
          <p className="text-xs text-slate-400">Click "Upload Media Asset" to upload product or factory images.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaList.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group space-y-2 p-2">
              <div className="h-32 bg-slate-950 rounded-xl overflow-hidden relative">
                <img src={item.fileUrl} alt={item.fileName} className="w-full h-full object-cover" />
              </div>
              <div className="px-1 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 truncate max-w-[100px]">{item.fileName}</span>
                <div className="flex gap-1"><button onClick={() => copyToClipboard(item.fileUrl, item.id)} className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs" title="Copy Cloudinary URL">{copiedId === item.id ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}</button><button onClick={() => deleteMedia(item.id)} className="p-1 rounded bg-red-500/10 text-red-400" title="Delete media"><Trash2 className="w-3 h-3" /></button></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
