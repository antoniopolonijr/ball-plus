"use client";

import { useEffect, useRef, useState } from "react";

import { updateGame } from "@/features/game/actions/updateGame";
import { ResetAllButton } from "@/features/team-generator/components/generator-actions/ResetAllButton";
import TeamGenerator from "@/features/team-generator/components/TeamGenerator";
import { createTeamGeneratorStore } from "@/features/team-generator/store/team-generator-store";
import { TeamGeneratorStoreProvider } from "@/features/team-generator/store/team-generator-store-context";
import GameNameEditor from "./GameNameEditor";

type GameTeamGeneratorProps = {
  game: NonNullable<
    Awaited<ReturnType<typeof import("../data/getGame").getGame>>
  >;
};

type SaveStatus = "saved" | "saving" | "error";

export default function GameTeamGenerator({ game }: GameTeamGeneratorProps) {
  const storeRef = useRef<ReturnType<typeof createTeamGeneratorStore> | null>(
    null,
  );

  if (!storeRef.current) {
    storeRef.current = createTeamGeneratorStore();

    storeRef.current.getState().initialize({
      players: game.players,
      teams: game.teams,
      playersPerTeam: game.playersPerTeam,
      generationResult: game.generationResult,
    });
  }

  const store = storeRef.current;
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [saveRevision, setSaveRevision] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let latestRevision = 0;
    let isActive = true;
    let saveQueue: Promise<void> = Promise.resolve();

    function persistRevision(revision: number) {
      // Serialize writes so a slower, older request cannot overwrite a newer
      // game state in Neon. A queued revision is skipped when it is obsolete.
      saveQueue = saveQueue
        .catch(() => undefined)
        .then(async () => {
          if (revision !== latestRevision) {
            return;
          }

          const state = store.getState();

          await updateGame({
            gameId: game.id,
            players: state.players,
            teams: state.teams,
            playersPerTeam: state.playersPerTeam,
            generationResult: state.generationResult,
          });

          if (isActive && revision === latestRevision) {
            setSaveStatus("saved");
          }
        })
        .catch((error: unknown) => {
          console.error("Failed to save game:", error);

          if (isActive && revision === latestRevision) {
            setSaveStatus("error");
          }
        });
    }

    const unsubscribe = store.subscribe(() => {
      latestRevision += 1;
      const revision = latestRevision;

      setSaveRevision(revision);
      setSaveStatus("saving");

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        persistRevision(revision);
      }, 500);
    });

    return () => {
      isActive = false;
      unsubscribe();

      // Do not discard the last debounced edit when the user navigates away.
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
        persistRevision(latestRevision);
      }
    };
  }, [game.id, store]);

  return (
    <TeamGeneratorStoreProvider store={store}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 md:gap-6">
          <GameNameEditor gameId={game.id} initialName={game.name} />

          <ResetAllButton />
        </div>

        <TeamGenerator generatedTeamsTitle={game.name} />
        <p
          role="status"
          aria-live="polite"
          data-testid="game-save-status"
          data-state={saveStatus}
          data-revision={saveRevision}
          className="text-xs text-muted-foreground"
        >
          {saveStatus === "saving"
            ? "Saving changes…"
            : saveStatus === "error"
              ? "Unable to save changes"
              : "All changes saved"}
        </p>
      </div>
    </TeamGeneratorStoreProvider>
  );
}
