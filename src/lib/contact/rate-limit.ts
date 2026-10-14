import "server-only";
import { createHash } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

type Result = { allowed: boolean };

let upstash: Ratelimit | null | undefined;

function getUpstash() {
  if (upstash !== undefined) return upstash;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  upstash =
    url && token
      ? new Ratelimit({
          redis: new Redis({ url, token }),
          limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "10 m"),
          prefix: "lami:contact",
          analytics: false,
        })
      : null;
  return upstash;
}

// Fallback for local development or single-instance hosting. On serverless
// platforms each instance has its own memory, so this is best effort only.
const memory = new Map<string, number[]>();

function memoryLimit(key: string): Result {
  const now = Date.now();
  const hits = (memory.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_REQUESTS) {
    memory.set(key, hits);
    return { allowed: false };
  }
  hits.push(now);
  memory.set(key, hits);
  if (memory.size > 5000) {
    for (const [k, v] of memory) {
      if (v.every((t) => now - t >= WINDOW_MS)) memory.delete(k);
    }
  }
  return { allowed: true };
}

/** IPs are hashed before use so raw addresses are never stored. */
function keyFor(ip: string) {
  const salt = process.env.RATE_LIMIT_SALT ?? "lami-ventures";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export async function checkRateLimit(ip: string): Promise<Result> {
  const key = keyFor(ip);
  const limiter = getUpstash();
  if (!limiter) return memoryLimit(key);
  try {
    const { success } = await limiter.limit(key);
    return { allowed: success };
  } catch {
    console.error("contact: rate limiter unavailable, using in-memory fallback");
    return memoryLimit(key);
  }
}
