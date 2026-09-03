import type { GeneratedTeam } from "../../types/generated-team";
import { Pitch } from "./Pitch";
import { RotationGuide } from "./RotationGuide";

interface GeneratedTeamProps {
  generatedTeam: GeneratedTeam;
  teamIndex: number;
  placeholderPlayerNumberMap: Map<string, number>;
}

export function GeneratedTeamCard({
  generatedTeam,
  teamIndex,
  placeholderPlayerNumberMap,
}: GeneratedTeamProps) {
  return (
    <article
      aria-labelledby={`team-${generatedTeam.team.id}`}
      className="min-w-0 rounded-lg border p-4"
    >
      <header className="flex items-center gap-2 pb-3">
        <div
          className="size-4 shrink-0 rounded-full border-1 border-black"
          style={{ backgroundColor: generatedTeam.team.color }}
          aria-hidden="true"
        />

        <h3
          id={`team-${generatedTeam.team.id}`}
          className="min-w-0 flex-1 truncate text-lg font-semibold"
          title={generatedTeam.team.name}
        >
          {generatedTeam.team.name || `Team ${teamIndex + 1}`}
        </h3>

        <span className="shrink-0 text-sm text-muted-foreground">
          ({generatedTeam.players.length} players)
        </span>
      </header>

      <Pitch
        players={generatedTeam.players}
        placeholderPlayerNumberMap={placeholderPlayerNumberMap}
        teamColor={generatedTeam.team.color}
      />

      <RotationGuide
        players={generatedTeam.players}
        placeholderPlayerNumberMap={placeholderPlayerNumberMap}
        teamColor={generatedTeam.team.color}
      />
    </article>
  );
}
