import React from "react";

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
  const regFallback = /PT(\d+)*S/gm;
  const result = reg.exec(source);
  const resultFallback = regFallback.exec(source);

  if (!result && !resultFallback) {
    return formatTime(0, 0);
  }

  let minutes = 0;
  let seconds = 0;

  if (result) {
    minutes = parseInt(result[1]);
    seconds = parseInt(result[2]);
  } else if (resultFallback) {
    minutes = 0;
    seconds = parseInt(resultFallback[1]);
  }

  return formatTime(minutes, seconds);
};

export const durationToSeconds = (source?: string): number => {
  if (!source) {
    return 0;
  }

  const reg = /PT(\d+)*M(\d+)*S/gm;
  const regFallback = /PT(\d+)*S/gm;
  const result = reg.exec(source);
  const resultFallback = regFallback.exec(source);

  if (!result && !resultFallback) {
    return 0;
  }

  let minutes = 0;
  let seconds = 0;

  if (result) {
    minutes = parseInt(result[1]);
    seconds = parseInt(result[2]);
  } else if (resultFallback) {
    minutes = 0;
    seconds = parseInt(resultFallback[1]);
  }

  return minutes * 60 + seconds;
};

export const convertToRange = (
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export const videoIdFromUrl = (url: string) =>
  new URL(url).searchParams.get("v");

export const replayIfAllowed = (
  skipNextReplayRef: React.MutableRefObject<boolean>,
  cb: () => void
) => {
  if (!skipNextReplayRef.current) {
    cb();
    skipNextReplayRef.current = true;
  } else {
    skipNextReplayRef.current = false;
  }
};

export const mergeItemsAndVideos = (
  playlistItems: gapi.client.youtube.PlaylistItem[],
  videos: gapi.client.youtube.Video[]
) => {
  return videos.map((v, i) => ({
    ...playlistItems[i],
    duration: v.contentDetails?.duration,
  }));
};
