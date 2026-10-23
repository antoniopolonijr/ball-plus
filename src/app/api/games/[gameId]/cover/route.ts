import { get } from "@vercel/blob";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { games } from "@/db/schema";
import { hexclaveServerApp } from "@/hexclave/server";

type RouteContext = {
  params: Promise<{ gameId: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const user = await hexclaveServerApp.getUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { gameId } = await params;

  const [game] = await db
    .select({ coverImagePath: games.coverImagePath })
    .from(games)
    .where(and(eq(games.id, gameId), eq(games.ownerId, user.id)))
    .limit(1);

  if (!game?.coverImagePath) {
    return new NextResponse("Not found", { status: 404 });
  }

  const blob = await get(game.coverImagePath, {
    access: "private",
  });

  if (blob?.statusCode !== 200 || !blob.stream) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(blob.stream, {
    headers: {
      "Content-Type": blob.blob.contentType ?? "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-cache",
      ETag: blob.blob.etag,
    },
  });
}
