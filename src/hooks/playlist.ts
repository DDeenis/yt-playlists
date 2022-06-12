import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { PlayerConfig, playerConfigAtom } from "../store/playerConfig";

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

export const usePlayerConfig = () => {
  const [playerConfig, setPlayerConfig] = useRecoilState(playerConfigAtom);

  const setConfigValue = (
    name: keyof PlayerConfig,
    value: PlayerConfig[typeof name]
  ) => {
    setPlayerConfig((config) => ({
      ...config,
      [name]: value,
    }));
  };

  const setPlayInfo = (playlistId: string, videoIndex = 0) => {
    setPlayerConfig((playerConfig) => ({
      ...playerConfig,
      playlistId,
      videoIndex,
    }));
  };

  return {
    config: playerConfig,
    setConfig: setPlayerConfig,
    setPlayInfo,
    setConfigValue,
  };
};
