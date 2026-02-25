import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Author from "@/models/Author";

export async function GET() {
  await dbConnect();
  const authors = await Author.find({});
  const mapped = authors.map((author: any) => ({
    ...author.toObject(),
    facebook: author.social?.facebook || "",
    linkedin: author.social?.linkedin || "",
  }));
  return NextResponse.json(mapped);
}
