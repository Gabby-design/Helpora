interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const trackers = new Map<string, RateLimitRecord>();

/**
 * Clean expired rate limit records periodically
 */
function cleanupExpired() {
  const now = Date.now();
  trackers.forEach((record, key) => {
    if (record.resetAt <= now) {
      trackers.delete(key);
    }
  });
}

/**
 * Simple in-memory rate limiter for auth routes
 * @param identifier IP or user key
 * @param maxRequests Maximum allowed attempts in window
 * @param windowMs Window duration in milliseconds (default: 60s)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60000
): { success: boolean; remaining: number; resetInSec: number } {
  cleanupExpired();

  const now = Date.now();
  const record = trackers.get(identifier);

  if (!record || record.resetAt <= now) {
    trackers.set(identifier, {
      count: 1,
      resetAt: now + windowMs
    });
    return {
      success: true,
      remaining: maxRequests - 1,
      resetInSec: Math.ceil(windowMs / 1000)
    };
  }

  if (record.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetInSec: Math.max(1, Math.ceil((record.resetAt - now) / 1000))
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: maxRequests - record.count,
    resetInSec: Math.max(1, Math.ceil((record.resetAt - now) / 1000))
  };
}
