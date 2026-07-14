/**
 * Parses a pasted player list into an array of player names.
 *
 * - Trims leading and trailing whitespace.
 * - Removes empty lines.
 * - Preserves the original player order.
 */
export function parsePlayerList(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
