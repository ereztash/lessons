/**
 * Polite GitHub usage:
 *  - p-limit caps in-flight requests to N (default 3) so we don't burst-fire.
 *  - Exponential backoff retry helper for transient 5xx / abuse-detection /
 *    secondary rate-limit responses. Octokit's @octokit/plugin-throttling
 *    handles primary rate limits in the client itself; this helper is for
 *    everything else (network jitter, 502s from GitHub edge, etc.).
 */

import pLimit, { type LimitFunction } from "p-limit";
import type { Logger } from "../util/logger.js";

const DEFAULT_CONCURRENCY = 3;
const DEFAULT_MAX_RETRIES = 4;
const DEFAULT_BASE_DELAY_MS = 800;

/** Caller-facing handle that hands out the concurrency-gated runner. */
export interface RateLimiter {
  /** Run an async task subject to concurrency + retry rules. */
  run: <T>(label: string, fn: () => Promise<T>) => Promise<T>;
  /** Raw p-limit, in case a caller wants concurrency-only with custom retry. */
  limit: LimitFunction;
}

export interface RateLimiterOptions {
  concurrency?: number;
  maxRetries?: number;
  baseDelayMs?: number;
  logger?: Logger;
}

export function createRateLimiter(opts: RateLimiterOptions = {}): RateLimiter {
  const concurrency = opts.concurrency ?? DEFAULT_CONCURRENCY;
  const maxRetries = opts.maxRetries ?? DEFAULT_MAX_RETRIES;
  const baseDelay = opts.baseDelayMs ?? DEFAULT_BASE_DELAY_MS;
  const logger = opts.logger;
  const limit = pLimit(concurrency);

  async function runWithRetry<T>(
    label: string,
    fn: () => Promise<T>,
  ): Promise<T> {
    let attempt = 0;
    let lastError: unknown;

    while (attempt <= maxRetries) {
      try {
        return await fn();
      } catch (err: unknown) {
        lastError = err;
        attempt += 1;
        if (!isRetryable(err) || attempt > maxRetries) {
          throw err;
        }
        const wait = computeBackoff(attempt, baseDelay, err);
        logger?.debug(
          `retry ${label} (attempt ${attempt}/${maxRetries}) after ${wait}ms: ` +
            describeError(err),
        );
        await sleep(wait);
      }
    }

    // Unreachable in practice, but TS wants it.
    throw lastError;
  }

  return {
    limit,
    run: <T>(label: string, fn: () => Promise<T>): Promise<T> =>
      limit(() => runWithRetry(label, fn)),
  };
}

/** Decide if an error is worth retrying. */
function isRetryable(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as { status?: number; code?: string; message?: string };

  // Standard transient HTTP statuses
  if (e.status === 502 || e.status === 503 || e.status === 504) return true;

  // Secondary rate limit / abuse detection — GitHub returns 403 with a
  // specific message we can pattern-match. Primary rate limit (429) is
  // already handled by the throttling plugin.
  if (
    e.status === 403 &&
    typeof e.message === "string" &&
    (/secondary rate limit/i.test(e.message) ||
      /abuse detection/i.test(e.message))
  ) {
    return true;
  }

  // Network-level errors
  if (
    e.code === "ECONNRESET" ||
    e.code === "ETIMEDOUT" ||
    e.code === "ENOTFOUND" ||
    e.code === "EAI_AGAIN"
  ) {
    return true;
  }

  return false;
}

function computeBackoff(attempt: number, baseDelay: number, err: unknown): number {
  // Honor Retry-After if present (Octokit surfaces it via headers on err).
  const retryAfter = readRetryAfter(err);
  if (retryAfter !== null) return retryAfter * 1000;

  // Exponential with full jitter to avoid thundering herd.
  const expo = baseDelay * Math.pow(2, attempt - 1);
  const jitter = Math.random() * expo;
  return Math.min(60_000, Math.floor(jitter + expo / 2));
}

function readRetryAfter(err: unknown): number | null {
  if (!err || typeof err !== "object") return null;
  // Octokit attaches response on RequestError.
  const e = err as {
    response?: { headers?: Record<string, string | undefined> };
  };
  const headerVal = e.response?.headers?.["retry-after"];
  if (!headerVal) return null;
  const n = parseInt(headerVal, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function describeError(err: unknown): string {
  if (!err) return "unknown error";
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  return JSON.stringify(err);
}

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
