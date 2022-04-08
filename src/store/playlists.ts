import { atom } from "recoil";

export const playlistsIdsBuffer = atom<string[]>({
  key: "playlists-ids-buffer",
  default: [],
});
