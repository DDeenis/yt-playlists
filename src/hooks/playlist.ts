import { useRef, useState } from "react";

export enum YoutubeRepeatState {
  none,
  playlist,
  video,
}

export const useRepeatState = () => {
  const [repeatState, setState] = useState(YoutubeRepeatState.none);
  const repeatStateRef = useRef(repeatState);

  const setRepeatState = (newState: YoutubeRepeatState) => {
    setState(newState);
    repeatStateRef.current = newState;
  };

  return { repeatState, repeatStateRef, setRepeatState };
};
