"use client";

import { ClipboardPaste, TriangleAlert } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { useTeamGeneratorStore } from "../../store/team-generator-store";
import { parsePlayerList } from "../../utils/parse-player-list";

export function PastePlayersButton() {
  const pastePlayers = useTeamGeneratorStore((state) => state.pastePlayers);

  const [open, setOpen] = useState(false);
  const [playerList, setPlayerList] = useState("");

  function handleClose() {
    setPlayerList("");
    setOpen(false);
  }

  function handlePastePlayers() {
    const playerNames = parsePlayerList(playerList);

    if (playerNames.length === 0) {
      return;
    }

    pastePlayers(playerNames);

    handleClose();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" aria-label="Paste a list of players">
          <ClipboardPaste className="size-4" aria-hidden="true" />
          Paste
          <span className="hidden sm:inline">Players</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paste Player List</DialogTitle>

          <DialogDescription>Paste one player name per line.</DialogDescription>
        </DialogHeader>

        <Textarea
          autoFocus
          value={playerList}
          onChange={(event) => setPlayerList(event.target.value)}
          rows={12}
          placeholder={`Marcos
João
Pedro
Carlos
Lucas
Rafael`}
        />

        <DialogFooter className="flex-col gap-4 sm:flex-col">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TriangleAlert
              className="mt-0.5 size-4 shrink-0 text-amber-500 dark:text-amber-400"
              aria-hidden="true"
            />

            <span>This will replace the current player list.</span>
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handlePastePlayers} disabled={!playerList.trim()}>
              Paste
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
