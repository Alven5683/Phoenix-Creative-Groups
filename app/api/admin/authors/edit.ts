import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Author from "@/models/Author";
import { requireAdmin } from "@/lib/adminAuth";

export async function PUT(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await dbConnect();
  const body = await req.json();
  const oldName = body.oldName || body.name;
  const newName = body.newName || body.name;
  const facebook = body.facebook || body.social?.facebook || "";
  const linkedin = body.linkedin || body.social?.linkedin || "";
  const query = body._id ? { _id: body._id } : { name: oldName };

  if (!newName) {
    return NextResponse.json({ error: "Author name required" }, { status: 400 });
  }

  const updated = await Author.findOneAndUpdate(query, {
    name: newName,
    role: body.role,
    avatar: body.avatar,
    social: {
      ...(body.social || {}),
      facebook,
      linkedin,
    },
  }, { new: true });
  if (!updated) return NextResponse.json({ error: "Author not found" }, { status: 404 });
  return NextResponse.json(updated);
}
