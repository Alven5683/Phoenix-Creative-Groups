import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { requireAdmin } from '@/lib/adminAuth';

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id, status } = await req.json();
  if (!id || !['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  await dbConnect();
  const update: any = { approved: false, rejected: false };
  if (status === 'approved') update.approved = true;
  if (status === 'rejected') update.rejected = true;
  const result = await Testimonial.findByIdAndUpdate(id, update, { new: true });
  return NextResponse.json(result);
}
