export function PitchField() {
  const lineProps = {
    fill: "none",
    stroke: "white",
    strokeOpacity: 0.75,
    strokeWidth: 0.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-emerald-800"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08)_50%,transparent_50%)] bg-[length:100%_25%]" />

      <svg
        viewBox="0 0 100 140"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        {/* Field boundary */}
        <rect x="2" y="2" width="96" height="136" {...lineProps} />

        {/* Halfway line and center circle */}
        <line x1="2" y1="70" x2="98" y2="70" {...lineProps} />
        <circle cx="50" cy="70" r="11" {...lineProps} />
        <circle cx="50" cy="70" r="0.8" fill="white" fillOpacity="0.75" />

        {/* Top penalty area */}
        <rect x="30" y="2" width="40" height="18" {...lineProps} />
        <rect x="40" y="2" width="20" height="8" {...lineProps} />
        <rect
          x="46"
          y="0"
          width="8"
          height="2"
          fill="white"
          fillOpacity="0.75"
          stroke="white"
          strokeOpacity="0.75"
          strokeWidth="0.6"
        />
        <circle cx="50" cy="14" r="0.8" fill="white" fillOpacity="0.75" />
        <path d="M42 20 A8 8 0 0 0 58 20" {...lineProps} />

        {/* Bottom penalty area */}
        <rect x="30" y="120" width="40" height="18" {...lineProps} />
        <rect x="40" y="130" width="20" height="8" {...lineProps} />
        <rect
          x="46"
          y="138"
          width="8"
          height="2"
          fill="white"
          fillOpacity="0.75"
          stroke="white"
          strokeOpacity="0.75"
          strokeWidth="0.6"
        />
        <circle cx="50" cy="126" r="0.8" fill="white" fillOpacity="0.75" />
        <path d="M42 120 A8 8 0 0 1 58 120" {...lineProps} />

        {/* Corner arcs */}
        <path d="M2 5 A3 3 0 0 0 5 2" {...lineProps} />
        <path d="M95 2 A3 3 0 0 0 98 5" {...lineProps} />
        <path d="M2 135 A3 3 0 0 1 5 138" {...lineProps} />
        <path d="M95 138 A3 3 0 0 1 98 135" {...lineProps} />
      </svg>
    </div>
  );
}
