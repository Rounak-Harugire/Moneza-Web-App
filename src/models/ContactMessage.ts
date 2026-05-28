import mongoose, { Document, Schema } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Resolved';
  createdAt: Date;
  updatedAt: Date;
}

const contactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Unread', 'Read', 'Resolved'], default: 'Unread' }
}, { timestamps: true });

export const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', contactMessageSchema);
