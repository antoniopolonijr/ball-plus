import { Shield } from "lucide-react";

export function TeamsEmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-md border border-dashed p-6 text-center"
      role="status"
      aria-live="polite"
    >
      <Shield className="size-10 text-muted-foreground" aria-hidden="true" />

      <div className="space-y-1">
        <h3 className="font-medium">No teams added</h3>

        <p className="text-sm text-muted-foreground">
          Add teams to start generating balanced teams.
        </p>
      </div>
    </div>
  );
}
