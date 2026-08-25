"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Couldn't copy the teams. Please try again.");
    }
  }

  return (
    <>
      <Button
        type="button"
        onClick={handleCopy}
        disabled={copied}
        aria-label={copied ? "Teams copied" : "Copy generated teams"}
      >
        {copied ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}

        {copied ? "Copied" : "Copy"}
      </Button>

      <span className="sr-only" aria-live="polite">
        {copied ? "Teams copied to clipboard." : ""}
      </span>
    </>
  );
}
