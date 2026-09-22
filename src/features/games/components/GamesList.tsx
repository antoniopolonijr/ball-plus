import { CreateGameDialog } from "@/features/games/components/CreateGameDialog";
import { EmptyGamesState } from "@/features/games/components/EmptyGamesState";

export default function GamesList() {
  return (
    <section
      aria-labelledby="my-games-title"
      className="flex flex-col gap-6 py-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h1 id="my-games-title" className="text-3xl font-bold tracking-tight">
          My Games
        </h1>

        <CreateGameDialog />
      </div>

      <EmptyGamesState />
    </section>
  );
}
