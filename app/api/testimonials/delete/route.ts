import { NextResponse } from 'next/server';
import { Testimonial } from '@/lib/testimonials';
import { dbConnect } from '@/lib/db';
import { requireAdmin } from '@/lib/adminAuth';

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await dbConnect();
  await Testimonial.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
