import type { MatchRecommendation } from "../types/match-recommendation";
import type { MatchOverviewData } from "../utils/get-match-overview";

// --------------------------------------------------
// Constants
// --------------------------------------------------
const MINIMUM_TEAMS = 2;
const MINIMUM_GOALKEEPERS = 2;
const MIN_PLAYERS_PER_TEAM_FOR_POSITION_RULES = 4;
const MANY_UNASSIGNED_POSITION_PLAYERS = 3;

type RecommendationRule = (
  overview: MatchOverviewData,
) => MatchRecommendation | null;

export function getMatchRecommendations(
  overview: MatchOverviewData,
): MatchRecommendation[] {
  const recommendations: MatchRecommendation[] = [];

  for (const rule of rules) {
    const recommendation = rule(overview);

    if (!recommendation) {
      continue;
    }

    recommendations.push(recommendation);
  }

  return recommendations;
}

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function pluralize(count: number, singular: string): string {
  return count === 1 ? singular : `${singular}s`;
}

// --------------------------------------------------
// Rules
// --------------------------------------------------

const rules: RecommendationRule[] = [
  checkTeams,
  checkOutfieldPlayers,
  checkGoalkeepers,
  checkDefenders,
  checkMidfielders,
  checkAttackers,
  checkUnassignedPositionPlayers,
  checkExtraPlayers,
];

function checkTeams(overview: MatchOverviewData): MatchRecommendation | null {
  const { teams, players, playersPerTeam } = overview;

  if (teams < MINIMUM_TEAMS) {
    return {
      id: "minimum-teams",
      severity: "error",
      message: `Add at least ${MINIMUM_TEAMS} teams.`,
    };
  }

  const playersNeeded = teams * playersPerTeam;
  const extraPlayers = players - playersNeeded;

  if (extraPlayers >= playersPerTeam) {
    return {
      id: "create-team",
      severity: "tip",
      message: "You have enough players to create another team.",
    };
  }

  const possibleTeams = Math.floor(players / playersPerTeam);

  if (possibleTeams < teams && possibleTeams >= MINIMUM_TEAMS) {
    return {
      id: "fewer-teams",
      severity: "tip",
      message: `Consider playing with ${possibleTeams} teams. You don't have enough players for ${teams} teams.`,
    };
  }

  return null;
}

function checkOutfieldPlayers(
  overview: MatchOverviewData,
): MatchRecommendation | null {
  const { players, teams, goalkeepers } = overview;

  const outfieldPlayers = players - goalkeepers;
  const outfieldPlayerSlots = teams * (overview.playersPerTeam - 1);
  const missingOutfieldPlayers = outfieldPlayerSlots - outfieldPlayers;

  if (missingOutfieldPlayers <= 0) {
    return null;
  }

  if (teams > 2) {
    return {
      id: "share-outfield-player",
      severity: "warning",
      message: `Need ${missingOutfieldPlayers} more ${pluralize(
        missingOutfieldPlayers,
        "outfield player",
      )}, or some teams will need to share players.`,
    };
  }

  return {
    id: "missing-outfield-player",
    severity: "error",
    message: `Need at least ${missingOutfieldPlayers} more ${pluralize(
      missingOutfieldPlayers,
      "outfield player",
    )}.`,
  };
}

function checkGoalkeepers(
  overview: MatchOverviewData,
): MatchRecommendation | null {
  const { goalkeepers, teams } = overview;

  const extraGoalkeepers = goalkeepers - teams;
  const missingGoalkeepers = teams - goalkeepers;

  if (extraGoalkeepers > 0) {
    return {
      id: "extra-goalkeepers",
      severity: "warning",
      message: `You have ${extraGoalkeepers} extra ${pluralize(
        extraGoalkeepers,
        "goalkeeper",
      )}.`,
    };
  }

  if (goalkeepers < MINIMUM_GOALKEEPERS) {
    const minimumGoalkeepersNeeded = MINIMUM_GOALKEEPERS - goalkeepers;

    return {
      id: "missing-goalkeepers",
      severity: "error",
      message: `Need at least ${minimumGoalkeepersNeeded} more ${pluralize(
        minimumGoalkeepersNeeded,
        "goalkeeper",
      )}.`,
    };
  }

  if (missingGoalkeepers > 0) {
    return {
      id: "rotate-goalkeeper",
      severity: "warning",
      message: `Need ${missingGoalkeepers} more ${pluralize(
        missingGoalkeepers,
        "goalkeeper",
      )}, or the current goalkeepers will need to rotate between teams.`,
    };
  }

  return null;
}

function checkDefenders(
  overview: MatchOverviewData,
): MatchRecommendation | null {
  const { defenders, teams, playersPerTeam } = overview;

  if (playersPerTeam < MIN_PLAYERS_PER_TEAM_FOR_POSITION_RULES) {
    return null;
  }

  const missingDefenders = teams - defenders;

  if (missingDefenders <= 0) {
    return null;
  }

  return {
    id: "missing-defenders",
    severity: "warning",
    message: `Need at least ${missingDefenders} more ${pluralize(
      missingDefenders,
      "defender",
    )}.`,
  };
}

function checkMidfielders(
  overview: MatchOverviewData,
): MatchRecommendation | null {
  const { midfielders, teams, playersPerTeam } = overview;

  if (playersPerTeam < MIN_PLAYERS_PER_TEAM_FOR_POSITION_RULES) {
    return null;
  }

  const missingMidfielders = teams - midfielders;

  if (missingMidfielders <= 0) {
    return null;
  }

  return {
    id: "missing-midfielders",
    severity: "warning",
    message: `Need at least ${missingMidfielders} more ${pluralize(
      missingMidfielders,
      "midfielder",
    )}.`,
  };
}

function checkAttackers(
  overview: MatchOverviewData,
): MatchRecommendation | null {
  const { attackers, teams, playersPerTeam } = overview;

  if (playersPerTeam < MIN_PLAYERS_PER_TEAM_FOR_POSITION_RULES) {
    return null;
  }

  const missingAttackers = teams - attackers;

  if (missingAttackers <= 0) {
    return null;
  }

  return {
    id: "missing-attackers",
    severity: "warning",
    message: `Need at least ${missingAttackers} more ${pluralize(
      missingAttackers,
      "attacker",
    )}.`,
  };
}

function checkUnassignedPositionPlayers(
  overview: MatchOverviewData,
): MatchRecommendation | null {
  const { unassigned, playersPerTeam } = overview;

  if (
    unassigned === 0 ||
    playersPerTeam < MIN_PLAYERS_PER_TEAM_FOR_POSITION_RULES
  ) {
    return null;
  }

  if (unassigned >= MANY_UNASSIGNED_POSITION_PLAYERS) {
    return {
      id: "many-unassigned-position",
      severity: "warning",
      message:
        "Many players don't have a defined position. Team balance may be less accurate.",
    };
  }
  return {
    id: "assign-position",
    severity: "tip",
    message: "Assign positions for more balanced teams.",
  };
}

function checkExtraPlayers(
  overview: MatchOverviewData,
): MatchRecommendation | null {
  const { extraPlayers, teams, players, goalkeepers, playersPerTeam } =
    overview;

  // for Two teams
  if (teams === 2) {
    const outfieldPlayers = players - goalkeepers;
    const outfieldPlayerSlots = teams * (playersPerTeam - 1);
    const missingOutfieldPlayers = outfieldPlayerSlots - outfieldPlayers;

    if (extraPlayers === 0 && missingOutfieldPlayers <= 0) {
      return {
        id: "no-substitutes",
        severity: "tip",
        message:
          "Consider adding substitutes so players can rest or be replaced if injured.",
      };
    }

    if (extraPlayers === 1) {
      return {
        id: "few-substitutes",
        severity: "tip",
        message:
          "Consider adding one more substitute for smoother player rotation.",
      };
    }

    if (extraPlayers > 2) {
      return {
        id: "large-bench",
        severity: "warning",
        message: `${extraPlayers} extra ${pluralize(
          extraPlayers,
          "player",
        )} may reduce playing time for some players.`,
      };
    }
  }

  // for 3 or more teams
  if (teams > 2) {
    if (extraPlayers === 0) {
      return null;
    }

    if (extraPlayers > 0) {
      return {
        id: "extra-players",
        severity: "warning",
        message: `${extraPlayers} extra ${pluralize(
          extraPlayers,
          "player",
        )} may reduce playing time for some players.`,
      };
    }
  }
  return null;
}
