"use client";

import domtoimage from "dom-to-image-more";
import { Share2 } from "lucide-react";
import type { RefObject } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  targetRef: RefObject<HTMLElement | null>;
}

export function ShareButton({ targetRef }: ShareButtonProps) {
  async function handleShare() {
    const target = targetRef.current;

    if (!target) {
      toast.error("Couldn't prepare the teams for sharing.");
      return;
    }

    try {
      const blob = await domtoimage.toBlob(target, {
        pixelRatio: 2,

        onclone: (clone) => {
          if (!(clone instanceof HTMLElement)) {
            return;
          }

          // hide buttons
          clone.querySelectorAll("[data-share-exclude]").forEach((element) => {
            element.remove();
          });

          // hide scrollbars
          clone
            .querySelectorAll<HTMLElement>('[data-slot="table-container"]')
            .forEach((tableContainer) => {
              tableContainer.style.setProperty(
                "overflow",
                "visible",
                "important",
              );
              tableContainer.style.setProperty("height", "auto", "important");
              tableContainer.style.setProperty(
                "max-height",
                "none",
                "important",
              );
            });
        },
      });

      if (!blob) {
        throw new Error("Failed to generate image.");
      }

      const file = new File([blob], "ball-plus-teams.png", {
        type: "image/png",
      });

      const shareData = {
        files: [file],
        title: "Ball+",
      };

      if (
        !navigator.canShare ||
        !navigator.share ||
        !navigator.canShare(shareData)
      ) {
        toast.info("Image sharing isn't supported by this browser.");
        return;
      }

      await navigator.share(shareData);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Share failed:", error);

      toast.error("Couldn't share the teams. Please try again.");
    }
  }

  return (
    <Button
      type="button"
      onClick={handleShare}
      aria-label="Share generated teams"
    >
      <Share2 className="size-4" aria-hidden="true" />
      Share
    </Button>
  );
}
