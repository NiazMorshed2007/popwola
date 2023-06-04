export function extractTranslateValue(
  transform: string,
  axis: "x" | "y"
): string | null {
  const regex = new RegExp(
    `translate\\((-?\\d+\\.?\\d*)px,\\s*(-?\\d+\\.?\\d*)px\\)`
  );
  const match = transform.match(regex);
  if (match) {
    return axis === "x" ? match[1] : match[2];
  }
  return null;
}
