import { GenerateTeamsButton } from "./GenerateTeamsButton";
import { ResetAllButton } from "./ResetAllButton";

export function GeneratorActions() {
  return (
    <section
      aria-label="Generator Actions"
      className="flex flex-col gap-4 justify-center items-center"
    >
      <ResetAllButton />
      <GenerateTeamsButton />
    </section>
  );
}
