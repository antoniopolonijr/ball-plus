import { PlayersPerTeamSelect } from "./PlayersPerTeamSelect";

export function GeneratorSettings() {
  return (
    <section aria-labelledby="generator-settings-title" className="space-y-4">
      <h3 id="generator-settings-title" className="font-semibold">
        Generator Settings
      </h3>

      <div className="flex items-center justify-between">
        <PlayersPerTeamSelect />
      </div>
    </section>
  );
}
