/**
 * Abstract hero composition: software windows, a device, a hardware chip,
 * and a stack of collectible cards, all routed through one hub.
 * Pure SVG + CSS animation (transform / stroke-dashoffset), paused under reduced motion.
 */
const WINDOW_LINES = [
  { x: 56, w: 96 },
  { x: 72, w: 132, accent: true },
  { x: 72, w: 84 },
  { x: 88, w: 112 },
  { x: 56, w: 60 },
];

const CHIP_PINS = Array.from({ length: 7 }, (_, i) => 70 + i * 15);

const CONNECTORS = [
  "M266 168 H300 V272",
  "M427 196 V290 H318",
  "M176 378 H236 V290 H282",
  "M300 308 V392 H334",
];

export function HeroVisual({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 500"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
    >
      <defs>
        <pattern id="hv-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgb(255 255 255 / 0.09)" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="520" height="500" fill="url(#hv-dots)" />

      {/* Connectors */}
      <g stroke="rgb(255 255 255 / 0.2)" strokeWidth="1.25">
        {CONNECTORS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g stroke="#7d95ff" strokeWidth="1.5" strokeLinecap="round">
        {CONNECTORS.map((d, i) => (
          <path key={d} d={d} className="flow" style={{ animationDelay: `${i * -1.4}s` }} />
        ))}
      </g>

      {/* Software: stacked windows */}
      <g className="drift-a">
        <rect x="76" y="40" width="190" height="128" rx="10" fill="#1d2026" stroke="rgb(255 255 255 / 0.1)" />
        <rect x="56" y="60" width="210" height="140" rx="10" fill="#1d2026" stroke="rgb(255 255 255 / 0.14)" />
        <rect x="36" y="80" width="230" height="156" rx="10" fill="#22252c" stroke="rgb(255 255 255 / 0.24)" />
        <path d="M36 104 H266" stroke="rgb(255 255 255 / 0.14)" />
        {[52, 64, 76].map((cx) => (
          <circle key={cx} cx={cx} cy="92" r="3" fill="rgb(255 255 255 / 0.22)" />
        ))}
        {WINDOW_LINES.map((l, i) => (
          <rect
            key={i}
            x={l.x}
            y={122 + i * 20}
            width={l.w}
            height="6"
            rx="3"
            fill={l.accent ? "#2b50ff" : "rgb(255 255 255 / 0.16)"}
          />
        ))}
      </g>

      {/* Device */}
      <g className="drift-b">
        <rect x="388" y="56" width="78" height="140" rx="16" fill="#1d2026" stroke="rgb(255 255 255 / 0.24)" />
        <rect x="395" y="63" width="64" height="126" rx="11" stroke="rgb(255 255 255 / 0.1)" />
        <rect x="417" y="70" width="20" height="5" rx="2.5" fill="rgb(255 255 255 / 0.18)" />
        <rect x="405" y="150" width="44" height="6" rx="3" fill="rgb(255 255 255 / 0.14)" />
        <rect x="405" y="164" width="28" height="6" rx="3" fill="rgb(255 255 255 / 0.1)" />
      </g>

      {/* Hardware: chip */}
      <g className="drift-b">
        <rect x="56" y="318" width="120" height="120" rx="10" fill="#1d2026" stroke="rgb(255 255 255 / 0.24)" />
        <g stroke="rgb(255 255 255 / 0.26)" strokeLinecap="round">
          {CHIP_PINS.map((p) => (
            <g key={p}>
              <path d={`M${p} 318 V308`} />
              <path d={`M${p} 438 V448`} />
              <path d={`M56 ${p + 248} H46`} />
            </g>
          ))}
        </g>
        <rect x="86" y="348" width="60" height="60" rx="4" stroke="#7d95ff" strokeOpacity="0.75" />
        <path d="M86 368 H146 M86 388 H146 M106 348 V408 M126 348 V408" stroke="rgb(255 255 255 / 0.1)" />
      </g>

      {/* Commerce: card stack */}
      <g className="drift-a">
        <g transform="rotate(-11 386 391)">
          <rect x="334" y="318" width="104" height="146" rx="8" fill="#1d2026" stroke="rgb(255 255 255 / 0.12)" />
        </g>
        <g transform="rotate(-3 386 391)">
          <rect x="334" y="318" width="104" height="146" rx="8" fill="#1d2026" stroke="rgb(255 255 255 / 0.18)" />
        </g>
        <g transform="rotate(6 386 391)">
          <rect x="334" y="318" width="104" height="146" rx="8" fill="#22252c" stroke="rgb(255 255 255 / 0.3)" />
          <rect x="344" y="328" width="84" height="62" rx="4" stroke="rgb(255 255 255 / 0.16)" />
          <path d="M386 344 L400 359 L386 374 L372 359 Z" stroke="#7d95ff" strokeOpacity="0.8" />
          <rect x="344" y="402" width="60" height="5" rx="2.5" fill="rgb(255 255 255 / 0.18)" />
          <rect x="344" y="414" width="76" height="5" rx="2.5" fill="rgb(255 255 255 / 0.1)" />
          <rect x="344" y="426" width="44" height="5" rx="2.5" fill="rgb(255 255 255 / 0.1)" />
        </g>
      </g>

      {/* Hub */}
      <circle cx="300" cy="290" r="22" stroke="#7d95ff" strokeOpacity="0.5" className="pulse-node" />
      <circle cx="300" cy="290" r="9" fill="#2b50ff" />
      <circle cx="300" cy="290" r="3" fill="#f5f2ec" />
    </svg>
  );
}
