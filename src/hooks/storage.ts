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

  const savePlaylistsLinks = (urls: string[]) =>
    savePlaylistsIds(linksToIds(urls));

  const savePlaylistsIds = (ids: string[]) => {
    localStorage.setItem("savedPlaylists", JSON.stringify(ids));
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
