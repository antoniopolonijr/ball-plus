"use client";

import { ImagePlus, ImageUp, LoaderCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useRef, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  removeGameCover,
  updateGameCover,
} from "@/features/games/actions/updateGameCover";

type GameCoverProps = {
  gameId: string;
  gameName: string;
  hasCover: boolean;
};

const COVER_ACCEPT = "image/jpeg,image/png,image/webp";

const COVER_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

export function GameCover({ gameId, gameName, hasCover }: GameCoverProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [coverVersion, setCoverVersion] = useState(0);

  const coverUrl = `/api/games/${gameId}/cover?v=${coverVersion}`;

  function openFilePicker() {
    if (!isPending) {
      inputRef.current?.click();
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError(null);

    const formData = new FormData();
    formData.set("cover", file);

    startTransition(async () => {
      try {
        await updateGameCover(gameId, formData);

        setCoverVersion((version) => version + 1);
        router.refresh();
      } catch (uploadError) {
        setError(
          uploadError instanceof Error
            ? uploadError.message
            : "Could not upload the image.",
        );
      } finally {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    });
  }

  function handleRemove() {
    setError(null);

    startTransition(async () => {
      try {
        await removeGameCover(gameId);
        router.refresh();
      } catch (removeError) {
        setError(
          removeError instanceof Error
            ? removeError.message
            : "Could not remove the image.",
        );
      }
    });
  }

  return (
    <div className="space-y-2">
      <div
        className="group/cover relative aspect-[16/9] overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.22),transparent_65%),linear-gradient(135deg,var(--color-emerald-950),var(--color-background))]"
        aria-busy={isPending}
      >
        {hasCover ? (
          <>
            <Image
              src={coverUrl}
              alt={`Cover image for ${gameName}`}
              fill
              sizes={COVER_SIZES}
              className="object-contain transition-transform duration-300 group-hover/cover:scale-[1.02]"
              unoptimized
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-2 p-3 opacity-100 transition-opacity sm:opacity-0 sm:group-hover/cover:opacity-100 sm:group-focus-within/cover:opacity-100">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                disabled={isPending}
                onClick={handleRemove}
                aria-label={`Remove cover image for ${gameName}`}
                className="pointer-events-auto"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                disabled={isPending}
                onClick={openFilePicker}
                aria-label={`Change cover image for ${gameName}`}
                className="pointer-events-auto"
              >
                <ImageUp className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={openFilePicker}
            disabled={isPending}
            aria-label={`Add cover image for ${gameName}`}
            className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-2 text-foreground outline-none focus-visible:ring-inset focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-wait bject-cover transition-transform duration-300 group-hover/cover:scale-[1.03] font-bold"
          >
            <span
              className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
              aria-hidden="true"
            >
              <ImagePlus className="size-5" />
            </span>

            <span className="text-sm">Add cover image</span>

            <span className="text-xs font-medium">
              Choose a team photo or badge
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={COVER_ACCEPT}
          onChange={handleFileChange}
          className="sr-only"
          tabIndex={-1}
          aria-label={`Upload cover image for ${gameName}`}
        />

        {isPending && (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center gap-2 bg-black/55 text-white"
            role="status"
          >
            <LoaderCircle className="size-6 animate-spin" aria-hidden="true" />
            <span className="sr-only">
              {hasCover ? "Updating cover image" : "Uploading cover image"}
            </span>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
