import { NextResponse } from 'next/server';
import { verifyAdminSecret, signAdminJwt, setAdminCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();

    if (!verifyAdminSecret(secret)) {
      return NextResponse.json({ error: 'Invalid admin secret' }, { status: 401 });
    }

    const token = signAdminJwt();
    await setAdminCookie(token);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Login failed' },
      { status: 500 }
    );
  }
}
