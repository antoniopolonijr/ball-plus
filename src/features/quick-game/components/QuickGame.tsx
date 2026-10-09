import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ResetAllButton } from "@/features/team-generator/components/generator-actions/ResetAllButton";
import TeamGenerator from "@/features/team-generator/components/TeamGenerator";

export default function QuickGame() {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Quick Game</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section
        aria-labelledby="quick-game-page-title"
        className="flex flex-col gap-6"
      >
        <div className="flex items-center justify-between gap-4 md:gap-6">
          <h1
            id="quick-game-page-title"
            className="text-3xl font-bold tracking-tight text-center"
          >
            Quick Game
          </h1>

          <ResetAllButton />
        </div>

        <TeamGenerator />
      </section>

      <nav aria-label="Quick Game navigation">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            Back to Home
          </Link>
        </Button>
      </nav>
    </div>
  );
}
