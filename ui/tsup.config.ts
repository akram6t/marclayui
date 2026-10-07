import { defineConfig } from "tsup";

// The main bundle carries a global "use client" banner: every component ships
// as a client component, which is what Next.js expects for hooks-bearing UI.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2020",
  external: ["react", "react-dom", "react/jsx-runtime"],
  banner: { js: '"use client";' },
  outExtension({ format }) {
    return { js: format === "esm" ? ".js" : ".cjs" };
  },
});
