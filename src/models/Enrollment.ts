import mongoose, { Document, Schema } from 'mongoose';

export interface IEnrollment extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  progress: number;
  isCompleted: boolean;
  enrolledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  progress: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  enrolledAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Prevent duplicate enrollment for same course and user combination
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export const Enrollment = mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);
