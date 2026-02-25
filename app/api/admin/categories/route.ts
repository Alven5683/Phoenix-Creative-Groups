import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Category from "@/models/Category";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const categories = await Category.find({});
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const exists = await Category.findOne({ name });
  if (exists) return NextResponse.json({ error: "Category exists" }, { status: 400 });
  const category = await Category.create({ name });
  return NextResponse.json(category);
}
