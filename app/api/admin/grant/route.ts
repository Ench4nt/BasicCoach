import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, isAdminConfigured } from "@/lib/firebase-admin";
import { recordPurchase } from "@/lib/courses";

async function verifyAdmin(): Promise<boolean> {
  if (!isAdminConfigured) return false;
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return false;
  try {
    const decoded = await adminAuth.verifyIdToken(session);
    return decoded.email === process.env.ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const { uid, courseId } = await req.json();
  if (!uid || !courseId) {
    return NextResponse.json({ error: "Missing uid or courseId" }, { status: 400 });
  }
  await recordPurchase(uid, courseId, "admin-grant", 0);
  return NextResponse.json({ ok: true });
}
