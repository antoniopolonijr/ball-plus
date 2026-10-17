import { soccerBall } from "@lucide/lab";
import { ArrowUpRight, Icon, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PitchBench } from "@/features/team-generator/components/pitch/PitchBench";
import { PitchField } from "@/features/team-generator/components/pitch/PitchField";
import { PitchStarters } from "@/features/team-generator/components/pitch/PitchStarters";
import type {
  PitchPlayerData,
  PitchPlayers,
} from "@/features/team-generator/types/pitch-formation";

type PreviewTeam = {
  id: string;
  name: string;
  color: string;
  formation: PitchPlayers;
  bench: PitchPlayerData[];
};

function createFormation(players: PitchPlayerData[]): PitchPlayers {
  const formation: PitchPlayers = {
    attackers: [],
    midfielders: [],
    defenders: [],
    goalkeepers: [],
  };

  for (const player of players) {
    switch (player.position) {
      case "Attacker":
        formation.attackers.push(player);
        break;
      case "Midfielder":
      case "Unassigned":
        formation.midfielders.push(player);
        break;
      case "Defender":
        formation.defenders.push(player);
        break;
      case "Goalkeeper":
        formation.goalkeepers.push(player);
        break;
    }
  }

  return formation;
}

function createPlayer(
  id: string,
  name: string,
  position: PitchPlayerData["position"],
  rotationOrder: number,
): PitchPlayerData {
  return { id, name, position, rotationOrder };
}

const teamPlayers = [
  {
    id: "blue",
    name: "Team 1",
    color: "#2563eb",
    players: [
      createPlayer("blue-gk", "Leonardo", "Goalkeeper", 0),
      createPlayer("blue-a1", "Paulo", "Attacker", 2),
      createPlayer("blue-m1", "Stefano", "Midfielder", 1),
      createPlayer("blue-m2", "Lucas", "Midfielder", 3),
      createPlayer("blue-m3", "Antonio", "Midfielder", 6),
      createPlayer("blue-d1", "Shay", "Defender", 4),
      createPlayer("blue-d2", "Gustavo", "Defender", 5),
      createPlayer("blue-b1", "Marcos", "Midfielder", 7),
    ],
  },
  {
    id: "red",
    name: "Team 2",
    color: "#dc2626",
    players: [
      createPlayer("red-gk", "Rafael", "Goalkeeper", 0),
      createPlayer("red-a1", "Ivan", "Attacker", 6),
      createPlayer("red-a2", "Rene", "Attacker", 3),
      createPlayer("red-m1", "Tiago", "Midfielder", 2),
      createPlayer("red-m2", "Gabriel", "Midfielder", 1),
      createPlayer("red-d1", "Daniel", "Defender", 4),
      createPlayer("red-d2", "Guilherme", "Defender", 5),
      createPlayer("red-b1", "Jesus", "Defender", 7),
    ],
  },
] satisfies {
  id: string;
  name: string;
  color: string;
  players: PitchPlayerData[];
}[];

const teams: PreviewTeam[] = teamPlayers.map((team) => ({
  id: team.id,
  name: team.name,
  color: team.color,
  formation: createFormation(
    team.players.filter((player) => !player.id.endsWith("-b1")),
  ),
  bench: team.players.filter((player) => player.id.endsWith("-b1")),
}));

function PreviewTeamCard({ team }: { team: PreviewTeam }) {
  const placeholderPlayerNumberMap = new Map(
    teamPlayers
      .find((item) => item.id === team.id)
      ?.players.map((player, index) => [player.id, index + 1]),
  );

  const playerCount =
    Object.values(team.formation).reduce(
      (total, players) => total + players.length,
      0,
    ) + team.bench.length;

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: team.color }}
          />
          <h3 className="truncate text-sm font-semibold">{team.name}</h3>
        </div>

        <span className="flex items-center gap-1 shrink-0 text-xs text-muted-foreground">
          <Users aria-hidden="true" className="size-3" />
          {playerCount} players
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/20">
        <div className="relative aspect-[3/4]">
          <PitchField />

          <PitchStarters
            players={team.formation}
            placeholderPlayerNumberMap={placeholderPlayerNumberMap}
            teamColor={team.color}
          />
        </div>

        <PitchBench
          players={team.bench}
          placeholderPlayerNumberMap={placeholderPlayerNumberMap}
          teamColor={team.color}
        />
      </div>
    </div>
  );
}

export default function TeamGeneratorPreview() {
  return (
    <Card className="overflow-hidden shadow-lg shadow-black/5">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="gap-1.5">
            <Icon
              iconNode={soccerBall}
              aria-hidden="true"
              className="size-3.5 text-primary"
            />
            Team generator
          </Badge>

          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-500" />
            Preview
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg sm:text-xl">Balanced teams</CardTitle>
            <CardDescription>A preview of your next match.</CardDescription>
          </div>

          <div className="flex items-center shrink-0 gap-1 text-sm text-muted-foreground">
            <Shield aria-hidden="true" className="size-3.5" />
            <span>2 teams</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
        {teams.map((team) => (
          <PreviewTeamCard key={team.id} team={team} />
        ))}

        <div className="col-span-2 flex items-center justify-between gap-3 rounded-lg border bg-muted/40 p-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Ready to balance your teams?</p>
            <p className="text-xs text-muted-foreground">
              Add players, choose your settings, and generate.
            </p>
          </div>

          <ArrowUpRight
            aria-hidden="true"
            className="size-5 shrink-0 text-primary"
          />
        </div>
      </CardContent>
    </Card>
  );
}
