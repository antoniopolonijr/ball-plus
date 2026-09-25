"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GenerateTeamsButton } from "./GenerateTeamsButton";

export function GeneratorActionsCard() {
  return (
    <section aria-labelledby="generator-actions-title">
      <Card>
        <CardHeader>
          <CardTitle id="generator-actions-title" className="sr-only">
            Generator Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 justify-end items-center">
            <GenerateTeamsButton />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
