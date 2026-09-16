import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICaseImage {
  url: string;
  public_id: string;
}

export interface ICaseStudy extends Document {
  title: string;
  slug: string;
  clientName: string;
  location: string;
  excerpt: string;
  content: string;
  images: ICaseImage[];
  productCategory?: string;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CaseImageSchema = new Schema<ICaseImage>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { _id: false }
);

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    clientName: { type: String, required: [true, 'Client name is required'], trim: true },
    location: { type: String, required: [true, 'Location is required'], trim: true },
    excerpt: { type: String, maxlength: 400, default: '' },
    content: { type: String, required: [true, 'Content is required'] },
    images: [CaseImageSchema],
    productCategory: { type: String, default: '' },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Auto-slug from title
CaseStudySchema.pre('validate', function (next: any) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

// Set publishedAt when first published
CaseStudySchema.pre('save', function (next: any) {
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const CaseStudy: Model<ICaseStudy> =
  mongoose.models.CaseStudy ?? mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);

export default CaseStudy;
