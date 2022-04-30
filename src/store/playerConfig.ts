import { atom } from "recoil";

export interface PlayerConfig {
  visible?: boolean;
  playlistId?: string;
  videoIndex?: number;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const playerConfigAtom = atom<PlayerConfig>({
  key: "player-config",
  default: {
    visible: false,
    volume: 50,
    onVolumeChange: () => {},
  },
});
