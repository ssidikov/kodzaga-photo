interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();
let nextCleanupAt = 0;

function cleanup(now: number) {
  if (now < nextCleanupAt) return;
  nextCleanupAt = now + 5 * 60 * 1000;
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}

export function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  cleanup(now);
  const entry = store.get(identifier);

  if (!entry || entry.resetAt < now) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}
