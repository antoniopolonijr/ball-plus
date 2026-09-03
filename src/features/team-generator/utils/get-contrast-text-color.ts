export function getContrastTextColor(color: string): "white" | "black" {
  const hex = color.replace("#", "");

  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);

  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness > 150 ? "black" : "white";
}
