export const linksToIds = (links: string[]): string[] => {
  return links
    .map((l) => new URL(l).searchParams.get("list"))
    .map((i) => (i ? i : ""))
    .filter((i) => i !== "");
};
