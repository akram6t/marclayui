/** Minimal color helpers used by MarclayProvider to derive shades and clay glows. */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

const WHITE: RGB = { r: 255, g: 255, b: 255 };
const BLACK: RGB = { r: 0, g: 0, b: 0 };

function clamp(n: number, min = 0, max = 255): number {
  return Math.min(max, Math.max(min, n));
}

export function parseHex(hex: string): RGB {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6 || /[^0-9a-f]/i.test(h)) return { ...BLACK };
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function toHex(c: RGB): string {
  const part = (v: number) => clamp(Math.round(v)).toString(16).padStart(2, "0");
  return `#${part(c.r)}${part(c.g)}${part(c.b)}`;
}

export function rgba(c: RGB, a: number): string {
  return `rgba(${clamp(Math.round(c.r))}, ${clamp(Math.round(c.g))}, ${clamp(Math.round(c.b))}, ${a})`;
}

export function mix(a: RGB, b: RGB, t: number): RGB {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

export function lighten(hex: string, t: number): string {
  return toHex(mix(parseHex(hex), WHITE, t));
}

export function darken(hex: string, t: number): string {
  return toHex(mix(parseHex(hex), BLACK, t));
}

export function alpha(hex: string, a: number): string {
  return rgba(parseHex(hex), a);
}

/** Picks near-black or near-white text depending on the tone's luminance. */
export function readableInk(base: string): string {
  const { r, g, b } = mix(parseHex(base), WHITE, 0.12);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.62 ? "#3a2d20" : "#fff8f2";
}
