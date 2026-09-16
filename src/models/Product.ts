import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductImage {
  url: string;
  public_id: string;
}

export interface IProduct extends Document {
  title: string;
  slug: string;
  category: string;
  shortDesc: string;
  specifications: Map<string, string>;
  features: string[];
  images: IProductImage[];
  brochureUrl?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductImageSchema = new Schema<IProductImage>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    shortDesc: { type: String, required: [true, 'Short description is required'], maxlength: 300 },
    specifications: {
      type: Map,
      of: String,
      default: new Map(),
    },
    features: [{ type: String, trim: true }],
    images: [ProductImageSchema],
    brochureUrl: { type: String, default: '' },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate slug from title if not provided
ProductSchema.pre('validate', function (next: any) {
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

const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>('Product', ProductSchema);

export default Product;


