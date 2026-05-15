import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, isAdminConfigured } from "@/lib/firebase-admin";
import { recordPurchase } from "@/lib/courses";

export async function POST(req: NextRequest) {
  const { courseId } = await req.json();
  if (!courseId) return NextResponse.json({ error: "Missing courseId" }, { status: 400 });

  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Not authenticated — please log in first" }, { status: 401 });
  }

  let uid: string;

  if (isAdminConfigured) {
    try {
      const decoded = await adminAuth.verifyIdToken(session);
      uid = decoded.uid;
    } catch (err) {
      console.error("[mock/purchase] verifyIdToken failed:", err);
      return NextResponse.json({ error: "Session expired — please log in again" }, { status: 401 });
    }
  } else {
    uid = "dev-user";
  }

  try {
    await recordPurchase(uid, courseId, "mock-checkout", 0);
    console.log(`[mock/purchase] recorded purchase: uid=${uid} courseId=${courseId}`);
  } catch (err) {
    console.error("[mock/purchase] recordPurchase failed:", err);
    return NextResponse.json({ error: "Failed to save purchase — check Firestore setup" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
