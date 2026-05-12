/**
 * Template-dep allowlist — anything NOT here counts as "domain-specific".
 *
 * Sourced from Lovable's vite_react_shadcn_ts default scaffolding plus common
 * additions Lovable's bot tends to install on day one. The classifier compares
 * a repo's package.json `dependencies` (production only) against this set; the
 * residue is the project's specificity signal.
 *
 * IMPORTANT: This list is intentionally generous. We'd rather under-count
 * domain deps (forcing Tier B/C → Tier C/D) than over-count and let an
 * abandoned skeleton masquerade as a real project.
 */

/** Exact-match template package names. */
const TEMPLATE_EXACT = new Set<string>([
  // React core
  "react",
  "react-dom",
  "react-router-dom",

  // Build
  "vite",
  "typescript",
  "@vitejs/plugin-react",
  "@vitejs/plugin-react-swc",

  // Tailwind
  "tailwindcss",
  "autoprefixer",
  "postcss",
  "tailwind-merge",
  "tailwindcss-animate",

  // shadcn/ui core
  "class-variance-authority",
  "clsx",
  "lucide-react",

  // Linting
  "eslint",
  "prettier",

  // Forms — Lovable's template installs these, so they're "template" here
  // (even though they're real libs in non-template repos).
  "react-hook-form",
  "@hookform/resolvers",
  "zod",

  // Common template extras
  "sonner",
  "cmdk",
  "next-themes",
  "date-fns",
  "recharts",
  "embla-carousel-react",
  "vaul",
  "input-otp",
  "react-day-picker",
  "react-resizable-panels",

  // Build tooling
  "globals",
]);

/** Prefixes that mark a whole namespace as template. */
const TEMPLATE_PREFIXES: readonly string[] = [
  "@radix-ui/",
  "@types/",
  "@typescript-eslint/",
  "eslint-plugin-",
];

/**
 * Decide if a single dep is a template dep.
 */
export function isTemplateDep(name: string): boolean {
  if (TEMPLATE_EXACT.has(name)) return true;
  for (const prefix of TEMPLATE_PREFIXES) {
    if (name.startsWith(prefix)) return true;
  }
  return false;
}

/**
 * Partition a list of dep names into (template, domain-specific).
 */
export function partitionDeps(deps: string[]): {
  template: string[];
  domainSpecific: string[];
} {
  const template: string[] = [];
  const domainSpecific: string[] = [];
  for (const d of deps) {
    if (isTemplateDep(d)) template.push(d);
    else domainSpecific.push(d);
  }
  return { template, domainSpecific };
}
