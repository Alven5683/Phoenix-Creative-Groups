import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import BlogPost from "@/models/BlogPost";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  const isObjectId = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);

  const post = isObjectId
    ? await BlogPost.findById(id).populate("author", "name role avatar").populate("category", "name")
    : await BlogPost.findOne({ slug: id }).populate("author", "name role avatar").populate("category", "name");

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
