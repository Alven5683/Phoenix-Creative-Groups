import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Portfolio from '@/models/Portfolio';

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const project = await Portfolio.findById(id);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const data = await request.json();
  try {
    const project = await Portfolio.findByIdAndUpdate(id, data, { new: true });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project', details: error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  try {
    await Portfolio.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project', details: error }, { status: 400 });
  }
}
