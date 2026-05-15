"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function HeroCTA() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href="/courses"
        className="inline-flex items-center justify-center h-12 px-7 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-xl transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
      >
        Browse Courses
      </Link>

      {!loading && !user && (
        <Link
          href="/signup"
          className="inline-flex items-center justify-center h-12 px-7 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white font-semibold rounded-xl border border-zinc-700 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
        >
          Create Free Account
        </Link>
      )}
    </div>
  );
}
