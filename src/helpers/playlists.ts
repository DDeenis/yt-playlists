export const linksToIds = (links: string[]): string[] => {
  const ids = links
    .map((l) => new URL(l).searchParams.get("list"))
    .map((i) => (i ? i : ""))
    .filter((i) => i !== "");
  const idsUnique = [...new Set(ids)];
  return idsUnique;
};

export const formatVideoDuration = (source?: string): string => {
  if (!source) {
    return "0:00";
  }

  const reg = /PT(\d+)*M(\d+)*S/gm;
  const result = reg.exec(source);

  if (!result) {
    return "0:00";
  }

  const minutes = parseInt(result[1]);
  const seconds = parseInt(result[2]);

  return `${minutes}:${seconds}`;
};
