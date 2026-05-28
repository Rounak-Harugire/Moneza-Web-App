import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  profileCompletion: number;
  referralCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  profileCompletion: { type: Number, default: 0 },
  referralCode: { type: String, unique: true },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
