import mongoose, { Schema, Document, model } from 'mongoose';

export interface IProposalRequest extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: string;
  pages: string;
  design: string;
  features: string[];
  total: number;
  createdAt: Date;
}

const ProposalRequestSchema = new Schema<IProposalRequest>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  type: { type: String, required: true },
  pages: { type: String, required: true },
  design: { type: String, required: true },
  features: { type: [String], default: [] },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ProposalRequest || model<IProposalRequest>('ProposalRequest', ProposalRequestSchema);
