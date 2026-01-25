import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Service from '@/models/Service';

export async function GET() {
  await dbConnect();
  const services = await Service.find({}).sort({ createdAt: -1 });
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  // ...existing code...
  try {
    const service = await Service.create(data);
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service', details: error }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  const data = await request.json();
  // ...existing code...
  try {
    const service = await Service.findByIdAndUpdate(data._id, data, { new: true });
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service', details: error }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  await dbConnect();
  const { _id } = await request.json();
  try {
    await Service.findByIdAndDelete(_id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service', details: error }, { status: 400 });
  }
}
