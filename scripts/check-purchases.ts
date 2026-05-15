import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore(app);

// Test write
const testId = "test_O2Z5xtVANTMyWKCqu4Nux5WPWu23_boxing-101";
try {
  await db.collection("purchases").doc(testId).set({
    uid: "O2Z5xtVANTMyWKCqu4Nux5WPWu23",
    course_id: "boxing-101",
    transaction_id: "mock-checkout",
    amount: 0,
    purchased_at: new Date().toISOString(),
  });
  console.log("✓ Write succeeded");
} catch (err) {
  console.error("✗ Write failed:", err);
}

// Read all purchases
const snap = await db.collection("purchases").get();
console.log(`Total purchase records: ${snap.size}`);
snap.forEach((doc) => {
  console.log(" →", doc.id, JSON.stringify(doc.data()));
});

// Cleanup test doc
await db.collection("purchases").doc(testId).delete();
console.log("✓ Cleaned up test doc");

process.exit(0);
