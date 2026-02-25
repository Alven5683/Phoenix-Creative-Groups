import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Service from '@/models/Service';
import { requireAdmin } from '@/lib/adminAuth';

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const params = await context.params;
  const slug = params.slug;
  const service = await Service.findOne({ slug });
  if (!service) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }
  return NextResponse.json(service);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const params = await context.params;
  const slug = params.slug;
  const body = await request.json();

  // Find the service by slug
  const service = await Service.findOne({ slug });
  if (!service) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  // Update fields (adjust as needed for your schema)
  if (body.title !== undefined) service.title = body.title;
  if (body.description !== undefined) service.description = body.description;
  if (body.image !== undefined) service.image = body.image;
  if (body.seoTitle !== undefined) service.seoTitle = body.seoTitle;
  if (body.seoDescription !== undefined) service.seoDescription = body.seoDescription;
  // Add more fields as needed

  await service.save();
  return NextResponse.json(service);
}
