import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { games } from "@/db/schema";
import { hexclaveServerApp } from "@/hexclave/server";

export async function getGames() {
  const user = await hexclaveServerApp.getUser({
    or: "redirect",
  });

  return db
    .select()
    .from(games)
    .where(eq(games.ownerId, user.id))
    .orderBy(desc(games.updatedAt));
}
