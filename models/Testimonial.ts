import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
  approved: boolean;
  rejected?: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  quote: { type: String, required: true },
  rating: { type: Number, required: true },
  approved: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default models.Testimonial || model<ITestimonial>('Testimonial', TestimonialSchema);
