import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { playerConfigAtom } from "../store/playerConfig";

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

  const setPlayInfo = (playlistId: string, videoIndex = 0) => {
    setPlayerConfig((playerConfig) => ({
      ...playerConfig,
      playlistId,
      videoIndex,
      onVolumeChange: (val: number) => setVolume(val),
    }));
  };

  const setVolume = (volume: number) => {
    setPlayerConfig((playerConfig) => ({ ...playerConfig, volume }));
  };

  const setOnVolumeChange = (cb: (val: number) => void) => [
    setPlayerConfig((playerConfig) => ({
      ...playerConfig,
      onVolumeChange: cb,
    })),
  ];

  const setVisible = (visible: boolean) => {
    setPlayerConfig((playerConfig) => ({ ...playerConfig, visible }));
  };

  return {
    config: playerConfig,
    setConfig: setPlayerConfig,
    setPlayInfo,
    setVolume,
    setOnVolumeChange,
    setVisible,
  };
};
