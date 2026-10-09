"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { updateGameName } from "../actions/updateGameName";

type GameNameEditorProps = {
  gameId: string;
  initialName: string;
};

export default function GameNameEditor({
  gameId,
  initialName,
}: GameNameEditorProps) {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function saveName() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setName(initialName);
      setIsEditing(false);
      return;
    }

    if (trimmedName === initialName) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    try {
      await updateGameName(gameId, trimmedName);
      setName(trimmedName);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  function cancelEditing() {
    setName(initialName);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <Input
        autoFocus
        value={name}
        disabled={isSaving}
        aria-label="Game name"
        onChange={(event) => setName(event.target.value)}
        onBlur={() => void saveName()}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            void saveName();
          }

          if (event.key === "Escape") {
            event.preventDefault();
            cancelEditing();
          }
        }}
        className="max-w-md text-3xl font-bold tracking-tight"
      />
    );
  }

  return (
    <div className="flex items-center gap-1">
      <h1 className="text-3xl font-bold tracking-tight">{name}</h1>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setIsEditing(true)}
        aria-label="Edit game name"
        className="text-muted-foreground"
      >
        <Pencil aria-hidden="true" />
      </Button>
    </div>
  );
}
