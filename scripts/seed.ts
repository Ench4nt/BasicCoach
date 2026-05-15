/**
 * Seed script — run with:
 *   bun scripts/seed.ts
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const courses = [
  {
    id: "boxing-101",
    title: "Boxing 101: The Fundamentals",
    description:
      "Learn proper stance, footwork, and the four basic punches from scratch. Perfect for complete beginners.",
    price: 2999,
    thumbnail: "",
    level: "Beginner",
    video_ids: ["boxing-101-v1", "boxing-101-v2", "boxing-101-v3"],
  },
  {
    id: "defense-basics",
    title: "Defense & Head Movement",
    description:
      "Master slipping, rolling, blocking, and parrying to avoid punches like a pro.",
    price: 3499,
    thumbnail: "",
    level: "Intermediate",
    video_ids: ["defense-v1", "defense-v2"],
  },
];

const videos = [
  { id: "boxing-101-v1", course_id: "boxing-101", title: "Stance & Guard", bunny_video_id: "BUNNY_VIDEO_ID_HERE", order: 1, duration: "8:24" },
  { id: "boxing-101-v2", course_id: "boxing-101", title: "The Jab", bunny_video_id: "videos/boxing-101/02-jab.mp4", order: 2, duration: "11:05" },
  { id: "boxing-101-v3", course_id: "boxing-101", title: "Cross, Hook & Uppercut", bunny_video_id: "videos/boxing-101/03-cross-hook-uppercut.mp4", order: 3, duration: "14:30" },
  { id: "defense-v1", course_id: "defense-basics", title: "Slipping & Rolling", bunny_video_id: "videos/defense/01-slipping-rolling.mp4", order: 1, duration: "10:15" },
  { id: "defense-v2", course_id: "defense-basics", title: "Blocking & Parrying", bunny_video_id: "videos/defense/02-blocking-parrying.mp4", order: 2, duration: "9:50" },
];

async function seed() {
  console.log("Seeding courses...");
  const { error: courseErr } = await supabase.from("courses").upsert(courses);
  if (courseErr) throw courseErr;
  console.log(`  ✓ ${courses.length} courses`);

  console.log("Seeding videos...");
  const { error: videoErr } = await supabase.from("videos").upsert(videos);
  if (videoErr) throw videoErr;
  console.log(`  ✓ ${videos.length} videos`);

  console.log("Done!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
