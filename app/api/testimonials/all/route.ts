import { NextResponse } from 'next/server';

import { dbConnect } from '@/lib/db';
import { Testimonial } from '@/lib/testimonials';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const testimonials = await Testimonial.find({});
  const mapped = testimonials.map((t: any) => ({
    id: t._id.toString(),
    name: t.name,
    role: t.role,
    image: t.image,
    quote: t.quote,
    rating: t.rating,
    approved: t.approved,
    rejected: t.rejected,
    createdAt: t.createdAt,
  }));
  return NextResponse.json(mapped);
}
