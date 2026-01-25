import { NextResponse } from 'next/server';
import { getApprovedTestimonials, submitTestimonial, getPendingTestimonials } from '@/lib/testimonials';


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('pending')) {
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
