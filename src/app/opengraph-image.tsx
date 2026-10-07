import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MarclayUI — claymorphism + neumorphism components for React & Next.js";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ece4da",
          color: "#4a3f35",
          fontFamily: "sans-serif",
          gap: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "12px 34px",
            borderRadius: 999,
            fontSize: 24,
            fontWeight: 700,
            color: "#e0785a",
            background: "rgba(190,168,146,0.25)",
          }}
        >
          ● v0.4.0 — two style presets, one library
        </div>
        <div style={{ display: "flex", fontSize: 110, fontWeight: 700, letterSpacing: -2 }}>
          marclay<span style={{ color: "#e0785a" }}>ui</span>
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#97897b", maxWidth: 900, textAlign: "center" }}>
          Claymorphism + neumorphism components for React &amp; Next.js
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {["Light & dark", "Runtime theming", "26 components", "0 deps"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "10px 26px",
                borderRadius: 999,
                fontSize: 24,
                fontWeight: 700,
                color: "#fff8f2",
                background: "linear-gradient(145deg, #f09a7e, #e0785a)",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
