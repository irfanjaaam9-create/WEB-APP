import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  productRef?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  notes: {
    id: string;
    content: string;
    author: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    fullName: { type: String, required: [true, 'Full name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    phone: { type: String, trim: true, default: '' },
    company: { type: String, trim: true, default: '' },
    productRef: { type: String, trim: true, default: '' }, // product slug or title
    message: { type: String, required: [true, 'Message is required'], maxlength: 2000 },
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new',
    },
    notes: {
      type: [
        {
          id: { type: String, required: true },
          content: { type: String, required: true },
          author: { type: String, default: 'Admin' },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry ?? mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
