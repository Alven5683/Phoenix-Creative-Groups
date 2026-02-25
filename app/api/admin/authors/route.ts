import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Author from "@/models/Author";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const authors = await Author.find({});
  const mapped = authors.map((author: any) => ({
    ...author.toObject(),
    facebook: author.social?.facebook || "",
    linkedin: author.social?.linkedin || "",
  }));
  return NextResponse.json(mapped);
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const { name, role, avatar, social, facebook, linkedin } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const exists = await Author.findOne({ name });
  if (exists) return NextResponse.json({ error: "Author exists" }, { status: 400 });
  const author = await Author.create({
    name,
    role,
    avatar,
    social: {
      ...(social || {}),
      facebook: facebook || social?.facebook || "",
      linkedin: linkedin || social?.linkedin || "",
    },
  });
  return NextResponse.json(author);
}
