#!/usr/bin/env node
/**
 * Drift guard: every prop documented in a docs PropsTable must appear in the
 * package type definitions (dist/index.d.ts). Loose substring check — catches
 * renames and typos without full type resolution.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dts = readFileSync(join(root, "ui/dist/index.d.ts"), "utf8");
const pagesDir = join(root, "src/app/docs/components");

// props forwarded from native HTML attributes live on inherited interfaces,
// not as literal members — they are valid even though the substring check
// can't see them in the flattened d.ts body.
const NATIVE_FORWARD = new Set([
  "min", "max", "step", "checked", "rows", "cols", "name", "pattern",
  "multiple", "autoFocus", "value", "onChange", "defaultValue", "disabled",
  "placeholder", "type", "target", "rel",
]);

let failures = 0;
let checked = 0;

for (const slug of readdirSync(pagesDir)) {
  const pagePath = join(pagesDir, slug, "page.tsx");
  let page;
  try {
    if (!statSync(pagePath).isFile()) continue;
    page = readFileSync(pagePath, "utf8");
  } catch {
    continue;
  }
  // PropsTable rows look like { name: "variant", ... }
  const names = [...page.matchAll(/\bname:\s*"([^"]+)"/g)].map((m) => m[1]);
  const real = names.filter((n) => !n.includes("·") && !n.startsWith("…"));
  if (real.length === 0) continue;
  checked += real.length;
  for (const name of real) {
    // strip annotation suffixes: "value / defaultValue", "toast(options)"
    const tokens = name
      .split("/")
      .map((s) => s.trim().split(" ")[0].split("(")[0])
      .filter(Boolean);
    for (const token of tokens) {
      if (NATIVE_FORWARD.has(token)) continue;
      if (!dts.includes(token)) {
        console.error(`✗ /docs/components/${slug}: prop "${token}" not found in dist/index.d.ts`);
        failures += 1;
      }
    }
  }
}

console.log(`check:props — ${checked} documented props checked against type defs.`);
if (failures > 0) {
  console.error(`check:props — ${failures} drift failure(s).`);
  process.exit(1);
}
console.log("check:props — OK");
