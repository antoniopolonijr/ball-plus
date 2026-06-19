import { Card, CardContent } from "@/components/ui/card";
import { GenerateTeamsButton } from "./GenerateTeamsButton";
import { ResetAllButton } from "./ResetAllButton";

export function GeneratorActions() {
  return (
    <section aria-label="Generator Actions">
      <Card>
        <CardContent className="flex flex-col gap-4 justify-center items-center">
          <ResetAllButton />
          <GenerateTeamsButton />
        </CardContent>
      </Card>
    </section>
  );
}
