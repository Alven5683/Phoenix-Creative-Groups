import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
  await dbConnect();
  const services = await Service.find({}).sort({ createdAt: -1 });
  return NextResponse.json(services);
}
