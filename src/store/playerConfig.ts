import { atom } from "recoil";

export interface PlayerConfig {
  playlistId?: string;
  videoIndex?: number;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const playerConfigAtom = atom<PlayerConfig>({
  key: "player-config",
  default: {
    volume: 50,
    onVolumeChange: () => {},
  },
});
