"use client";

import { Share2 } from "lucide-react";
import type { RefObject } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getTeamsFileName } from "../../utils/get-generated-teams-file-name";
import { generateTeamsImage } from "../../utils/get-generated-teams-image";

interface ShareButtonProps {
  targetRef: RefObject<HTMLElement | null>;
  generatedAt: Date;
}

export function ShareButton({ targetRef, generatedAt }: ShareButtonProps) {
  async function handleShare() {
    const target = targetRef.current;

    if (!target) {
      toast.error("Couldn't prepare the teams for sharing.");
      return;
    }

    try {
      const blob = await generateTeamsImage(target);

      const file = new File([blob], getTeamsFileName(generatedAt), {
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
    <Button type="button" onClick={handleShare}>
      <Share2 className="size-4" aria-hidden="true" />
      Share
    </Button>
  );
}
