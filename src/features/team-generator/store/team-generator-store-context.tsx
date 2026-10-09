"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { StoreApi, UseBoundStore } from "zustand";

import type { TeamGeneratorStore } from "./team-generator-store";

type TeamGeneratorStoreInstance = UseBoundStore<StoreApi<TeamGeneratorStore>>;

const TeamGeneratorStoreContext =
  createContext<TeamGeneratorStoreInstance | null>(null);

type TeamGeneratorStoreProviderProps = {
  children: ReactNode;
  store: TeamGeneratorStoreInstance;
};

export function TeamGeneratorStoreProvider({
  children,
  store,
}: TeamGeneratorStoreProviderProps) {
  return (
    <TeamGeneratorStoreContext.Provider value={store}>
      {children}
    </TeamGeneratorStoreContext.Provider>
  );
}

export function useTeamGeneratorStoreContext() {
  return useContext(TeamGeneratorStoreContext);
}
