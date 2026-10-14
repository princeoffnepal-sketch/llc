import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Lami Ventures LLC — Building digital products. Connecting opportunities.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#15171b";
const INK_2 = "#1d2026";
const PAPER = "#f5f2ec";
const MIST = "#a3a6ad";
const ACCENT = "#2b50ff";
const ACCENT_SOFT = "#7d95ff";

// Static version of the hero illustration (see components/visuals/HeroVisual.tsx).
const visual = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 500" width="460" height="442" fill="none">
  <defs><pattern id="d" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs>
  <rect width="520" height="500" fill="url(#d)"/>
  <g stroke="${ACCENT_SOFT}" stroke-width="2" stroke-dasharray="5 9" stroke-linecap="round">
    <path d="M266 168 H300 V272"/><path d="M427 196 V290 H318"/><path d="M176 378 H236 V290 H282"/><path d="M300 308 V392 H334"/>
  </g>
  <rect x="76" y="40" width="190" height="128" rx="10" fill="${INK_2}" stroke="rgba(255,255,255,0.12)"/>
  <rect x="56" y="60" width="210" height="140" rx="10" fill="${INK_2}" stroke="rgba(255,255,255,0.16)"/>
  <rect x="36" y="80" width="230" height="156" rx="10" fill="#22252c" stroke="rgba(255,255,255,0.3)"/>
  <path d="M36 104 H266" stroke="rgba(255,255,255,0.16)"/>
  <circle cx="52" cy="92" r="3" fill="rgba(255,255,255,0.3)"/><circle cx="64" cy="92" r="3" fill="rgba(255,255,255,0.3)"/><circle cx="76" cy="92" r="3" fill="rgba(255,255,255,0.3)"/>
  <rect x="56" y="122" width="96" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
  <rect x="72" y="142" width="132" height="6" rx="3" fill="${ACCENT}"/>
  <rect x="72" y="162" width="84" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
  <rect x="88" y="182" width="112" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
  <rect x="56" y="202" width="60" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
  <rect x="388" y="56" width="78" height="140" rx="16" fill="${INK_2}" stroke="rgba(255,255,255,0.3)"/>
  <rect x="417" y="70" width="20" height="5" rx="2.5" fill="rgba(255,255,255,0.22)"/>
  <rect x="405" y="150" width="44" height="6" rx="3" fill="rgba(255,255,255,0.18)"/>
  <rect x="405" y="164" width="28" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
  <rect x="56" y="318" width="120" height="120" rx="10" fill="${INK_2}" stroke="rgba(255,255,255,0.3)"/>
  <path d="M70 318V308M85 318V308M100 318V308M115 318V308M130 318V308M145 318V308M160 318V308M70 438V448M85 438V448M100 438V448M115 438V448M130 438V448M145 438V448M160 438V448" stroke="rgba(255,255,255,0.3)" stroke-linecap="round"/>
  <rect x="86" y="348" width="60" height="60" rx="4" stroke="${ACCENT_SOFT}" stroke-width="1.5"/>
  <g transform="rotate(-11 386 391)"><rect x="334" y="318" width="104" height="146" rx="8" fill="${INK_2}" stroke="rgba(255,255,255,0.14)"/></g>
  <g transform="rotate(-3 386 391)"><rect x="334" y="318" width="104" height="146" rx="8" fill="${INK_2}" stroke="rgba(255,255,255,0.2)"/></g>
  <g transform="rotate(6 386 391)">
    <rect x="334" y="318" width="104" height="146" rx="8" fill="#22252c" stroke="rgba(255,255,255,0.36)"/>
    <rect x="344" y="328" width="84" height="62" rx="4" stroke="rgba(255,255,255,0.2)"/>
    <path d="M386 344 L400 359 L386 374 L372 359 Z" stroke="${ACCENT_SOFT}" stroke-width="1.5"/>
    <rect x="344" y="402" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.22)"/>
    <rect x="344" y="414" width="76" height="5" rx="2.5" fill="rgba(255,255,255,0.12)"/>
  </g>
  <circle cx="300" cy="290" r="22" stroke="${ACCENT_SOFT}" stroke-opacity="0.6" stroke-width="1.5"/>
  <circle cx="300" cy="290" r="10" fill="${ACCENT}"/>
  <circle cx="300" cy="290" r="3.5" fill="${PAPER}"/>
</svg>`;

export default async function OpengraphImage() {
  const font = (file: string) => readFile(join(process.cwd(), "src/app/_og", file));
  const [display, serif, sans, mono] = await Promise.all([
    font("inter-tight-latin-600-normal.woff"),
    font("instrument-serif-latin-400-italic.woff"),
    font("inter-latin-400-normal.woff"),
    font("jetbrains-mono-latin-500-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          color: PAPER,
          fontFamily: "Inter",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 8, background: ACCENT, display: "flex" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 700,
            padding: "64px 0 60px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
            <span style={{ fontFamily: "Inter Tight", fontSize: 40, letterSpacing: -1.6, lineHeight: 1 }}>Lami</span>
            <span style={{ fontFamily: "Instrument Serif", fontSize: 44, lineHeight: 1 }}>Ventures</span>
            <span style={{ width: 14, height: 14, background: ACCENT, marginBottom: 6, display: "flex" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Inter Tight", fontSize: 66, lineHeight: 1.02, letterSpacing: -2.6 }}>
            <span>Building digital</span>
            <span>products.</span>
            <span>Connecting</span>
            <span style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ fontFamily: "Instrument Serif", fontSize: 78, letterSpacing: -0.5 }}>opportunities</span>
              <span style={{ color: ACCENT_SOFT }}>.</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: 14, fontFamily: "JetBrains Mono", fontSize: 18, letterSpacing: 1.5 }}>
            {["WEBSITES", "SOFTWARE", "AI AUTOMATION", "COMMERCE"].map((t) => (
              <span
                key={t}
                style={{
                  display: "flex",
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: t === "COMMERCE" ? ACCENT_SOFT : MIST,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 500 }}>
          <img
            alt=""
            width={460}
            height={442}
            src={`data:image/svg+xml;base64,${Buffer.from(visual).toString("base64")}`}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: display, weight: 600, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
        { name: "Inter", data: sans, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
