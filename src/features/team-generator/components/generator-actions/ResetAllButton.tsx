"use client";

import { RotateCcw } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTeamGeneratorStore } from "@/features/team-generator/store/use-team-generator-store";

export function ResetAllButton() {
  const resetAll = useTeamGeneratorStore((state) => state.resetAll);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" aria-label="Reset all data">
          <RotateCcw className="size-4" aria-hidden="true" />
          Reset All
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset all data?</AlertDialogTitle>

          <AlertDialogDescription>
            This action will remove all current players, teams, and generated
            results and restore the default configuration.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction variant="destructive" onClick={resetAll}>
            Reset All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
