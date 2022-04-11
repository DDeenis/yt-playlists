import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { getPlaylistsById, getPlaylistVideos } from "../api/youtube";
import { playlistsIdsBuffer } from "../store/playlists";
import { useLocalPlaylistsIds } from "./storage";

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<gapi.client.youtube.Playlist[]>();

  const loadPlaylists = (ids: string[]) => {
    getPlaylistsById(ids).then((res) => setPlaylists(res.result.items));
  };

  return { playlists, setPlaylists, loadPlaylists };
};

export const useSavedPlaylists = () => {
  const { playlists, setPlaylists, loadPlaylists } = usePlaylists();
  const { playlistsIds } = useLocalPlaylistsIds();
  const { addPlaylist, removePlaylist: removePlaylistBase } =
    usePlaylistsTools();
  const playlistsCountRef = useRef<number>(0);

  const removePlaylist = (id: string) => {
    removePlaylistBase(id);
    setPlaylists(playlists?.filter((p) => p.id !== id));
  };

  useEffect(() => {
    // don't refresh if playlist removed
    if (playlistsCountRef.current > playlistsIds.length) {
      return;
    } else {
      playlistsCountRef.current = playlistsIds.length;
    }

    if (playlistsIds.length > 0) {
      loadPlaylists(playlistsIds);
    }
  }, [playlistsIds.length]);

  return {
    playlists,
    addPlaylist,
    removePlaylist,
  };
};

export const usePlaylistItems = () => {
  const [playlistItems, setPlaylistsItems] =
    useState<gapi.client.youtube.PlaylistItem[]>();

  const loadItems = (playlistId: string) => {
    getPlaylistVideos(playlistId).then((res) =>
      setPlaylistsItems(res.result.items)
    );
  };

  return { playlistItems, loadItems };
};

export const usePlaylistsTools = () => {
  const [playlistsIds, setPlaylistsIds] = useRecoilState(playlistsIdsBuffer);

  const addPlaylist = (id: string) => {
    if (playlistsIds.includes(id)) return;
    save([...playlistsIds, id]);
  };

  const removePlaylist = (id: string) => {
    if (!playlistsIds.includes(id)) return;
    save(playlistsIds.filter((i) => i !== id));
  };

  const save = (newIds: string[]) => {
    setPlaylistsIds(newIds);
    localStorage.setItem("savedPlaylists", JSON.stringify(newIds));
  };

  return {
    addPlaylist,
    removePlaylist,
  };
};
