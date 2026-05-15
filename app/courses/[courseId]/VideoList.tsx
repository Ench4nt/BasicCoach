"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Video } from "@/lib/courses";

interface VideoListProps {
  videos: Video[];
  courseId: string;
  serverPurchased: boolean;
}

export default function VideoList({ videos, courseId, serverPurchased }: VideoListProps) {
  const [purchased, setPurchased] = useState(serverPurchased);

  useEffect(() => {
    const mocks: string[] = JSON.parse(localStorage.getItem("mock_purchases") || "[]");
    if (serverPurchased) {
      if (!mocks.includes(courseId)) {
        localStorage.setItem("mock_purchases", JSON.stringify([...mocks, courseId]));
      }
    } else {
      if (mocks.includes(courseId)) {
        localStorage.setItem("mock_purchases", JSON.stringify(mocks.filter((id) => id !== courseId)));
      }
      setPurchased(false);
    }
  }, [courseId, serverPurchased]);

  return (
    <div className="space-y-3">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="flex items-center gap-4 bg-zinc-900 rounded-xl px-5 py-4 border border-zinc-800"
        >
          <span className="text-zinc-500 text-sm w-6 text-center">{index + 1}</span>
          <div className="flex-1">
            <p className="font-medium">{video.title}</p>
            {video.duration && (
              <p className="text-zinc-500 text-sm">{video.duration}</p>
            )}
          </div>
          {purchased ? (
            <Link
              href={`/watch/${video.id}`}
              className="text-red-500 hover:text-red-400 text-sm font-semibold"
            >
              Watch
            </Link>
          ) : (
            <svg className="w-4 h-4 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
