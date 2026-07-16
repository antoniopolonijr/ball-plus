export function MatchOverview() {
  return (
    <section aria-labelledby="match-overview-title" className="space-y-2">
      <h3 id="match-overview-title" className="font-semibold">
        Match Overview
      </h3>
      <dl className="space-y-1 text-sm">
        <div className="flex justify-between">
          <dt>Teams</dt>
          <dd>—</dd>
        </div>

        <div className="flex justify-between">
          <dt>Players</dt>
          <dd>—</dd>
        </div>

        <div className="flex justify-between">
          <dt>Goalkeepers</dt>
          <dd>—</dd>
        </div>

        <div className="flex justify-between">
          <dt>Defenders</dt>
          <dd>—</dd>
        </div>

        <div className="flex justify-between">
          <dt>Midfielders</dt>
          <dd>—</dd>
        </div>

        <div className="flex justify-between">
          <dt>Attackers</dt>
          <dd>—</dd>
        </div>

        <div className="flex justify-between">
          <dt>Any</dt>
          <dd>—</dd>
        </div>
      </dl>
    </section>
  );
}
