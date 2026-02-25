import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Category from "@/models/Category";
import { requireAdmin } from "@/lib/adminAuth";

export async function PUT(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const { oldName, newName } = await req.json();
  if (!oldName || !newName) return NextResponse.json({ error: "Both old and new names required" }, { status: 400 });
  const updated = await Category.findOneAndUpdate({ name: oldName }, { name: newName }, { new: true });
  if (!updated) return NextResponse.json({ error: "Category not found" }, { status: 404 });
  return NextResponse.json(updated);
}
