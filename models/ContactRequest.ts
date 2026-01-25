import mongoose, { Schema, Document, models } from 'mongoose';

export interface IContactRequest extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date;
}

const ContactRequestSchema: Schema = new Schema<IContactRequest>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.ContactRequest || mongoose.model<IContactRequest>('ContactRequest', ContactRequestSchema);
