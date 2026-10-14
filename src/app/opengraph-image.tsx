import { ImageResponse } from "next/og";

export const alt = "Lami Ventures LLC — Building digital products. Connecting opportunities.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#15171b",
          color: "#f5f2ec",
          padding: "72px 80px",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, letterSpacing: -0.5 }}>
          <span style={{ fontWeight: 700 }}>Lami Ventures</span>
          <span style={{ width: 12, height: 12, background: "#2b50ff" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, letterSpacing: -3 }}>
          <span>Building digital products.</span>
          <span style={{ display: "flex" }}>
            Connecting opportunities<span style={{ color: "#7d95ff" }}>.</span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#a3a6ad",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 28,
          }}
        >
          <span>Websites · Software · AI automation</span>
          <span>Collectibles · Devices · Hardware</span>
        </div>
      </div>
    ),
    size,
  );
}
