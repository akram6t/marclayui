import { describe, expect, it } from "vitest";
import { themeInitScript } from "../src/theme-init";

function boot(storage: Record<string, string>, prefersDark = false) {
  try {
    window.localStorage.clear();
  } catch {
    /* localStorage unavailable in this scenario */
  }
  for (const [k, v] of Object.entries(storage)) {
    try {
      window.localStorage.setItem(k, v);
    } catch {
      /* ignore — exercising the no-storage path */
    }
  }
  window.matchMedia = ((query: string) => ({
    matches: query.includes("dark") ? prefersDark : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-preset");
  // eslint-disable-next-line no-new-func
  new Function(themeInitScript)();
}

describe("themeInitScript", () => {
  it("applies the stored theme before paint", () => {
    boot({ "mcl-theme": "dark" });
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("follows the OS preference when nothing is stored", () => {
    boot({}, true);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    boot({}, false);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("applies the stored neo preset", () => {
    boot({ "mcl-preset": "neo" });
    expect(document.documentElement.getAttribute("data-preset")).toBe("neo");
  });

  it("leaves data-preset unset for the default clay preset", () => {
    boot({ "mcl-preset": "clay" });
    expect(document.documentElement.getAttribute("data-preset")).toBeNull();
  });

  it("never throws without localStorage", () => {
    const original = window.localStorage;
    Object.defineProperty(window, "localStorage", { value: undefined, configurable: true });
    expect(() => boot({})).not.toThrow();
    Object.defineProperty(window, "localStorage", { value: original, configurable: true });
  });
});
