"use client";

import { useStore } from "zustand";

import {
  type TeamGeneratorStore,
  teamGeneratorStore,
} from "./team-generator-store";
import { useTeamGeneratorStoreContext } from "./team-generator-store-context";

type TeamGeneratorSelector<T> = (state: TeamGeneratorStore) => T;

export function useTeamGeneratorStore<T>(
  selector: TeamGeneratorSelector<T>,
): T {
  const gameStore = useTeamGeneratorStoreContext();

  const store = gameStore ?? teamGeneratorStore;

  return useStore(store, selector);
}
