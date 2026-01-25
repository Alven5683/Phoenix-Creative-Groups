
import { dbConnect } from './db';
import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  quote: String,
  rating: { type: Number, min: 1, max: 5, required: true, default: 5 },
  approved: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);


export async function getApprovedTestimonials() {
  await dbConnect();
  return Testimonial.find({ approved: true }).sort({ createdAt: -1 });
}


export async function submitTestimonial(data: any) {
  await dbConnect();
  return Testimonial.create({ ...data, approved: false });
}


export async function getPendingTestimonials() {
  await dbConnect();
  return Testimonial.find({ approved: false }).sort({ createdAt: -1 });
}


export async function approveTestimonial(id: string) {
  await dbConnect();
  return Testimonial.findByIdAndUpdate(id, { approved: true }, { new: true });
}
