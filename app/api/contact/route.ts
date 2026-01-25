export async function GET() {
  try {
    await dbConnect();
    const requests = await ContactRequest.find().sort({ createdAt: -1 });
    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import ContactRequest from '@/models/ContactRequest';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const { name, email, subject, message } = data;
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const contactRequest = await ContactRequest.create({ name, email, subject, message });
    return NextResponse.json({ success: true, contactRequest });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}
