import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProductCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductCategorySchema = new Schema<IProductCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    featuredImage: { type: String, default: '' },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

const ProductCategory: Model<IProductCategory> =
  mongoose.models.ProductCategory ?? mongoose.model<IProductCategory>('ProductCategory', ProductCategorySchema);

export default ProductCategory;
