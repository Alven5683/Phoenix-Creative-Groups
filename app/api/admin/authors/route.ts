import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Author from "@/models/Author";

export async function GET() {
  await dbConnect();
  const authors = await Author.find({});
  return NextResponse.json(authors);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { name, role, avatar, social } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const exists = await Author.findOne({ name });
  if (exists) return NextResponse.json({ error: "Author exists" }, { status: 400 });
  const author = await Author.create({ name, role, avatar, social });
  return NextResponse.json(author);
}
