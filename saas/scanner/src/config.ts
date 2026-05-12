/**
 * Load + validate environment configuration.
 *
 * `.env` is read once at startup. We fail-fast on missing required values
 * because there is no sensible default for GITHUB_TOKEN.
 */

import { config as loadDotenv } from "dotenv";
import { resolve } from "node:path";
import type { AppConfig } from "./types.js";

let cached: AppConfig | null = null;

/**
 * Read `.env`, validate, return a frozen config.
 * Cached so multiple imports don't re-parse `.env` on each call.
 */
export function loadConfig(envFile?: string): AppConfig {
  if (cached) return cached;

  loadDotenv(envFile ? { path: envFile } : undefined);

  const githubToken = (process.env.GITHUB_TOKEN ?? "").trim();
  const githubUsername = (process.env.GITHUB_USERNAME ?? "").trim();
  const outputDirRaw = (process.env.OUTPUT_DIR ?? "./output").trim();

  if (!githubToken) {
    throw new Error(
      "GITHUB_TOKEN is missing. Copy .env.example to .env and fill in a token " +
        "with `repo` + `read:user` scopes (https://github.com/settings/tokens).",
    );
  }

  if (!githubUsername) {
    throw new Error(
      "GITHUB_USERNAME is missing. Set it in .env to the username whose repos " +
        "should be scanned (typically your own).",
    );
  }

  // We don't enforce ghp_ / gho_ / github_pat_ prefixes because GitHub may add
  // new prefixes; we only sanity-check that it isn't the placeholder.
  if (githubToken === "ghp_replace_with_real_token") {
    throw new Error(
      "GITHUB_TOKEN is still the placeholder. Replace it with a real token.",
    );
  }

  cached = Object.freeze({
    githubToken,
    githubUsername,
    outputDir: resolve(process.cwd(), outputDirRaw),
  });

  return cached;
}

/** Mostly for tests — drop the cache so the next loadConfig() re-reads env. */
export function resetConfigCache(): void {
  cached = null;
}
