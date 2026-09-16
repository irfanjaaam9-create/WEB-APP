import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPolicyPage extends Document {
  slug: string;
  title: string;
  summary?: string;
  content: string;
  isPublished: boolean;
  updatedAt: Date;
}

const PolicyPageSchema = new Schema<IPolicyPage>(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: { type: String, required: [true, 'Title is required'], trim: true },
    summary: { type: String, default: '' },
    content: { type: String, required: [true, 'Content is required'] },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const PolicyPage: Model<IPolicyPage> =
  mongoose.models.PolicyPage ?? mongoose.model<IPolicyPage>('PolicyPage', PolicyPageSchema);

export default PolicyPage;
