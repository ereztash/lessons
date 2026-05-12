/**
 * Chalk-based logger with verbose/normal/error/diagnostic levels.
 *
 * Kept minimal on purpose: no pino/winston dependency, no timestamps in normal
 * mode (the CLI is meant to feel like a single linear progress stream).
 */

import chalk from "chalk";

export interface Logger {
  info: (msg: string) => void;
  success: (msg: string) => void;
  warn: (msg: string) => void;
  error: (msg: string) => void;
  debug: (msg: string) => void;
  step: (msg: string) => void;
  setVerbose: (v: boolean) => void;
}

export function createLogger(initialVerbose = false): Logger {
  let verbose = initialVerbose;

  return {
    info: (msg: string): void => {
      // info is plain so it composes with other prefixes (the caller decides
      // which icon to use).
      console.log(msg);
    },
    success: (msg: string): void => {
      console.log(chalk.green("✓") + " " + msg);
    },
    warn: (msg: string): void => {
      console.warn(chalk.yellow("⚠") + " " + msg);
    },
    error: (msg: string): void => {
      console.error(chalk.red("✗") + " " + chalk.red(msg));
    },
    debug: (msg: string): void => {
      if (verbose) {
        console.log(chalk.gray("  → " + msg));
      }
    },
    step: (msg: string): void => {
      console.log(chalk.cyan("▶") + " " + chalk.bold(msg));
    },
    setVerbose: (v: boolean): void => {
      verbose = v;
    },
  };
}

/** Module-level default logger (lazy-created). */
let defaultLogger: Logger | null = null;
export function getLogger(): Logger {
  if (!defaultLogger) defaultLogger = createLogger(false);
  return defaultLogger;
}
