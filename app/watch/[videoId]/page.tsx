import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, isAdminConfigured } from "@/lib/firebase-admin";
import { getVideo, hasPurchased } from "@/lib/courses";
import { getBunnyEmbedUrl, isBunnyConfigured } from "@/lib/bunny";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;

  // 1. Verify session
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) redirect("/login");

  let uid: string;
  if (isAdminConfigured) {
    try {
      const decoded = await adminAuth.verifyIdToken(session);
      uid = decoded.uid;
    } catch {
      redirect("/login");
    }
  } else {
    // Dev mode: skip auth verification
    uid = "dev-user";
  }

  // 2. Load video metadata
  const video = await getVideo(videoId);
  if (!video) redirect("/courses");

  // 3. Verify purchase (skipped in dev mode when neither service is configured)
  if (isAdminConfigured) {
    const purchased = await hasPurchased(uid, video.course_id);
    if (!purchased) redirect(`/courses/${video.course_id}`);
  }

  // 4. Generate signed Bunny Stream embed URL
  const embedUrl = getBunnyEmbedUrl(video.bunny_video_id);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-red-500 text-center">{video.title}</h1>

        <div className="w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-video shadow-2xl">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500">
              {isBunnyConfigured
                ? "Video not available"
                : "Bunny Stream not configured — add BUNNY_LIBRARY_ID and BUNNY_TOKEN_KEY to .env.local"}
            </div>
          )}
        </div>

        <a
          href={`/courses/${video.course_id}`}
          className="text-zinc-500 hover:text-white text-sm transition-colors"
        >
          ← Back to course
        </a>
      </div>
    </main>
  );
}
