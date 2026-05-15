import { getCourses } from "@/lib/courses";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Boxing Fundamentals</h1>
        <p className="text-zinc-400 mb-10">
          Master the basics with step-by-step video courses taught by professionals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-colors"
            >
              <div className="relative h-48 bg-zinc-800">
                {course.thumbnail && (
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                )}
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  {course.level}
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-bold mb-1 group-hover:text-red-400 transition-colors">
                  {course.title}
                </h2>
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-xl">
                    ${(course.price / 100).toFixed(2)}
                  </span>
                  <span className="text-zinc-500 text-sm">
                    {course.video_ids?.length ?? 0} videos
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {courses.length === 0 && (
          <p className="text-zinc-500 text-center py-20">
            No courses available yet. Check back soon!
          </p>
        )}
      </section>
    </main>
  );
}
