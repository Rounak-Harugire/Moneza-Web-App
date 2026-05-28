import mongoose, { Document, Schema } from 'mongoose';

export interface IReferral extends Document {
  referrer: mongoose.Types.ObjectId;
  referredUser: mongoose.Types.ObjectId;
  status: 'Pending' | 'Completed';
  reward?: string;
  createdAt: Date;
  updatedAt: Date;
}

const referralSchema = new Schema<IReferral>({
  referrer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  referredUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  reward: { type: String }
}, { timestamps: true });

export const Referral = mongoose.model<IReferral>('Referral', referralSchema);
