import type { InferSelectModel } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import type { games } from "@/db/schema";
import { EmptyGamesState } from "@/features/games/components/EmptyGamesState";
import { CreateGameButton } from "./CreateGameButton";
import GamesList from "./GamesList";
import GamesListNoUser from "./GamesListNoUser";

type Game = InferSelectModel<typeof games>;

type GamesProps = {
  games: Game[] | null;
};

export default function Games({ games }: GamesProps) {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Games</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {games === null ? (
        <GamesListNoUser />
      ) : (
        <section
          aria-labelledby="my-games-title"
          className="flex flex-col gap-6"
        >
          <div className="flex items-center justify-between gap-4">
            <h1
              id="my-games-title"
              className="text-3xl font-bold tracking-tight"
            >
              My Games
            </h1>

            <CreateGameButton />
          </div>

          {games.length === 0 ? (
            <EmptyGamesState />
          ) : (
            <GamesList games={games} />
          )}
        </section>
      )}

      <nav aria-label="Games navigation">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            Back to Home
          </Link>
        </Button>
      </nav>
    </div>
  );
}
