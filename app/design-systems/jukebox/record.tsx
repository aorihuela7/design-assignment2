// A flat record for the Jukebox design system: dark disc, yellow label. No accent color.
export function JbRecord({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Vinyl record">
      <circle cx="60" cy="60" r="58" fill="#0D0618" stroke="#7E6AAD" strokeWidth="2" />
      {[50, 42, 34].map((r) => (
        <circle key={r} cx="60" cy="60" r={r} fill="none" stroke="#4A3480" strokeWidth="1.5" />
      ))}
      <circle cx="60" cy="60" r="22" fill="#FFE600" />
      <polyline points="44,64 51,54 58,64 65,54 72,64 76,59" fill="none" stroke="#0D0618" strokeWidth="3" />
      <circle cx="60" cy="60" r="3" fill="#0D0618" />
    </svg>
  );
}
