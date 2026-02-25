import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Category from "@/models/Category";

export async function GET() {
  await dbConnect();
  const categories = await Category.find({});
  return NextResponse.json(categories);
}
