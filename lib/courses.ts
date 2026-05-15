import { adminDb, isAdminConfigured } from "@/lib/firebase-admin";

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number; // in cents
  thumbnail: string;
  level: string;
  video_ids: string[];
  paddle_price_id: string;
}

export interface Video {
  id: string;
  course_id: string;
  title: string;
  bunny_video_id: string;
  order: number;
  duration?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_COURSES: Course[] = [
  {
    id: "boxing-101",
    title: "Boxing 101: The Fundamentals",
    description: "Learn proper stance, footwork, and the four basic punches from scratch. Perfect for complete beginners.",
    price: 2999,
    thumbnail: "",
    level: "Beginner",
    video_ids: ["boxing-101-v1", "boxing-101-v2", "boxing-101-v3"],
    paddle_price_id: "",
  },
  {
    id: "defense-basics",
    title: "Defense & Head Movement",
    description: "Master slipping, rolling, blocking, and parrying to avoid punches like a pro.",
    price: 3499,
    thumbnail: "",
    level: "Intermediate",
    video_ids: ["defense-v1", "defense-v2"],
    paddle_price_id: "",
  },
  {
    id: "combinations",
    title: "Combinations & Rhythm",
    description: "Chain punches together fluently, find your rhythm, and develop ring generalship.",
    price: 3999,
    thumbnail: "",
    level: "Intermediate",
    video_ids: ["combo-v1", "combo-v2", "combo-v3"],
    paddle_price_id: "",
  },
];

const MOCK_VIDEOS: Video[] = [
  { id: "boxing-101-v1", course_id: "boxing-101", title: "Stance & Guard", bunny_video_id: "a5c5f818-2f4c-4443-8ac3-448a2b32878d", order: 1, duration: "8:24" },
  { id: "boxing-101-v2", course_id: "boxing-101", title: "The Jab", bunny_video_id: "", order: 2, duration: "11:05" },
  { id: "boxing-101-v3", course_id: "boxing-101", title: "Cross, Hook & Uppercut", bunny_video_id: "", order: 3, duration: "14:30" },
  { id: "defense-v1", course_id: "defense-basics", title: "Slipping & Rolling", bunny_video_id: "", order: 1, duration: "10:15" },
  { id: "defense-v2", course_id: "defense-basics", title: "Blocking & Parrying", bunny_video_id: "", order: 2, duration: "9:50" },
  { id: "combo-v1", course_id: "combinations", title: "The 1-2", bunny_video_id: "", order: 1, duration: "7:40" },
  { id: "combo-v2", course_id: "combinations", title: "Body Shots", bunny_video_id: "", order: 2, duration: "9:10" },
  { id: "combo-v3", course_id: "combinations", title: "Ring Movement", bunny_video_id: "", order: 3, duration: "12:00" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export async function getCourses(): Promise<Course[]> {
  if (!isAdminConfigured) return MOCK_COURSES;
  const snap = await adminDb.collection("courses").get();
  if (snap.empty) return MOCK_COURSES;
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Course));
}

export async function getCourse(courseId: string): Promise<Course | null> {
  if (!isAdminConfigured) return MOCK_COURSES.find((c) => c.id === courseId) ?? null;
  const doc = await adminDb.collection("courses").doc(courseId).get();
  if (!doc.exists) return MOCK_COURSES.find((c) => c.id === courseId) ?? null;
  return { id: doc.id, ...doc.data() } as Course;
}

export async function getVideos(courseId: string): Promise<Video[]> {
  if (!isAdminConfigured)
    return MOCK_VIDEOS.filter((v) => v.course_id === courseId).sort((a, b) => a.order - b.order);
  const snap = await adminDb.collection("videos").where("course_id", "==", courseId).get();
  if (snap.empty) return MOCK_VIDEOS.filter((v) => v.course_id === courseId).sort((a, b) => a.order - b.order);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Video)).sort((a, b) => a.order - b.order);
}

export async function getVideo(videoId: string): Promise<Video | null> {
  if (!isAdminConfigured) return MOCK_VIDEOS.find((v) => v.id === videoId) ?? null;
  const doc = await adminDb.collection("videos").doc(videoId).get();
  if (!doc.exists) return MOCK_VIDEOS.find((v) => v.id === videoId) ?? null;
  return { id: doc.id, ...doc.data() } as Video;
}

export async function hasPurchased(uid: string, courseId: string): Promise<boolean> {
  if (!isAdminConfigured) return false;
  const doc = await adminDb.collection("purchases").doc(`${uid}_${courseId}`).get();
  return doc.exists;
}

export async function recordPurchase(
  uid: string,
  courseId: string,
  transactionId: string,
  amount: number
): Promise<void> {
  await adminDb.collection("purchases").doc(`${uid}_${courseId}`).set({
    uid,
    course_id: courseId,
    transaction_id: transactionId,
    amount,
    purchased_at: new Date().toISOString(),
  });
}

export async function revokePurchase(uid: string, courseId: string): Promise<void> {
  await adminDb.collection("purchases").doc(`${uid}_${courseId}`).delete();
}

export async function getAllPurchases(): Promise<{ uid: string; course_id: string }[]> {
  if (!isAdminConfigured) return [];
  const snap = await adminDb.collection("purchases").get();
  return snap.docs.map((d) => d.data() as { uid: string; course_id: string });
}
