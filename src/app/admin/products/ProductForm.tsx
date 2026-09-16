'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/actions/products';
import { Upload, X, Plus, Loader2 } from 'lucide-react';
import { ensureCsrfToken } from '@/lib/csrf';

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  
  // State for dynamic arrays
  const [features, setFeatures] = useState<string[]>(initialData?.features || ['']);
  
  // State for Map (specs)
  const initialSpecs = initialData?.specifications 
    ? Object.entries(initialData.specifications).map(([k, v]) => ({ key: k, value: v as string }))
    : [{ key: '', value: '' }];
  const [specs, setSpecs] = useState(initialSpecs);

  // State for Images
  const [images, setImages] = useState<{url: string, public_id: string}[]>(initialData?.images || []);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setCsrfToken(ensureCsrfToken());
    fetch('/api/admin/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => setCategories([]));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'products');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setImages([...images, { url: data.url, public_id: data.public_id }]);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Upload failed');
    }
    setIsUploading(false);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data: any = {
      csrfToken,
      title: formData.get('title'),
      slug: formData.get('slug'),
      category: formData.get('category'),
      shortDesc: formData.get('shortDesc'),
      brochureUrl: formData.get('brochureUrl'),
      isPublished: formData.get('isPublished') === 'on',
      features: features.filter(f => f.trim() !== ''),
      images,
    };

    // Convert specs array to object for Map
    const specsObj: Record<string, string> = {};
    specs.forEach(s => {
      if (s.key.trim() && s.value.trim()) {
        specsObj[s.key.trim()] = s.value.trim();
      }
    });
    data.specifications = specsObj;

    const res = initialData 
      ? await updateProduct(initialData._id, data)
      : await createProduct(data);

    if (res.success) {
      router.push('/admin/products');
    } else {
      setError(res.error || 'Failed to save product');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold font-heading mb-4 border-b border-slate-100 pb-2">Basic Information</h2>
            
            <div>
              <label className="admin-label mb-2 block">Product Title *</label>
              <input name="title" required defaultValue={initialData?.title} className="admin-input" />
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="admin-label mb-2 block">Slug (Optional - Auto generated)</label>
                <input name="slug" defaultValue={initialData?.slug} className="admin-input" placeholder="e.g. psa-oxygen-generator-10l" />
              </div>
              <div>
                <label className="admin-label mb-2 block">Category *</label>
                <select name="category" required defaultValue={initialData?.category || ''} className="admin-input">
                  <option value="" disabled>Select a category</option>
                  {categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="admin-label mb-2 block">Short Description *</label>
              <textarea name="shortDesc" required defaultValue={initialData?.shortDesc} rows={3} className="admin-input h-auto"></textarea>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold font-heading mb-4 border-b border-slate-100 pb-2">Technical Specifications</h2>
            {specs.map((spec, index) => (
              <div key={index} className="flex gap-3">
                <input 
                  placeholder="Key (e.g. Purity)" 
                  value={spec.key} 
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[index].key = e.target.value;
                    setSpecs(newSpecs);
                  }}
                  className="admin-input w-1/3" 
                />
                <input 
                  placeholder="Value (e.g. 93% ± 3%)" 
                  value={spec.value} 
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[index].value = e.target.value;
                    setSpecs(newSpecs);
                  }}
                  className="admin-input flex-1" 
                />
                <button type="button" onClick={() => setSpecs(specs.filter((_, i) => i !== index))} className="p-2 text-slate-400 hover:text-red-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setSpecs([...specs, { key: '', value: '' }])} className="text-sm text-primary font-bold flex items-center gap-1 hover:underline">
              <Plus className="w-4 h-4" /> Add Specification Row
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold font-heading mb-4 border-b border-slate-100 pb-2">Key Features</h2>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3">
                <input 
                  value={feature} 
                  onChange={(e) => {
                    const newFeatures = [...features];
                    newFeatures[index] = e.target.value;
                    setFeatures(newFeatures);
                  }}
                  className="admin-input flex-1" 
                  placeholder="e.g. Energy efficient operation"
                />
                <button type="button" onClick={() => setFeatures(features.filter((_, i) => i !== index))} className="p-2 text-slate-400 hover:text-red-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setFeatures([...features, ''])} className="text-sm text-primary font-bold flex items-center gap-1 hover:underline">
              <Plus className="w-4 h-4" /> Add Feature
            </button>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold font-heading mb-4 border-b border-slate-100 pb-2">Publishing</h2>
            <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
              <input type="checkbox" name="isPublished" defaultChecked={initialData?.isPublished} className="w-5 h-5 text-primary rounded border-slate-300 focus:ring-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-900">Publish Product</span>
                <span className="text-xs text-slate-500">Make it visible on the public site</span>
              </div>
            </label>
            <button disabled={isSubmitting || !csrfToken} type="submit" className="w-full btn-primary h-12 disabled:opacity-60 disabled:cursor-not-allowed">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Product'}
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold font-heading mb-4 border-b border-slate-100 pb-2">Product Images</h2>
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                  <img src={img.url} alt="Product" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <label className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 hover:border-primary hover:text-primary transition-colors cursor-pointer bg-slate-50">
                {isUploading ? <Loader2 className="w-6 h-6 animate-spin mb-2" /> : <Upload className="w-6 h-6 mb-2" />}
                <span className="text-xs font-medium text-center px-2">{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold font-heading mb-4 border-b border-slate-100 pb-2">Attachments</h2>
            <div>
              <label className="admin-label mb-2 block">Brochure URL</label>
              <input name="brochureUrl" defaultValue={initialData?.brochureUrl} className="admin-input" placeholder="https://..." />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
