import { NextRequest, NextResponse } from 'next/server';
import Category from '@/models/Category';
import { dbConnect } from '@/lib/db';
import { requireAdmin } from '@/lib/adminAuth';

// DELETE /api/admin/categories/[name]
export async function DELETE(request: NextRequest, context: { params: Promise<{ name: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const { name } = await context.params;
  if (!name) {
    return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
  }
  try {
    const deleted = await Category.findOneAndDelete({ name });
    if (!deleted) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
