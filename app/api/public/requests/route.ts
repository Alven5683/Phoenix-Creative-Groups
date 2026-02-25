import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import ProposalRequest from "@/models/ProposalRequest";

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  try {
    const created = await ProposalRequest.create(data);
    return NextResponse.json({ success: true, id: created._id });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
