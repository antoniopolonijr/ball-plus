"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GenerateTeamsButton } from "./GenerateTeamsButton";
import { ResetAllButton } from "./ResetAllButton";

export function GeneratorActionsCard() {
  return (
    <section aria-labelledby="generator-actions-title">
      <Card>
        <CardHeader>
          <CardTitle id="generator-settings-title">Generator Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 justify-center items-center">
            <ResetAllButton />
            <GenerateTeamsButton />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
