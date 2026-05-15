import { Environment, Paddle } from "@paddle/paddle-node-sdk";

export const isPaddleConfigured = !!process.env.PADDLE_API_KEY;

export const paddle = isPaddleConfigured
  ? new Paddle(process.env.PADDLE_API_KEY!, {
      environment:
        process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production"
          ? Environment.production
          : Environment.sandbox,
    })
  : null;
