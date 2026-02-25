import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";

export async function requireAdmin() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
