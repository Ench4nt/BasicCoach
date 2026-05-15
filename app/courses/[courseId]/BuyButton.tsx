"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePaddle } from "@/components/PaddleProvider";
import MockCheckout from "@/components/MockCheckout";

interface BuyButtonProps {
  courseId: string;
  courseTitle: string;
  price: number;
  uid: string | null;
  paddlePriceId: string;
}

export default function BuyButton({
  courseId,
  courseTitle,
  price,
  uid,
  paddlePriceId,
}: BuyButtonProps) {
  const router = useRouter();
  const paddle = usePaddle();
  const [showMock, setShowMock] = useState(false);

  function handleBuy() {
    if (!uid) {
      router.push(`/login?redirect=/courses/${courseId}`);
      return;
    }

    // Use real Paddle if configured, otherwise open mock
    if (paddle && paddlePriceId) {
      paddle.Checkout.open({
        items: [{ priceId: paddlePriceId, quantity: 1 }],
        customData: { userId: uid, courseId },
      });
    } else {
      setShowMock(true);
    }
  }

  function handleSuccess() {
    setShowMock(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={handleBuy}
        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-6 py-2.5 rounded-lg transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
      >
        {uid ? `Buy for $${(price / 100).toFixed(2)}` : "Sign in to Buy"}
      </button>

      {showMock && (
        <MockCheckout
          courseId={courseId}
          courseTitle={courseTitle}
          price={price}
          onClose={() => setShowMock(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
