import React from "react";

export const linksToIds = (links: string[]): string[] => {
  const ids = links
    .map((l) => new URL(l).searchParams.get("list"))
    .map((i) => (i ? i : ""))
    .filter((i) => i !== "");
  const idsUnique = [...new Set(ids)];
  return idsUnique;
};

const twoCharactersNumber = (num: number) => (num >= 10 ? num : "0" + num);

export const formatTime = (hours: number, minutes: number, seconds: number) => {
  const withHours = hours > 0;
  const minutesFormatted = withHours ? twoCharactersNumber(minutes) : minutes;
  const secondsFormatted = twoCharactersNumber(seconds);

  return `${
    withHours ? hours + ":" : ""
  }${minutesFormatted}:${secondsFormatted}`;
};

const extractTime = (timeStr: string) => {
  const reg = /PT(\d+)*(H(\d+)*)?(M(\d+)*)?S/g;
  const result = reg
    .exec(timeStr)
    ?.map((e) => parseInt(e))
    .filter((e) => !isNaN(e));

  if (!result) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const hours = result[result.length - 3] ?? 0;
  const minutes = result[result.length - 2] ?? 0;
  const seconds = result[result.length - 1] ?? 0;

  return {
    hours,
    minutes,
    seconds,
  };
};

export const formatVideoDuration = (source?: string): string => {
  if (!source) {
    return formatTime(0, 0, 0);
  }

  const { hours, minutes, seconds } = extractTime(source);

  return formatTime(hours, minutes, seconds);
};

export const durationToSeconds = (source?: string): number => {
  if (!source) {
    return 0;
  }

  const { hours, minutes, seconds } = extractTime(source);

  return hours * 60 * 60 + minutes * 60 + seconds;
};

export const durationToTime = (durationSeconds: number) => {
  const hours = Math.floor(durationSeconds / 60 / 60);
  const minutes = Math.floor((durationSeconds / 60) % 60);
  const seconds = durationSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
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
