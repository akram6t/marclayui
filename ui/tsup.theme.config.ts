import { defineConfig } from "tsup";

// Second, tiny build for the theme init script. No "use client" banner — it
// must stay importable from React Server Components.
export default defineConfig({
  entry: ["src/theme-init.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: false,
  target: "es2020",
  outExtension({ format }) {
    return { js: format === "esm" ? ".js" : ".cjs" };
  },
});
