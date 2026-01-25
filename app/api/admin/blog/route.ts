import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import BlogPost from '@/models/BlogPost';

export async function GET() {
  await dbConnect();
  const posts = await BlogPost.find({})
    .populate('author', 'name')
    .populate('category', 'name')
    .sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  // ...existing code...
  // Validate author and category fields
  function isValidObjectId(id: any) {
    return typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
  }
  if (!isValidObjectId(data.author)) {
    return NextResponse.json({ error: 'Invalid author ObjectId', value: data.author }, { status: 400 });
  }
  if (!isValidObjectId(data.category)) {
    return NextResponse.json({ error: 'Invalid category ObjectId', value: data.category }, { status: 400 });
  }
  try {
    const post = await BlogPost.create(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('BlogPost create error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create post', valueType: typeof error.value, value: error.value }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  const data = await request.json();
  try {
    const post = await BlogPost.findByIdAndUpdate(data._id, data, { new: true });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  await dbConnect();
  const { _id } = await request.json();
  try {
    await BlogPost.findByIdAndDelete(_id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 400 });
  }
}
