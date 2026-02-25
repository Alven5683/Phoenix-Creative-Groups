import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import BlogPost from "@/models/BlogPost";

export async function GET(request: NextRequest) {
  await dbConnect();
  const searchParams = request.nextUrl.searchParams;
  const relatedTo = searchParams.get("relatedTo");

  const query: Record<string, unknown> = {};
  if (relatedTo) {
    query.slug = { $ne: relatedTo };
  }

  const posts = await BlogPost.find(query)
    .populate("author", "name role avatar")
    .populate("category", "name")
    .sort({ createdAt: -1 });

  return NextResponse.json(posts);
}
