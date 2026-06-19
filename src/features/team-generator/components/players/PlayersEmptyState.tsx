import { Users } from "lucide-react";

export function PlayersEmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-md border border-dashed p-6 text-center"
      role="status"
      aria-live="polite"
    >
      <Users className="size-10 text-muted-foreground" aria-hidden="true" />

      <div className="space-y-1">
        <h3 className="font-medium">No players added</h3>

        <p className="text-sm text-muted-foreground">
          Add players to start generating balanced teams.
        </p>
      </div>
    </div>
  );
}
