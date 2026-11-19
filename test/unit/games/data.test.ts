import { beforeEach, describe, expect, it, vi } from "vitest";

const { getUser, findFirst, select, from, where, orderBy } = vi.hoisted(() => ({
  getUser: vi.fn(),
  findFirst: vi.fn(),
  select: vi.fn(),
  from: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
}));

vi.mock("@/hexclave/server", () => ({
  hexclaveServerApp: { getUser },
}));

vi.mock("@/db", () => ({
  db: {
    query: { games: { findFirst } },
    select,
  },
}));

vi.mock("@/db/schema", () => ({
  games: { id: "id", ownerId: "ownerId", updatedAt: "updatedAt" },
}));

vi.mock("drizzle-orm", () => ({
  eq: vi.fn((column, value) => ({ column, value })),
  desc: vi.fn((column) => ({ column, direction: "desc" })),
}));

import { getGame } from "@/features/game/data/getGame";
import { getGames } from "@/features/games/data/getGames";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getGame", () => {
  it("does not query the database for an invalid UUID", async () => {
    getUser.mockResolvedValue({ id: "user-1" });

    await expect(getGame("not-a-uuid")).resolves.toBeUndefined();
    expect(findFirst).not.toHaveBeenCalled();
  });

  it("scopes a valid game lookup to the authenticated user and restores the date", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    findFirst.mockResolvedValue({
      id: "00000000-0000-4000-8000-000000000001",
      ownerId: "user-1",
      generationResult: {
        id: "gen-1",
        generatedAt: "2026-05-01T12:00:00.000Z",
        teams: [],
      },
    });

    const result = await getGame("00000000-0000-4000-8000-000000000001");

    expect(findFirst).toHaveBeenCalledWith({
      where: {
        id: "00000000-0000-4000-8000-000000000001",
        ownerId: "user-1",
      },
    });
    expect(result?.generationResult?.generatedAt).toBeInstanceOf(Date);
    expect(result?.generationResult?.generatedAt.toISOString()).toBe(
      "2026-05-01T12:00:00.000Z",
    );
  });

  it("returns undefined when the current user does not own the requested game", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    findFirst.mockResolvedValue(undefined);

    await expect(
      getGame("00000000-0000-4000-8000-000000000001"),
    ).resolves.toBeUndefined();
  });

  it("keeps a null generation result as null", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    findFirst.mockResolvedValue({
      id: "00000000-0000-4000-8000-000000000001",
      generationResult: null,
    });

    const result = await getGame("00000000-0000-4000-8000-000000000001");

    expect(result?.generationResult).toBeNull();
  });
});

describe("getGames", () => {
  it("lists only the current user's games in most recently updated order", async () => {
    getUser.mockResolvedValue({ id: "user-1" });
    orderBy.mockResolvedValue([{ id: "game-1" }]);
    where.mockReturnValue({ orderBy });
    from.mockReturnValue({ where });
    select.mockReturnValue({ from });

    await expect(getGames()).resolves.toEqual([{ id: "game-1" }]);
    expect(where).toHaveBeenCalledWith({
      column: "ownerId",
      value: "user-1",
    });
    expect(orderBy).toHaveBeenCalledWith({
      column: "updatedAt",
      direction: "desc",
    });
  });
});
