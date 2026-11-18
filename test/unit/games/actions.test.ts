import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  getUser,
  insert,
  update,
  deleteQuery,
  revalidatePath,
  blobDelete,
  eq,
  and,
} = vi.hoisted(() => ({
  getUser: vi.fn(),
  insert: vi.fn(),
  update: vi.fn(),
  deleteQuery: vi.fn(),
  revalidatePath: vi.fn(),
  blobDelete: vi.fn(),
  eq: vi.fn((column: unknown, value: unknown) => ({ column, value })),
  and: vi.fn((...conditions: unknown[]) => ({
    operator: "and",
    conditions,
  })),
}));

vi.mock("@/hexclave/server", () => ({
  hexclaveServerApp: { getUser },
}));

vi.mock("@/db", () => ({
  db: {
    insert,
    update,
    delete: deleteQuery,
  },
}));

vi.mock("@/db/schema", () => ({
  games: {
    id: "id",
    ownerId: "ownerId",
    name: "name",
    players: "players",
    teams: "teams",
    playersPerTeam: "playersPerTeam",
    generationResult: "generationResult",
    updatedAt: "updatedAt",
    coverImagePath: "coverImagePath",
  },
}));

vi.mock("drizzle-orm", () => ({ eq, and }));
vi.mock("@vercel/blob", () => ({ del: blobDelete }));
vi.mock("next/cache", () => ({ revalidatePath }));

import { updateGame } from "@/features/game/actions/updateGame";
import { updateGameName } from "@/features/game/actions/updateGameName";
import { createGame } from "@/features/games/actions/createGame";
import { deleteGame } from "@/features/games/actions/deleteGame";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("game server actions", () => {
  it("creates an authenticated user's game with the application defaults", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    const returning = vi.fn().mockResolvedValue([{ id: "game-1" }]);
    const values = vi.fn().mockReturnValue({ returning });
    insert.mockReturnValue({ values });

    await expect(createGame()).resolves.toMatchObject({
      success: true,
      id: "game-1",
    });

    expect(values).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "New Game",
        ownerId: "user-1",
        players: expect.any(Array),
        teams: expect.any(Array),
        playersPerTeam: 7,
        generationResult: null,
      }),
    );
  });

  it("rejects creation when there is no authenticated user", async () => {
    getUser.mockResolvedValue(null);

    await expect(createGame()).rejects.toThrow("Unauthorized");
    expect(insert).not.toHaveBeenCalled();
  });

  it("throws when the database does not return the created game", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    insert.mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([]),
      }),
    });

    await expect(createGame()).rejects.toThrow("Failed to create game");
  });

  it("trims a game name before persisting it", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    const returning = vi.fn().mockResolvedValue([{ id: "g1", name: "Tuesday" }]);
    const where = vi.fn().mockReturnValue({ returning });
    const set = vi.fn().mockReturnValue({ where });
    update.mockReturnValue({ set });

    await expect(updateGameName("g1", "  Tuesday  ")).resolves.toEqual({
      id: "g1",
      name: "Tuesday",
    });

    expect(set).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Tuesday" }),
    );
    expect(where).toHaveBeenCalledWith({
      operator: "and",
      conditions: [
        { column: "id", value: "g1" },
        { column: "ownerId", value: "user-1" },
      ],
    });
  });

  it("rejects an empty name without sending an update to the database", async () => {
    getUser.mockResolvedValue({ id: "user-1" });

    await expect(updateGameName("g1", "   ")).rejects.toThrow(
      "Game name cannot be empty",
    );
    expect(update).not.toHaveBeenCalled();
  });

  it("returns not found when the target game is not owned by the user", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    update.mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([]),
        }),
      }),
    });

    await expect(updateGameName("foreign-game", "New name")).rejects.toThrow(
      "Game not found",
    );
  });

  it("serializes generatedAt to ISO text when persisting a generation result", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    const generatedAt = new Date("2026-05-01T12:00:00.000Z");
    const returning = vi.fn().mockResolvedValue([
      { id: "g1", updatedAt: generatedAt },
    ]);
    const where = vi.fn().mockReturnValue({ returning });
    const set = vi.fn().mockReturnValue({ where });
    update.mockReturnValue({ set });

    await updateGame({
      gameId: "g1",
      players: [],
      teams: [],
      playersPerTeam: 7,
      generationResult: {
        id: "generation-1",
        generatedAt,
        teams: [],
      },
    });

    expect(set).toHaveBeenCalledWith(
      expect.objectContaining({
        generationResult: {
          id: "generation-1",
          generatedAt: generatedAt.toISOString(),
          teams: [],
        },
      }),
    );
    expect(where).toHaveBeenCalledWith({
      operator: "and",
      conditions: [
        { column: "id", value: "g1" },
        { column: "ownerId", value: "user-1" },
      ],
    });
  });

  it("persists a null generation result without converting it", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    const set = vi.fn().mockReturnValue({
      where: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([{ id: "g1", updatedAt: new Date() }]),
      }),
    });
    update.mockReturnValue({ set });

    await updateGame({
      gameId: "g1",
      players: [],
      teams: [],
      playersPerTeam: 7,
      generationResult: null,
    });

    expect(set).toHaveBeenCalledWith(
      expect.objectContaining({ generationResult: null }),
    );
  });

  it("returns not found when updating a game that does not belong to the user", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    update.mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([]),
        }),
      }),
    });

    await expect(
      updateGame({
        gameId: "missing",
        players: [],
        teams: [],
        playersPerTeam: 7,
        generationResult: null,
      }),
    ).rejects.toThrow("Game not found");
  });

  it("deletes an owned game and revalidates the games page", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    deleteQuery.mockReturnValue({
      where: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([
          { id: "g1", coverImagePath: null },
        ]),
      }),
    });

    await expect(deleteGame("g1")).resolves.toMatchObject({ success: true });
    expect(revalidatePath).toHaveBeenCalledWith("/games");
  });

  it("rejects deletion when the user is unauthenticated", async () => {
    getUser.mockResolvedValue(null);

    await expect(deleteGame("g1")).rejects.toThrow("Unauthorized");
    expect(deleteQuery).not.toHaveBeenCalled();
  });

  it("returns not found when no owned game is deleted", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    deleteQuery.mockReturnValue({
      where: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([]),
      }),
    });

    await expect(deleteGame("another-users-game")).rejects.toThrow(
      /Game not found/,
    );
  });
});
