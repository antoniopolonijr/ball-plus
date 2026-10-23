"use server";

import { del, put } from "@vercel/blob";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { games } from "@/db/schema";
import { hexclaveServerApp } from "@/hexclave/server";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

async function getOwnedGame(gameId: string, ownerId: string) {
  const [game] = await db
    .select({
      id: games.id,
      coverImagePath: games.coverImagePath,
    })
    .from(games)
    .where(and(eq(games.id, gameId), eq(games.ownerId, ownerId)))
    .limit(1);

  return game;
}

export async function updateGameCover(gameId: string, formData: FormData) {
  const user = await hexclaveServerApp.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const game = await getOwnedGame(gameId, user.id);

  if (!game) {
    throw new Error("Game not found or access denied.");
  }

  const file = formData.get("cover");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Choose an image to upload.");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Use a JPG, PNG, or WebP image.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("The image must be 4 MB or smaller.");
  }

  const extensionByType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  const blob = await put(
    `games/${gameId}/cover.${extensionByType[file.type]}`,
    file,
    {
      access: "private",
      addRandomSuffix: true,
      contentType: file.type,
    },
  );

  try {
    await db
      .update(games)
      .set({
        coverImagePath: blob.pathname,
        updatedAt: new Date(),
      })
      .where(and(eq(games.id, gameId), eq(games.ownerId, user.id)));
  } catch (error) {
    await del(blob.pathname);
    throw error;
  }

  if (game.coverImagePath) {
    await del(game.coverImagePath).catch((error: unknown) => {
      console.error("Failed to delete previous game cover:", error);
    });
  }

  revalidatePath("/games");
  revalidatePath(`/games/${gameId}`);

  return { success: true };
}

export async function removeGameCover(gameId: string) {
  const user = await hexclaveServerApp.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const game = await getOwnedGame(gameId, user.id);

  if (!game) {
    throw new Error("Game not found or access denied.");
  }

  if (!game.coverImagePath) {
    return { success: true };
  }

  await db
    .update(games)
    .set({
      coverImagePath: null,
      updatedAt: new Date(),
    })
    .where(and(eq(games.id, gameId), eq(games.ownerId, user.id)));

  await del(game.coverImagePath);

  revalidatePath("/games");
  revalidatePath(`/games/${gameId}`);

  return { success: true };
}
