import { NextRequest, NextResponse } from "next/server";
import { paddle } from "@/lib/paddle-server";
import { recordPurchase } from "@/lib/courses";
import { EventName } from "@paddle/paddle-node-sdk";


export async function POST(req: NextRequest) {
  if (!paddle) {
    return NextResponse.json({ error: "Paddle not configured" }, { status: 503 });
  }

  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 503 });
  }

  const signature = req.headers.get("paddle-signature") ?? "";
  const rawBody = await req.text();

  let event;
  try {
    event = paddle.webhooks.unmarshal(rawBody, webhookSecret, signature);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (event.eventType === EventName.TransactionCompleted) {
    const txn = event.data as any;
    const customData = txn.customData as Record<string, string> | null;
    const userId = customData?.userId;
    const courseId = customData?.courseId;
    const amount = txn.details?.totals?.grandTotal ?? 0;

    if (userId && courseId) {
      await recordPurchase(userId, courseId, txn.id, Number(amount));
    }
  }

  return NextResponse.json({ ok: true });
}
