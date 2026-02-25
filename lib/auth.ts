import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const ADMIN_SECRET = process.env.ADMIN_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';
const COOKIE_NAME = 'phoenix_admin_token';

export function verifyAdminSecret(secret: string) {
	return Boolean(ADMIN_SECRET) && secret === ADMIN_SECRET;
}

export function signAdminJwt() {
	if (!JWT_SECRET) {
		throw new Error('JWT_SECRET is not configured');
	}
	return jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAdminJwt(token: string) {
	if (!JWT_SECRET) return null;
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch {
		return null;
	}
}

export async function isAdminAuthenticated() {
	const token = await getAdminToken();
	if (!token) return false;
	const payload = verifyAdminJwt(token) as { admin?: boolean } | null;
	return Boolean(payload?.admin);
}

// This function must be called inside a Next.js Server Action or Route Handler where cookies().set is available
export async function setAdminCookie(token: string) {
	const cookieStore = await cookies();
	cookieStore.set(COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
	});
}


export async function getAdminToken() {
	const cookieStore = await cookies();
	const token = cookieStore.get(COOKIE_NAME);
	return token?.value;
}

// This function must be called inside a Next.js Server Action or Route Handler where cookies().set is available
export async function clearAdminCookie() {
	const cookieStore = await cookies();
	cookieStore.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
}
