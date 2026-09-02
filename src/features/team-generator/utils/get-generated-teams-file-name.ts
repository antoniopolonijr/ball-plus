export function getTeamsFileName(generatedAt: Date): string {
  const year = generatedAt.getFullYear();
  const month = String(generatedAt.getMonth() + 1).padStart(2, "0");
  const day = String(generatedAt.getDate()).padStart(2, "0");
  const hours = String(generatedAt.getHours()).padStart(2, "0");
  const minutes = String(generatedAt.getMinutes()).padStart(2, "0");

  return `ball-plus-teams-${year}-${month}-${day}-${hours}${minutes}.png`;
}
