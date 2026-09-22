"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateGameDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" aria-hidden="true" />
          <span>New Game</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new game</DialogTitle>

          <DialogDescription>
            Give your game a name to get started. You can add players and
            configure everything afterward.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="game-name">Game name</Label>

            <Input
              id="game-name"
              name="game-name"
              placeholder="e.g. Fut Wednesday"
              autoComplete="off"
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit">Create Game</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
