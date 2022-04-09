import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { linksToIds } from "../helpers/playlists";
import { playlistsIdsBuffer } from "../store/playlists";

export const useLocalPlaylistsIds = () => {
  const [playlistsIds, setPlaylistsIds] = useRecoilState(playlistsIdsBuffer);

  const reloadPlaylists = () => {
    const saved = localStorage.getItem("savedPlaylists");

    if (saved) {
      setPlaylistsIds(JSON.parse(saved));
    }
  };

  const savePlaylistsLinks = (urls: string[], append = false) =>
    savePlaylistsIds(linksToIds(urls), append);

  const savePlaylistsIds = (ids: string[], append = false) => {
    let idsToSave = [...new Set(ids)];

    if (append) {
      idsToSave = [...new Set([...ids, ...playlistsIds])];
    }

    localStorage.setItem("savedPlaylists", JSON.stringify(idsToSave));
    reloadPlaylists();
  };

  useEffect(() => {
    reloadPlaylists();
  }, []);

  return {
    playlistsIds,
    reloadPlaylists,
    savePlaylistsLinks,
    savePlaylistsIds,
  };
};
