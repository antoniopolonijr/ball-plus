import { create } from "zustand";

import {
  DEFAULT_PLAYER_COUNT,
  DEFAULT_TEAM_COUNT,
} from "../constants/defaults";
import type { TeamGeneratorStore } from "../types/team-generator-store";
import { createDefaultPlayer } from "../utils/create-default-player";
import { createDefaultPlayers } from "../utils/create-default-players";
import { createDefaultTeam } from "../utils/create-default-team";
import { createDefaultTeams } from "../utils/create-default-teams";

export const useTeamGeneratorStore = create<TeamGeneratorStore>((set) => ({
  players: createDefaultPlayers(DEFAULT_PLAYER_COUNT),

  teams: createDefaultTeams(DEFAULT_TEAM_COUNT),

  generationResults: [],

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
        return {
          players: [
            ...state.players,
            ...createDefaultPlayers(count - currentCount),
          ],
        };
      }

      return {
        players: state.players.slice(0, count),
      };
    }),

  resetPlayers: () =>
    set({
      players: createDefaultPlayers(DEFAULT_PLAYER_COUNT),
    }),

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
        return {
          teams: [...state.teams, ...createDefaultTeams(count - currentCount)],
        };
      }

      return {
        teams: state.teams.slice(0, count),
      };
    }),

  resetTeams: () =>
    set({
      teams: createDefaultTeams(DEFAULT_TEAM_COUNT),
    }),

  addGenerationResult: (result) =>
    set((state) => ({
      generationResults: [result, ...state.generationResults],
    })),

  clearGenerationResults: () =>
    set({
      generationResults: [],
    }),
}));
