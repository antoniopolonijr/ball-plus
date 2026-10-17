import { ArrowRight, FolderOpen, Zap } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomeActions() {
  return (
    <nav className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link href="/games">
          <FolderOpen aria-hidden="true" className="size-4" />
          My Games
        </Link>
      </Button>

      <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
        <Link href="/quick-game">
          <Zap aria-hidden="true" className="size-4" />
          Try Quick Game
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Button>
    </nav>
  );
}
