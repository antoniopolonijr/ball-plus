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
import GameTeamGenerator from "./GameTeamGenerator";

type GameProps = {
  game: Awaited<ReturnType<typeof import("../data/getGame").getGame>>;
};

export default function Game({ game }: GameProps) {
  if (!game) {
    return null;
  }

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

      <section aria-label="Game" className="flex flex-col gap-6">
        <GameTeamGenerator game={game} />
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
