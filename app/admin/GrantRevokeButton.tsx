"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@/lib/courses";

interface Props {
  uid: string;
  courses: Course[];
  purchasedCourseIds: string[];
}

export default function GrantRevokeButton({ uid, courses, purchasedCourseIds }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function toggle(courseId: string, owned: boolean) {
    setLoading(courseId);
    await fetch(`/api/admin/${owned ? "revoke" : "grant"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, courseId }),
    });
    setLoading(null);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {courses.map((course) => {
        const owned = purchasedCourseIds.includes(course.id);
        const busy = loading === course.id;
        const label = course.title.split(":")[0];
        return (
          <button
            key={course.id}
            onClick={() => toggle(course.id, owned)}
            disabled={busy}
            className={`text-xs px-2.5 py-1 rounded-full font-medium border transition-colors duration-150 disabled:opacity-50 ${
              owned
                ? "bg-green-500/10 text-green-400 border-green-500/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
                : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/30"
            }`}
            title={owned ? `Revoke "${label}"` : `Grant "${label}"`}
          >
            {busy ? "..." : owned ? `✓ ${label}` : `+ ${label}`}
          </button>
        );
      })}
    </div>
  );
}
