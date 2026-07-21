import type { Player } from "../types/player";
import type { Team } from "../types/team";

export interface MatchOverviewData {
  teams: number;
  players: number;

  starters: number;
  bench: number;

  goalkeepers: number;
  defenders: number;
  midfielders: number;
  attackers: number;
  any: number;
}

export function getMatchOverview(
  players: Player[],
  teams: Team[],
  playersPerTeam: number,
): MatchOverviewData {
  const starters = Math.min(players.length, teams.length * playersPerTeam);

  const bench = Math.max(0, players.length - starters);

  const overview: MatchOverviewData = {
    teams: teams.length,
    players: players.length,

    starters,
    bench,

    goalkeepers: 0,
    defenders: 0,
    midfielders: 0,
    attackers: 0,
    any: 0,
  };

  for (const player of players) {
    switch (player.position) {
      case "Goalkeeper":
        overview.goalkeepers++;
        break;

      case "Defender":
        overview.defenders++;
        break;

      case "Midfielder":
        overview.midfielders++;
        break;

      case "Attacker":
        overview.attackers++;
        break;

      case "Any":
        overview.any++;
        break;
    }
  }

  return overview;
}
