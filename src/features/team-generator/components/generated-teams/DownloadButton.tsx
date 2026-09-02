"use client";

import { Download } from "lucide-react";
import type { RefObject } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getTeamsFileName } from "../../utils/get-generated-teams-file-name";
import { generateTeamsImage } from "../../utils/get-generated-teams-image";

interface DownloadButtonProps {
  targetRef: RefObject<HTMLElement | null>;
  generatedAt: Date;
}

export function DownloadButton({
  targetRef,
  generatedAt,
}: DownloadButtonProps) {
  async function handleDownload() {
    const target = targetRef.current;

    if (!target) {
      toast.error("Couldn't prepare the teams for download.");
      return;
    }

    try {
      const blob = await generateTeamsImage(target);

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = getTeamsFileName(generatedAt);

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);

      toast.error("Couldn't download the teams. Please try again.");
    }
  }

  return (
    <Button type="button" onClick={handleDownload}>
      <Download className="size-4" aria-hidden="true" />
      Download
    </Button>
  );
}
