import { getCourse, getVideos, hasPurchased } from "@/lib/courses";
import { adminAuth, isAdminConfigured } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import CourseActions from "./CourseActions";
import VideoList from "./VideoList";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const [course, videos] = await Promise.all([
    getCourse(courseId),
    getVideos(courseId),
  ]);

  if (!course) notFound();

  // Check if user is logged in and has purchased
  let purchased = false;
  let uid: string | null = null;
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (session && isAdminConfigured) {
    try {
      const decoded = await adminAuth.verifyIdToken(session);
      uid = decoded.uid;
      purchased = await hasPurchased(uid, courseId);
    } catch {
      // Invalid session — treat as logged out
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Course header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="relative w-full md:w-72 h-48 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
            {course.thumbnail && (
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1">
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wide">
              {course.level}
            </span>
            <h1 className="text-3xl font-bold mt-1 mb-3">{course.title}</h1>
            <p className="text-zinc-400 mb-6">{course.description}</p>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">
                ${(course.price / 100).toFixed(2)}
              </span>
              <CourseActions
                courseId={courseId}
                courseTitle={course.title}
                price={course.price}
                uid={uid}
                paddlePriceId={course.paddle_price_id}
                serverPurchased={purchased}
              />
            </div>
          </div>
        </div>

        {/* Video list */}
        <h2 className="text-xl font-bold mb-4">Course Content</h2>
        <VideoList videos={videos} courseId={courseId} serverPurchased={purchased} />
      </div>
    </main>
  );
}
