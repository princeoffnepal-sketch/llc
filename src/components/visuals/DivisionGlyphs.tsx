/** Small line glyphs for the two divisions, drawn for light surfaces. */

export function DigitalGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 168 112" aria-hidden="true" focusable="false" fill="none" className={className}>
      <rect x="28" y="8" width="132" height="84" rx="6" stroke="#15171b" strokeOpacity="0.18" />
      <rect x="14" y="18" width="132" height="86" rx="6" fill="#f5f2ec" stroke="#15171b" strokeOpacity="0.55" />
      <path d="M14 34 H146" stroke="#15171b" strokeOpacity="0.25" />
      <path d="M44 58 L32 69 L44 80" stroke="#15171b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M116 58 L128 69 L116 80" stroke="#15171b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="56" y="58" width="40" height="5" rx="2.5" fill="#2b50ff" />
      <rect x="56" y="70" width="50" height="5" rx="2.5" fill="#15171b" fillOpacity="0.2" />
      <rect x="56" y="82" width="28" height="5" rx="2.5" fill="#15171b" fillOpacity="0.2" />
    </svg>
  );
}

export function CommerceGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 168 112" aria-hidden="true" focusable="false" fill="none" className={className}>
      <g transform="rotate(-10 62 58)">
        <rect x="36" y="20" width="52" height="74" rx="5" stroke="#15171b" strokeOpacity="0.2" />
      </g>
      <g transform="rotate(4 70 58)">
        <rect x="44" y="20" width="52" height="74" rx="5" fill="#f5f2ec" stroke="#15171b" strokeOpacity="0.55" />
        <rect x="50" y="26" width="40" height="30" rx="3" stroke="#15171b" strokeOpacity="0.25" />
        <path d="M70 32 L77 41 L70 50 L63 41 Z" stroke="#2b50ff" strokeWidth="1.25" />
      </g>
      <rect x="110" y="34" width="44" height="44" rx="4" stroke="#15171b" strokeOpacity="0.55" />
      <rect x="121" y="45" width="22" height="22" rx="2" fill="#2b50ff" fillOpacity="0.12" stroke="#2b50ff" />
      <path
        d="M118 34 V27 M126 34 V27 M134 34 V27 M142 34 V27 M118 78 V85 M126 78 V85 M134 78 V85 M142 78 V85"
        stroke="#15171b"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
