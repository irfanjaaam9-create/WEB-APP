import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'editor'],
      default: 'editor',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const plainPassword = String(this.password || '');
  if (!plainPassword) {
    throw new Error('Password is required');
  }

  this.password = await bcrypt.hash(plainPassword, 12);
});

UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  const storedPassword = this.password || '';
  return bcrypt.compare(String(candidate || ''), storedPassword);
};

const User: Model<IUser> = mongoose.models.User ?? mongoose.model<IUser>('User', UserSchema);

export default User;
