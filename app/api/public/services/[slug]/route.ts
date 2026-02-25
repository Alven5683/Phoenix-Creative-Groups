import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Service from "@/models/Service";

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  const { slug } = await context.params;
  const service = await Service.findOne({ slug });
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }
  return NextResponse.json(service);
}
