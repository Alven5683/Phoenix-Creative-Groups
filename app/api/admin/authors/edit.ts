import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Author from "@/models/Author";

export async function PUT(req: NextRequest) {
  await dbConnect();
  const { oldName, newName, role, avatar, social } = await req.json();
  if (!oldName || !newName) return NextResponse.json({ error: "Both old and new names required" }, { status: 400 });
  const updated = await Author.findOneAndUpdate(
    { name: oldName },
    { name: newName, role, avatar, social },
    { new: true }
  );
  if (!updated) return NextResponse.json({ error: "Author not found" }, { status: 404 });
  return NextResponse.json(updated);
}
