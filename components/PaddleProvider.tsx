"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

const PaddleContext = createContext<Paddle | null>(null);

export function usePaddle() {
  return useContext(PaddleContext);
}

export function PaddleProvider({ children }: { children: React.ReactNode }) {
  const [paddle, setPaddle] = useState<Paddle | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (!token) return;
    initializePaddle({
      environment:
        process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production"
          ? "production"
          : "sandbox",
      token,
    }).then((p) => p && setPaddle(p));
  }, []);

  return (
    <PaddleContext.Provider value={paddle}>{children}</PaddleContext.Provider>
  );
}
