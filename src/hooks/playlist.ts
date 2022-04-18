import { useState } from "react";

export enum YoutubeRepeatState {
  none,
  playlist,
  video,
}

export const useRepeatState = () => {
  const [repeatState, setRepeatState] = useState(YoutubeRepeatState.none);
  return { repeatState, setRepeatState };
};
