import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Category from "@/models/Category";
import { requireAdmin } from "@/lib/adminAuth";

export async function DELETE(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
  await Category.deleteOne({ name });
  return NextResponse.json({ success: true });
}
