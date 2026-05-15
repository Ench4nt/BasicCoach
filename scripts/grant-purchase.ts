import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const [, , uid, courseId] = process.argv;
if (!uid || !courseId) {
  console.error("Usage: bun run scripts/grant-purchase.ts <uid> <courseId>");
  process.exit(1);
}

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore(app);

await db.collection("purchases").doc(`${uid}_${courseId}`).set({
  uid,
  course_id: courseId,
  transaction_id: "manual-grant",
  amount: 0,
  purchased_at: new Date().toISOString(),
});

console.log(`✓ Granted: uid=${uid} courseId=${courseId}`);
process.exit(0);
