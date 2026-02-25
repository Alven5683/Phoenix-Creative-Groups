import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Portfolio from "@/models/Portfolio";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await context.params;
  const project = await Portfolio.findById(id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}
