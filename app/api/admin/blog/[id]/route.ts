
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import BlogPost from '@/models/BlogPost';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = await context.params;
  const post = await BlogPost.findOne({ slug: id })
    .populate('author', 'name')
    .populate('category', 'name');
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = context.params;
  const data = await request.json();
  try {
    const post = await BlogPost.findByIdAndUpdate(id, data, { new: true });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post', details: error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = context.params;
  try {
    await BlogPost.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post', details: error }, { status: 400 });
  }
}
