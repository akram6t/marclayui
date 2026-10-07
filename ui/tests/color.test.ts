import { describe, expect, it } from "vitest";
import {
  alpha,
  darken,
  lighten,
  parseHex,
  readableInk,
  toHex,
} from "../src/utils/color";

describe("parseHex", () => {
  it("parses 6-digit hex", () => {
    expect(parseHex("#e0785a")).toEqual({ r: 224, g: 120, b: 90 });
  });
  it("parses 3-digit hex", () => {
    expect(parseHex("#f00")).toEqual({ r: 255, g: 0, b: 0 });
  });
  it("falls back to black on garbage", () => {
    expect(parseHex("not-a-color")).toEqual({ r: 0, g: 0, b: 0 });
  });
});

describe("mixing", () => {
  it("lighten(white, 1) stays white and darken(black, 1) stays black", () => {
    expect(lighten("#ffffff", 1)).toBe("#ffffff");
    expect(darken("#000000", 1)).toBe("#000000");
  });
  it("darken(terra, 1) is black", () => {
    expect(darken("#e0785a", 1)).toBe("#000000");
  });
  it("alpha formats rgba", () => {
    expect(alpha("#ff0000", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
  });
  it("toHex round-trips parseHex", () => {
    expect(toHex(parseHex("#e0785a"))).toBe("#e0785a");
  });
});

describe("readableInk", () => {
  it("picks near-white ink for dark tones", () => {
    expect(readableInk("#27211b")).toBe("#fff8f2");
  });
  it("picks dark ink for light tones", () => {
    expect(readableInk("#f5cd7a")).toBe("#3a2d20");
  });
});
