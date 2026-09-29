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

type Game = InferSelectModel<typeof games>;

type GameProps = {
  game: Game;
};

export default function Game({ game }: GameProps) {
  return (
    <div className="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/games">Games</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{game.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section
        aria-labelledby="game-page-title"
        className="flex flex-col gap-6 py-6"
      >
        <header>
          <h1
            id="game-page-title"
            className="text-3xl font-bold tracking-tight"
          >
            {game.name}
          </h1>
        </header>
      </section>

      <nav aria-label="Game navigation">
        <Button asChild variant="outline">
          <Link href="/games">
            <ArrowLeft aria-hidden="true" />
            Back to Games
          </Link>
        </Button>
      </nav>
    </div>
  );
}
