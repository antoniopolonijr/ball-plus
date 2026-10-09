"use client";

import { useEffect, useRef } from "react";

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

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const unsubscribe = store.subscribe((state) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        void updateGame({
          gameId: game.id,
          players: state.players,
          teams: state.teams,
          playersPerTeam: state.playersPerTeam,
          generationResult: state.generationResult,
        }).catch((error) => {
          console.error("Failed to save game:", error);
        });
      }, 500);
    });

    return () => {
      unsubscribe();

      if (timeoutId) {
        clearTimeout(timeoutId);
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
      </div>
    </TeamGeneratorStoreProvider>
  );
}
