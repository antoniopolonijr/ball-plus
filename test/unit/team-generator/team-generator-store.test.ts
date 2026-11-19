import { describe, expect, it } from "vitest";

import { createTeamGeneratorStore } from "@/features/team-generator/store/team-generator-store";

describe("team generator store", () => {
  it("creates isolated store instances", () => {
    const firstStore = createTeamGeneratorStore();
    const secondStore = createTeamGeneratorStore();

    firstStore.getState().addPlayer();

    expect(firstStore.getState().players).toHaveLength(17);
    expect(secondStore.getState().players).toHaveLength(16);
  });

  it("adds, updates and removes players", () => {
    const store = createTeamGeneratorStore();
    const initialPlayer = store.getState().players[0];

    store.getState().updatePlayer(initialPlayer.id, { name: "Alex" });
    expect(store.getState().players[0].name).toBe("Alex");

    store.getState().removePlayer(initialPlayer.id);
    expect(
      store.getState().players.some(({ id }) => id === initialPlayer.id),
    ).toBe(false);
  });

  it("resizes players while retaining existing entries", () => {
    const store = createTeamGeneratorStore();
    const firstPlayer = store.getState().players[0];

    store.getState().setPlayerCount(18);
    expect(store.getState().players).toHaveLength(18);
    expect(store.getState().players[0]).toBe(firstPlayer);

    store.getState().setPlayerCount(3);
    expect(store.getState().players).toHaveLength(3);
    expect(store.getState().players[0]).toBe(firstPlayer);
  });

  it("pastes player names in order and clears the prior generation", () => {
    const store = createTeamGeneratorStore();
    store.getState().generateTeams();

    store.getState().pastePlayers(["Alex", "Bruna"]);

    expect(store.getState().players.map(({ name }) => name)).toEqual([
      "Alex",
      "Bruna",
    ]);
    expect(store.getState().generationResult).toBeNull();
  });

  it("adds and removes teams", () => {
    const store = createTeamGeneratorStore();
    const firstTeamId = store.getState().teams[0].id;

    store.getState().addTeam();
    expect(store.getState().teams).toHaveLength(3);

    store.getState().removeTeam(firstTeamId);
    expect(store.getState().teams).toHaveLength(2);
    expect(store.getState().teams.some(({ id }) => id === firstTeamId)).toBe(
      false,
    );
  });

  it("toggles player sorting direction when sorting by name", () => {
    const store = createTeamGeneratorStore();
    store.getState().initialize({
      players: [
        {
          id: "b",
          name: "Bruna",
          position: "Defender",
          skill: "Medium",
          isActive: true,
        },
        {
          id: "a",
          name: "Alex",
          position: "Defender",
          skill: "Medium",
          isActive: true,
        },
      ],
      teams: store.getState().teams,
      playersPerTeam: 7,
      generationResult: null,
    });

    store.getState().sortPlayersByName();
    expect(store.getState().players.map(({ name }) => name)).toEqual([
      "Alex",
      "Bruna",
    ]);

    store.getState().sortPlayersByName();
    expect(store.getState().players.map(({ name }) => name)).toEqual([
      "Bruna",
      "Alex",
    ]);
  });

  it("resets all generator state to its defaults", () => {
    const store = createTeamGeneratorStore();
    store.getState().setPlayerCount(2);
    store.getState().setTeamCount(4);
    store.getState().setPlayersPerTeam(5);
    store.getState().generateTeams();

    store.getState().resetAll();

    expect(store.getState().players).toHaveLength(16);
    expect(store.getState().teams).toHaveLength(2);
    expect(store.getState().playersPerTeam).toBe(7);
    expect(store.getState().generationResult).toBeNull();
  });
});
