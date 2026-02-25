import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Service from '@/models/Service';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const services = await Service.find({}).sort({ createdAt: -1 });
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const data = await request.json();
  try {
    const service = await Service.create(data);
    return NextResponse.json(service, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const data = await request.json();
  try {
    const service = await Service.findByIdAndUpdate(data._id, data, { new: true });
    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const { _id } = await request.json();
  try {
    await Service.findByIdAndDelete(_id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 400 });
  }
}
