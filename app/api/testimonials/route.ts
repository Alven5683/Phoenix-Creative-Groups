import { NextResponse } from 'next/server';
import { getApprovedTestimonials, submitTestimonial, getPendingTestimonials } from '@/lib/testimonials';
import { requireAdmin } from '@/lib/adminAuth';


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('pending')) {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    const testimonials = await getPendingTestimonials();
    return NextResponse.json(testimonials);
  }
  const testimonials = await getApprovedTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(req: Request) {
  const data = await req.json();
  // Store as pending approval
  const result = await submitTestimonial(data);
  return NextResponse.json(result);
}
