import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Portfolio from "@/models/Portfolio";

export async function GET() {
  await dbConnect();
  const projects = await Portfolio.find({}).sort({ createdAt: -1 });
  return NextResponse.json(projects);
}
