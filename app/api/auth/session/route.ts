import { NextRequest, NextResponse } from "next/server";
import { adminAuth, isAdminConfigured } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();

  // Verify the token is valid before setting the cookie
  if (isAdminConfigured) await adminAuth.verifyIdToken(idToken);

  const response = NextResponse.json({ ok: true });
  response.cookies.set("session", idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("session");
  return response;
}
