import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  DEFAULT_PLAYER_COUNT,
  DEFAULT_PLAYERS_PER_TEAM,
  DEFAULT_TEAM_COUNT,
} from "../constants/defaults";
import type { GenerationResult } from "../types/generation-result";
import type { Player } from "../types/player";
import {
  PLAYER_POSITION_SORT_ORDER,
  PLAYER_SKILL_SORT_ORDER,
} from "../types/player";
import type { Team } from "../types/team";
import { createDefaultPlayer } from "../utils/create-default-player";
import { createDefaultTeam } from "../utils/create-default-team";
import { createInitialPlayers } from "../utils/create-initial-players";
import { createInitialTeams } from "../utils/create-initial-teams";
import { generateBalancedTeams } from "../utils/generate-balanced-teams";

export interface TeamGeneratorStore {
  // --------------------------------------------------
  // State
  // --------------------------------------------------
  players: Player[];
  playerSortField: "name" | "position" | "skill" | null;
  playerSortDirection: "asc" | "desc";

  teams: Team[];

  playersPerTeam: number;
  generationResult: GenerationResult | null;

  // --------------------------------------------------
  // Actions
  // --------------------------------------------------

  // Players
  addPlayer(): void;
  removePlayer(id: string): void;
  updatePlayer(id: string, player: Partial<Player>): void;
  setPlayerCount(count: number): void;
  pastePlayers: (names: string[]) => void;
  sortPlayersByName: () => void;
  sortPlayersByPosition: () => void;
  sortPlayersBySkill: () => void;

  // Teams
  addTeam(): void;
  removeTeam(id: string): void;
  updateTeam(id: string, team: Partial<Team>): void;
  setTeamCount(count: number): void;

  // Generator
  setPlayersPerTeam: (playersPerTeam: number) => void;
  resetAll(): void;
  generateTeams: () => void;
}

export const useTeamGeneratorStore = create<TeamGeneratorStore>()(
  persist(
    (set, get) => ({
      // --------------------------------------------------
      // State
      // --------------------------------------------------

      players: createInitialPlayers(DEFAULT_PLAYER_COUNT),
      playerSortField: null,
      playerSortDirection: "asc",

      teams: createInitialTeams(DEFAULT_TEAM_COUNT),

      playersPerTeam: DEFAULT_PLAYERS_PER_TEAM,
      generationResult: null,

      // --------------------------------------------------
      // Players Actions
      // --------------------------------------------------

      addPlayer: () =>
        set((state) => ({
          players: [...state.players, createDefaultPlayer()],
        })),

      removePlayer: (id) =>
        set((state) => ({
          players: state.players.filter((player) => player.id !== id),
        })),

      updatePlayer: (id, player) =>
        set((state) => ({
          players: state.players.map((currentPlayer) =>
            currentPlayer.id === id
              ? {
                  ...currentPlayer,
                  ...player,
                }
              : currentPlayer,
          ),
        })),

      setPlayerCount: (count) =>
        set((state) => {
          const currentCount = state.players.length;

          if (count === currentCount) {
            return state;
          }

          if (count > currentCount) {
            const playersToAdd = count - currentCount;

            return {
              players: [
                ...state.players,
                ...Array.from({ length: playersToAdd }, () =>
                  createDefaultPlayer(),
                ),
              ],
            };
          }

          return {
            players: state.players.slice(0, count),
          };
        }),

      sortPlayersByName: () =>
        set((state) => {
          const direction =
            state.playerSortField === "name" &&
            state.playerSortDirection === "asc"
              ? "desc"
              : "asc";

          const sortedPlayers = [...state.players].sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);

            return direction === "asc" ? comparison : -comparison;
          });

          return {
            players: sortedPlayers,
            playerSortField: "name",
            playerSortDirection: direction,
          };
        }),

      sortPlayersByPosition: () =>
        set((state) => {
          const direction =
            state.playerSortField === "position" &&
            state.playerSortDirection === "asc"
              ? "desc"
              : "asc";

          const sortedPlayers = [...state.players].sort((a, b) => {
            const comparison =
              PLAYER_POSITION_SORT_ORDER[a.position] -
              PLAYER_POSITION_SORT_ORDER[b.position];

            return direction === "asc" ? comparison : -comparison;
          });

          return {
            players: sortedPlayers,
            playerSortField: "position",
            playerSortDirection: direction,
          };
        }),

      sortPlayersBySkill: () =>
        set((state) => {
          const direction =
            state.playerSortField === "skill" &&
            state.playerSortDirection === "asc"
              ? "desc"
              : "asc";

          const sortedPlayers = [...state.players].sort((a, b) => {
            const comparison =
              PLAYER_SKILL_SORT_ORDER[a.skill] -
              PLAYER_SKILL_SORT_ORDER[b.skill];

            return direction === "asc" ? comparison : -comparison;
          });

          return {
            players: sortedPlayers,
            playerSortField: "skill",
            playerSortDirection: direction,
          };
        }),

      pastePlayers: (names) =>
        set(() => ({
          players: names.map((name) => ({
            ...createDefaultPlayer(),
            name,
          })),
          generationResult: null,
        })),

      // --------------------------------------------------
      // Teams Actions
      // --------------------------------------------------

      addTeam: () =>
        set((state) => ({
          teams: [...state.teams, createDefaultTeam()],
        })),

      removeTeam: (id) =>
        set((state) => ({
          teams: state.teams.filter((team) => team.id !== id),
        })),

      updateTeam: (id, team) =>
        set((state) => ({
          teams: state.teams.map((currentTeam) =>
            currentTeam.id === id
              ? {
                  ...currentTeam,
                  ...team,
                }
              : currentTeam,
          ),
        })),

      setTeamCount: (count) =>
        set((state) => {
          const currentCount = state.teams.length;

          if (count === currentCount) {
            return state;
          }

          if (count > currentCount) {
            const teamsToAdd = count - currentCount;

            return {
              teams: [
                ...state.teams,
                ...Array.from({ length: teamsToAdd }, () =>
                  createDefaultTeam(),
                ),
              ],
            };
          }

          return {
            teams: state.teams.slice(0, count),
          };
        }),

      // --------------------------------------------------
      // Generator Actions
      // --------------------------------------------------

      setPlayersPerTeam: (playersPerTeam) => set({ playersPerTeam }),

      resetAll: () =>
        set({
          players: createInitialPlayers(DEFAULT_PLAYER_COUNT),

          teams: createInitialTeams(DEFAULT_TEAM_COUNT),

          playersPerTeam: DEFAULT_PLAYERS_PER_TEAM,

          generationResult: null,
        }),

      generateTeams: () => {
        const { players, teams } = get();

        const generatedTeams = generateBalancedTeams(players, teams);

        set({
          generationResult: {
            id: `generated-teams-${Math.random().toString(36).slice(2, 11)}`,
            generatedAt: new Date(),
            teams: generatedTeams,
          },
        });
      },
    }),

    // --------------------------------------------------
    // Persistence
    // --------------------------------------------------

    {
      name: "ball-plus-quick-game",

      version: 1,

      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        players: state.players,
        teams: state.teams,
        generationResult: state.generationResult,
      }),
    },
  ),
);
