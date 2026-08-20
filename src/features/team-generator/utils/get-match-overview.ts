import type { Player } from "../types/player";
import type { Team } from "../types/team";

export interface MatchOverviewData {
  teams: number;
  players: number;
  playersPerTeam: number;
  playersNeeded: number;
  extraPlayers: number;

  goalkeepers: number;
  defenders: number;
  midfielders: number;
  attackers: number;
  unassigned: number;
}

export function getMatchOverview(
  players: Player[],
  teams: Team[],
  playersPerTeam: number,
): MatchOverviewData {
  // --------------------------------------------------
  // Basic overview
  // --------------------------------------------------

  const overview: MatchOverviewData = {
    teams: teams.length,
    players: players.length,
    playersPerTeam,
    playersNeeded: playersPerTeam * teams.length,
    extraPlayers: 0,

    goalkeepers: 0,
    defenders: 0,
    midfielders: 0,
    attackers: 0,
    unassigned: 0,
  };

  // --------------------------------------------------
  // Count players by position
  // --------------------------------------------------

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

      case "Unassigned":
        overview.unassigned++;
        break;
    }
  }

  // --------------------------------------------------
  // Calculate extraPlayers
  // --------------------------------------------------

  const goalkeeperSlots = overview.teams;
  const goalkeepersOnField = Math.min(overview.goalkeepers, goalkeeperSlots);

  const outfieldPlayers = overview.players - overview.goalkeepers;
  const outfieldPlayerSlots = overview.teams * (playersPerTeam - 1);
  const outfieldPlayersOnField = Math.min(outfieldPlayers, outfieldPlayerSlots);

  const playersOnField = goalkeepersOnField + outfieldPlayersOnField;

  overview.extraPlayers = overview.players - playersOnField;

  return overview;
}
