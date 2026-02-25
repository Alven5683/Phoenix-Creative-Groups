import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Portfolio from '@/models/Portfolio';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const projects = await Portfolio.find({}).sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const data = await request.json();
  try {
    const project = await Portfolio.create(data);
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const data = await request.json();
  try {
    const project = await Portfolio.findByIdAndUpdate(data._id, data, { new: true });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const { _id } = await request.json();
  try {
    await Portfolio.findByIdAndDelete(_id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 400 });
  }
}
