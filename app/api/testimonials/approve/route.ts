import { NextResponse } from 'next/server';
import { approveTestimonial } from '@/lib/testimonials';
import { requireAdmin } from '@/lib/adminAuth';

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const result = await approveTestimonial(id);
  return NextResponse.json(result);
}
