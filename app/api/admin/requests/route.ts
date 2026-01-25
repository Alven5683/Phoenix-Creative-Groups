// API route for receiving website cost calculator requests
// POST only. Stores requests in a simple in-memory array (replace with DB in production).


import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import ProposalRequest from '@/models/ProposalRequest';


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


export async function GET() {
  await dbConnect();
  try {
    const requests = await ProposalRequest.find().sort({ createdAt: -1 });
    return NextResponse.json(requests);
  } catch (err: any) {
    return NextResponse.json([], { status: 500 });
  }
}
