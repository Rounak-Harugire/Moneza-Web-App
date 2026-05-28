import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  category: string;
  emoji?: string;
  color?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  emoji: { type: String },
  color: { type: String },
  description: { type: String, required: true },
}, { timestamps: true });

export const Course = mongoose.model<ICourse>('Course', courseSchema);
