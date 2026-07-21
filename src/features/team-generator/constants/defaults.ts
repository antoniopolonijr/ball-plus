// --------------------------------------------------
// Players
// --------------------------------------------------

export const MIN_PLAYER_COUNT = 0;
export const DEFAULT_PLAYER_COUNT = 16;
export const MAX_PLAYER_COUNT = 100;

// --------------------------------------------------
// Teams
// --------------------------------------------------

export const MIN_TEAM_COUNT = 0;
export const DEFAULT_TEAM_COUNT = 2;
export const MAX_TEAM_COUNT = 10;

export const DEFAULT_TEAM_COLORS = [
  "#2563EB", // Blue
  "#DC2626", // Red
  "#16A34A", // Green
  "#CA8A04", // Yellow
  "#9333EA", // Purple
  "#EA580C", // Orange
  "#0891B2", // Cyan
  "#DB2777", // Pink
  "#4F46E5", // Indigo
  "#475569", // Slate
] as const;

// --------------------------------------------------
// Generator Settings
// --------------------------------------------------

export const DEFAULT_PLAYERS_PER_TEAM = 7;

export const TEAM_SIZES = Array.from({ length: 10 }, (_, index) => index + 2);
