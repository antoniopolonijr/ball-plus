import type { GeneratedPlayer, GeneratedTeam } from "../types/generated-team";
import type { Player, PlayerPosition, PlayerSkill } from "../types/player";
import type { Team } from "../types/team";

type TeamId = Team["id"];

type TeamMap = Record<string, GeneratedPlayer[]>;

type DistributionMode = "default" | "skill-balanced";

/**
 * Returns the total number of players assigned to a team.
 */
function countTotalPlayers(team: Player[]): number {
  return team.length;
}

/**
 * Returns the number of players in a team for a specific position.
 */
function countPositionPlayers(
  team: Player[],
  position: PlayerPosition,
): number {
  return team.filter((player) => player.position === position).length;
}

/**
 * Returns the number of players in a team for a specific skill level.
 */
function countSkillPlayers(team: Player[], skill: PlayerSkill): number {
  return team.filter((player) => player.skill === skill).length;
}

/**
 * Calculates the current skill balance of a team.
 *
 * Positive values indicate more High-skill players.
 * Negative values indicate more Low-skill players.
 */
function getSkillBalance(team: Player[]): number {
  return countSkillPlayers(team, "High") - countSkillPlayers(team, "Low");
}

/**
 * Returns the best team order for assigning the next player.
 *
 * Priority:
 * 1. Skill balancing (optional)
 * 2. Position balancing
 * 3. Total number of players
 */
function getSortedTeams(
  teamMap: TeamMap,
  teamIds: TeamId[],
  player: Player,
  distributionMode: DistributionMode = "default",
): TeamId[] {
  return [...teamIds].sort((a, b) => {
    if (distributionMode === "skill-balanced") {
      const skillBalanceA = getSkillBalance(teamMap[a]);
      const skillBalanceB = getSkillBalance(teamMap[b]);

      if (player.skill === "High" && skillBalanceA !== skillBalanceB) {
        return skillBalanceA - skillBalanceB;
      }

      if (player.skill === "Low" && skillBalanceA !== skillBalanceB) {
        return skillBalanceB - skillBalanceA;
      }
    }

    const positionDifference =
      countPositionPlayers(teamMap[a], player.position) -
      countPositionPlayers(teamMap[b], player.position);

    if (positionDifference !== 0) {
      return positionDifference;
    }

    return countTotalPlayers(teamMap[a]) - countTotalPlayers(teamMap[b]);
  });
}

/**
 * Randomly assigns a rotation order to all players.
 *
 * Goalkeepers and outfield players are shuffled independently so each group
 * has its own rotation order starting at 1.
 */
function assignRotationOrder(players: GeneratedPlayer[]): void {
  const goalkeepers = players.filter(
    (player) => player.position === "Goalkeeper",
  );

  const outfieldPlayers = players.filter(
    (player) => player.position !== "Goalkeeper",
  );

  const shuffledGoalkeepers = [...goalkeepers].sort(() => Math.random() - 0.5);

  const shuffledOutfieldPlayers = [...outfieldPlayers].sort(
    () => Math.random() - 0.5,
  );

  shuffledGoalkeepers.forEach((player, index) => {
    player.rotationOrder = index + 1;
  });

  shuffledOutfieldPlayers.forEach((player, index) => {
    player.rotationOrder = index + 1;
  });
}

/**
 * Determines the starting lineup for a generated team.
 *
 * The goalkeeper with rotation order 1 starts on the field.
 * Outfield players whose rotation order exceeds the available outfield spots
 * start on the bench.
 */
function assignStartingLineup(
  players: GeneratedPlayer[],
  playersPerTeam: number,
): void {
  const startingOutfieldPlayers = playersPerTeam - 1;

  for (const player of players) {
    if (player.position === "Goalkeeper") {
      player.startsOnBench = player.rotationOrder > 1;
      continue;
    }

    player.startsOnBench = player.rotationOrder > startingOutfieldPlayers;
  }
}

/**
 * Sorts players for display, prioritizing goalkeepers first.
 * Players within the same position group are sorted by rotation order.
 */
function sortPlayersForDisplay(players: GeneratedPlayer[]): GeneratedPlayer[] {
  return [...players].sort((a, b) => {
    const aIsGoalkeeper = a.position === "Goalkeeper";
    const bIsGoalkeeper = b.position === "Goalkeeper";

    if (aIsGoalkeeper && !bIsGoalkeeper) {
      return -1;
    }

    if (!aIsGoalkeeper && bIsGoalkeeper) {
      return 1;
    }

    return a.rotationOrder - b.rotationOrder;
  });
}

function createGeneratedPlayer(player: Player): GeneratedPlayer {
  return {
    ...player,
    rotationOrder: 0,
    startsOnBench: false,
  };
}

/**
 * Generates balanced teams by distributing players in phases.
 *
 * Distribution order:
 * 1. Goalkeepers
 * 2. High-skill players
 * 3. Low-skill players
 * 4. Medium-skill players
 *
 * After distribution, team sizes are balanced,
 * substitution order is assigned,
 * and players are sorted by position.
 */
export function generateBalancedTeams(
  players: Player[],
  teams: Team[],
  playersPerTeam: number,
): GeneratedTeam[] {
  const generatedPlayers = players.map(createGeneratedPlayer);

  // --------------------------------------------------
  // Categorize players
  // --------------------------------------------------

  const goalkeepers: GeneratedPlayer[] = [];
  const highSkillPlayers: GeneratedPlayer[] = [];
  const mediumSkillPlayers: GeneratedPlayer[] = [];
  const lowSkillPlayers: GeneratedPlayer[] = [];

  // Shuffle players to avoid deterministic distributions.
  const shuffledPlayers = [...generatedPlayers].sort(() => Math.random() - 0.5);

  shuffledPlayers.forEach((player) => {
    if (player.position === "Goalkeeper") {
      goalkeepers.push(player);
    } else if (player.skill === "High") {
      highSkillPlayers.push(player);
    } else if (player.skill === "Medium") {
      mediumSkillPlayers.push(player);
    } else {
      lowSkillPlayers.push(player);
    }
  });

  // --------------------------------------------------
  // Initialize teams
  // --------------------------------------------------

  const teamMap: TeamMap = {};

  teams.forEach((team) => {
    teamMap[team.id] = [];
  });

  const teamIds: TeamId[] = teams.map((team) => team.id);

  const totalPlayersPerTeam = Math.floor(
    shuffledPlayers.length / teamIds.length,
  );

  // --------------------------------------------------
  // Team distribution helpers
  // --------------------------------------------------

  function distributePlayersInRounds(
    playersToDistribute: GeneratedPlayer[],
    distributionMode: DistributionMode = "default",
  ) {
    const positions = new Set<PlayerPosition>(
      playersToDistribute.map((player) => player.position),
    );

    while (playersToDistribute.length > 0) {
      for (const position of positions) {
        const playerIndex = playersToDistribute.findIndex(
          (player) => player.position === position,
        );

        if (playerIndex === -1) {
          continue;
        }

        const [player] = playersToDistribute.splice(playerIndex, 1);

        const sortedTeams = getSortedTeams(
          teamMap,
          teamIds,
          player,
          distributionMode,
        );

        teamMap[sortedTeams[0]].push(player);
      }
    }
  }

  function balanceTeamSizes() {
    const teamsOverLimit: TeamId[] = [];
    const teamsUnderLimit: TeamId[] = [];

    for (const teamId of teamIds) {
      const playerCount = teamMap[teamId].length;

      if (playerCount > totalPlayersPerTeam) {
        teamsOverLimit.push(teamId);
      } else if (playerCount < totalPlayersPerTeam) {
        teamsUnderLimit.push(teamId);
      }
    }

    while (teamsOverLimit.length > 0 && teamsUnderLimit.length > 0) {
      const overTeam = teamsOverLimit[0];
      const underTeam = teamsUnderLimit[0];

      const playerToMove = teamMap[overTeam].pop();

      if (playerToMove) {
        teamMap[underTeam].push(playerToMove);
      }

      if (teamMap[overTeam].length <= totalPlayersPerTeam) {
        teamsOverLimit.shift();
      }

      if (teamMap[underTeam].length >= totalPlayersPerTeam) {
        teamsUnderLimit.shift();
      }
    }
  }

  // --------------------------------------------------
  // Generate balanced teams
  // --------------------------------------------------

  // Distribution order is important.
  // Goalkeepers are assigned first, followed by
  // high-, low- and medium-skill players.

  distributePlayersInRounds(goalkeepers);

  distributePlayersInRounds(highSkillPlayers, "skill-balanced");

  distributePlayersInRounds(lowSkillPlayers, "skill-balanced");

  distributePlayersInRounds(mediumSkillPlayers);

  balanceTeamSizes();

  // --------------------------------------------------
  // Build generation result
  // --------------------------------------------------

  return teams.map((team) => {
    const generatedPlayers = teamMap[team.id].map(createGeneratedPlayer);

    assignRotationOrder(generatedPlayers);
    assignStartingLineup(generatedPlayers, playersPerTeam);

    const sortedGeneratedPlayers = sortPlayersForDisplay(generatedPlayers);

    return {
      team,
      players: sortedGeneratedPlayers,
    };
  });
}
