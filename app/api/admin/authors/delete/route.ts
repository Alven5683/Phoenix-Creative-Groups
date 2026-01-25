import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Author from "@/models/Author";

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { _id } = await req.json();
  if (!_id) return NextResponse.json({ error: "Author ID required" }, { status: 400 });
  await Author.deleteOne({ _id });
  return NextResponse.json({ success: true });
}
