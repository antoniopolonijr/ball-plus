import type { GeneratedTeam } from "../types/generated-team";

export function getGeneratedTeamsText(
  teams: GeneratedTeam[],
  generatedAt: Date,
  placeholderPlayerNumberMap: Map<string, number>,
): string {
  const formattedDate = generatedAt.toLocaleDateString("en-GB");
  const formattedTime = generatedAt.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const teamTexts = teams.map((generatedTeam, teamIndex) => {
    const teamName = generatedTeam.team.name || `Team ${teamIndex + 1}`;

    const playerTexts = generatedTeam.players
      .map((player) => formatPlayer(player, placeholderPlayerNumberMap))
      .join("\n");

    return `🛡️ ${teamName}\n\n${playerTexts}`;
  });

  return [
    "⚽ Ball+",
    `Teams generated on ${formattedDate}, ${formattedTime}`,
    "",
    teamTexts.join("\n\n"),
  ].join("\n");
}

function formatPlayer(
  player: GeneratedTeam["players"][number],
  placeholderPlayerNumberMap: Map<string, number>,
): string {
  const placeholderPlayerNumber = placeholderPlayerNumberMap.get(player.id);

  const playerName = player.name || `Player ${placeholderPlayerNumber}`;

  const benchLabel = player.startsOnBench ? " (bench)" : "";

  if (player.position === "Goalkeeper") {
    return `GK ${playerName}${benchLabel}`;
  }

  return `${player.rotationOrder}. ${playerName}${benchLabel}`;
}
