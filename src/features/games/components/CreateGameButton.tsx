"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createGame } from "@/features/games/actions/createGame";

export function CreateGameButton() {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    setIsCreating(true);

    try {
      const result = await createGame();

      if (result.success) {
        router.push(`/games/${result.id}`);
      }
    } catch (error) {
      console.error("Error creating game:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button onClick={handleCreate} disabled={isCreating}>
      <Plus className="size-4" aria-hidden="true" />
      {isCreating ? "Creating..." : "New Game"}
    </Button>
  );
}
