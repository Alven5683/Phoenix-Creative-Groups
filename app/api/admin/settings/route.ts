import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Setting from "@/models/Setting";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();
  const settings = await Setting.findOne({});
  return NextResponse.json(settings || {
    siteTitle: "",
    contactEmail: "",
    socialLinks: [],
    footerContent: "",
  });
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();
  const data = await req.json();
  const updated = await Setting.findOneAndUpdate(
    {},
    {
      siteTitle: data.siteTitle || "",
      contactEmail: data.contactEmail || "",
      socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
      footerContent: data.footerContent || "",
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return NextResponse.json(updated);
}
