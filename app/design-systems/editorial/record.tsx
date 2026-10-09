// A flat record for the Editorial design system: ink disc, paper label. No accent color.
export function EdRecord({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Vinyl record">
      <circle cx="60" cy="60" r="58" fill="#111111" />
      <path d="M60 60 L60 8 A52 52 0 0 1 104 32 Z" fill="#F2EAD3" fillOpacity="0.18" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#F2EAD3" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="24" fill="#F2EAD3" />
      <circle cx="60" cy="60" r="3" fill="#111111" />
    </svg>
  );
}
