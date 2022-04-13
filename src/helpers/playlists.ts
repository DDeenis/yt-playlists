export const linksToIds = (links: string[]): string[] => {
  const ids = links
    .map((l) => new URL(l).searchParams.get("list"))
    .map((i) => (i ? i : ""))
    .filter((i) => i !== "");
  const idsUnique = [...new Set(ids)];
  return idsUnique;
};

export const formatTime = (minutes: number, seconds: number) =>
  `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;

export const formatVideoDuration = (source?: string): string => {
  if (!source) {
    return formatTime(0, 0);
  }

  const reg = /PT(\d+)*M(\d+)*S/gm;
  const result = reg.exec(source);

  if (!result) {
    return formatTime(0, 0);
  }

  const minutes = parseInt(result[1]);
  const seconds = parseInt(result[2]);

  return formatTime(minutes, seconds);
};
