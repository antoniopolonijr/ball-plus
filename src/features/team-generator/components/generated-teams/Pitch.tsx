import type { Player } from "../../types/player";
import { getPitchPlayers } from "../../utils/get-pitch-players";
import { PitchPlayers } from "./PitchPlayers";

interface PitchProps {
  players: Player[];
  placeholderPlayerNumberMap: Map<string, number>;
  teamColor: string;
}

export function Pitch({
  players,
  placeholderPlayerNumberMap,
  teamColor,
}: PitchProps) {
  const pitchPlayers = getPitchPlayers(players);

  return (
    <section
      aria-labelledby="pitch-heading"
      className="overflow-hidden rounded border"
    >
      <h4 id="pitch-heading" className="sr-only">
        Pitch
      </h4>

      <div className="relative aspect-[3/4]">
        <PitchSvg />

        <PitchPlayers
          players={pitchPlayers}
          placeholderPlayerNumberMap={placeholderPlayerNumberMap}
          teamColor={teamColor}
        />
      </div>
    </section>
  );
}

function PitchSvg() {
  const pitchLineProps = {
    fill: "none",
    stroke: "white",
    strokeOpacity: 0.75,
    strokeWidth: 0.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 140"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="grass-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d8f5a" />
          <stop offset="100%" stopColor="#2f7449" />
        </linearGradient>

        <pattern
          id="grass-stripes"
          width="100"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <rect width="100" height="14" fill="white" opacity="0.04" />
        </pattern>
      </defs>

      <rect width="100" height="140" fill="url(#grass-gradient)" />

      <rect width="100" height="140" fill="url(#grass-stripes)" />

      {/* ============================= */}
      {/* Field */}
      {/* ============================= */}

      <g id="field">
        <rect x="2" y="2" width="96" height="136" {...pitchLineProps} />

        {/* ============================= */}
        {/* Halfway line */}
        {/* ============================= */}

        <line x1="2" y1="70" x2="98" y2="70" {...pitchLineProps} />

        {/* ============================= */}
        {/* Center circle */}
        {/* ============================= */}

        <circle cx="50" cy="70" r="11" {...pitchLineProps} />

        {/* Center mark */}

        <circle
          cx="50"
          cy="70"
          r="0.8"
          fill="white"
          fillOpacity=".75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* ============================= */}
      {/* TOP HALF */}
      {/* ============================= */}

      <g id="top-half">
        <rect x="30" y="2" width="40" height="18" {...pitchLineProps} />

        {/* Goal mark */}
        <rect
          x="46"
          y="0"
          width="8"
          height="2"
          stroke="white"
          strokeOpacity=".75"
          strokeWidth="0.6"
          fill="white"
          fillOpacity=".75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Goal area */}

        <rect x="40" y="2" width="20" height="8" {...pitchLineProps} />

        {/* Penalty mark */}

        <circle
          cx="50"
          cy="14"
          r="0.8"
          fill="white"
          fillOpacity=".75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Penalty arc */}

        <path
          d="M42 20
           A8 8 0 0 0 58 20"
          {...pitchLineProps}
        />
      </g>

      {/* ============================= */}
      {/* BOTTOM HALF */}
      {/* ============================= */}

      <g id="bottom-half">
        <rect x="30" y="120" width="40" height="18" {...pitchLineProps} />

        {/* Goal mark */}
        <rect
          x="46"
          y="138"
          width="8"
          height="2"
          stroke="white"
          strokeOpacity=".75"
          strokeWidth="0.6"
          fill="white"
          fillOpacity=".75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Goal area */}

        <rect x="40" y="130" width="20" height="8" {...pitchLineProps} />

        {/* Penalty mark */}

        <circle
          cx="50"
          cy="126"
          r="0.8"
          fill="white"
          fillOpacity=".75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Penalty arc */}

        <path
          d="M42 120
           A8 8 0 0 1 58 120"
          {...pitchLineProps}
        />
      </g>

      {/* ============================= */}
      {/* Corner arcs */}
      {/* ============================= */}

      <g id="corners">
        {/* Superior Left Corner */}
        <path
          d="M2 5
     A3 3 0 0 0 5 2"
          {...pitchLineProps}
        />

        {/* Superior Right Corner */}
        <path
          d="M95 2
     A3 3 0 0 0 98 5"
          {...pitchLineProps}
        />

        {/* Inferior Left Corner */}
        <path
          d="M2 135
     A3 3 0 0 1 5 138"
          {...pitchLineProps}
        />

        {/* Inferior Right Corner */}
        <path
          d="M95 138
     A3 3 0 0 1 98 135"
          {...pitchLineProps}
        />
      </g>
    </svg>
  );
}
