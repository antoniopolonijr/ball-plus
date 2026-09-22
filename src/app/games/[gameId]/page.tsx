import { hexclaveServerApp } from "@/hexclave/server";

export default async function GamePage() {
  const _user = await hexclaveServerApp.getUser({
    or: "redirect",
  });

  return (
    <div>
      <h1>Game</h1>
    </div>
  );
}
