import { soccerPitch } from "@lucide/lab";
import { Icon } from "lucide-react";
import { CreateGameButton } from "@/features/games/components/CreateGameButton";

export function EmptyGamesState() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-lg border p-8 text-center">
      <Icon
        iconNode={soccerPitch}
        className="size-10 text-muted-foreground"
        aria-hidden="true"
      />

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          You don&apos;t have any games yet.
        </h2>

        <p className="text-muted-foreground">
          Create your first game to get started.
        </p>
      </div>

      <CreateGameButton />
    </div>
  );
}
