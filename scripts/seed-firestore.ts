import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

const courses = [
  { id: "boxing-101", title: "Boxing 101: The Fundamentals", description: "Learn proper stance, footwork, and the four basic punches from scratch. Perfect for complete beginners.", price: 2999, thumbnail: "", level: "Beginner", video_ids: ["boxing-101-v1", "boxing-101-v2", "boxing-101-v3"], paddle_price_id: "" },
  { id: "defense-basics", title: "Defense & Head Movement", description: "Master slipping, rolling, blocking, and parrying to avoid punches like a pro.", price: 3499, thumbnail: "", level: "Intermediate", video_ids: ["defense-v1", "defense-v2"], paddle_price_id: "" },
  { id: "combinations", title: "Combinations & Rhythm", description: "Chain punches together fluently, find your rhythm, and develop ring generalship.", price: 3999, thumbnail: "", level: "Intermediate", video_ids: ["combo-v1", "combo-v2", "combo-v3"], paddle_price_id: "" },
];

const videos = [
  { id: "boxing-101-v1", course_id: "boxing-101", title: "Stance & Guard", bunny_video_id: "a5c5f818-2f4c-4443-8ac3-448a2b32878d", order: 1, duration: "8:24" },
  { id: "boxing-101-v2", course_id: "boxing-101", title: "The Jab", bunny_video_id: "", order: 2, duration: "11:05" },
  { id: "boxing-101-v3", course_id: "boxing-101", title: "Cross, Hook & Uppercut", bunny_video_id: "", order: 3, duration: "14:30" },
  { id: "defense-v1", course_id: "defense-basics", title: "Slipping & Rolling", bunny_video_id: "", order: 1, duration: "10:15" },
  { id: "defense-v2", course_id: "defense-basics", title: "Blocking & Parrying", bunny_video_id: "", order: 2, duration: "9:50" },
  { id: "combo-v1", course_id: "combinations", title: "The 1-2", bunny_video_id: "", order: 1, duration: "7:40" },
  { id: "combo-v2", course_id: "combinations", title: "Body Shots", bunny_video_id: "", order: 2, duration: "9:10" },
  { id: "combo-v3", course_id: "combinations", title: "Ring Movement", bunny_video_id: "", order: 3, duration: "12:00" },
];

async function seed() {
  for (const course of courses) {
    const { id, ...data } = course;
    await db.collection("courses").doc(id).set(data);
    console.log(`✓ course: ${id}`);
  }
  for (const video of videos) {
    const { id, ...data } = video;
    await db.collection("videos").doc(id).set(data);
    console.log(`✓ video: ${id}`);
  }
  console.log("Seed complete.");
}

seed().catch(console.error);
