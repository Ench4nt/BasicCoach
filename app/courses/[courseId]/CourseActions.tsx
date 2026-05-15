"use client";

import { useEffect, useState } from "react";
import BuyButton from "./BuyButton";

interface CourseActionsProps {
  courseId: string;
  courseTitle: string;
  price: number;
  uid: string | null;
  paddlePriceId: string;
  serverPurchased: boolean;
}

export default function CourseActions({
  courseId,
  courseTitle,
  price,
  uid,
  paddlePriceId,
  serverPurchased,
}: CourseActionsProps) {
  const [purchased, setPurchased] = useState(serverPurchased);

  useEffect(() => {
    const mocks: string[] = JSON.parse(localStorage.getItem("mock_purchases") || "[]");
    if (serverPurchased) {
      // Ensure localStorage stays in sync
      if (!mocks.includes(courseId)) {
        localStorage.setItem("mock_purchases", JSON.stringify([...mocks, courseId]));
      }
    } else {
      // Server says not purchased — remove from localStorage so it doesn't override
      if (mocks.includes(courseId)) {
        localStorage.setItem("mock_purchases", JSON.stringify(mocks.filter((id) => id !== courseId)));
      }
      setPurchased(false);
    }
  }, [courseId, serverPurchased]);

  if (purchased) {
    return (
      <span className="bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg">
        Purchased
      </span>
    );
  }

  return (
    <BuyButton
      courseId={courseId}
      courseTitle={courseTitle}
      price={price}
      uid={uid}
      paddlePriceId={paddlePriceId}
    />
  );
}
