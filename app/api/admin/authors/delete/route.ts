import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Author from "@/models/Author";
import { requireAdmin } from "@/lib/adminAuth";

export async function DELETE(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const { _id } = await req.json();
  if (!_id) return NextResponse.json({ error: "Author ID required" }, { status: 400 });
  await Author.deleteOne({ _id });
  return NextResponse.json({ success: true });
}
