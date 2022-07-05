import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { PlayerConfig, playerConfigAtom } from "../store/playerConfig";
import { YoutubeRepeatState } from "../types/playlists";

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

  const setSyncedConfigValue = (
    name: keyof PlayerConfig,
    getValue: (
      prevValue: PlayerConfig[typeof name]
    ) => PlayerConfig[typeof name]
  ) => {
    setPlayerConfig((config) => ({
      ...config,
      [name]: getValue(config[name]),
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
    setSyncedConfigValue,
  };
};
