import { createHash } from "crypto";

const LIBRARY_ID = process.env.BUNNY_LIBRARY_ID;
const TOKEN_KEY = process.env.BUNNY_TOKEN_KEY;

export const isBunnyConfigured = !!(LIBRARY_ID && TOKEN_KEY);

export function getBunnyEmbedUrl(bunnyVideoId: string): string {
  if (!isBunnyConfigured || !bunnyVideoId) return "";

  const expires = Math.floor(Date.now() / 1000) + 3600; // 1 hour TTL
  const token = createHash("sha256")
    .update(TOKEN_KEY! + bunnyVideoId + expires)
    .digest("hex");

  return `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${bunnyVideoId}?token=${token}&expires=${expires}&autoplay=false&responsive=true`;
}
