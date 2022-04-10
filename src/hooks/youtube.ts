import { useState } from "react";
import { useRecoilState } from "recoil";
import { getPlaylistsById, getPlaylistVideos } from "../api/youtube";
import { playlistsIdsBuffer } from "../store/playlists";

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<gapi.client.youtube.Playlist[]>();

  const loadPlaylists = (ids: string[]) => {
    getPlaylistsById(ids).then((res) => setPlaylists(res.result.items));
  };

  return { playlists, loadPlaylists };
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
    setPlaylistsIds([...playlistsIds, id]);
  };

  const removePlaylist = (id: string) => {
    if (!playlistsIds.includes(id)) return;
    setPlaylistsIds(playlistsIds.filter((i) => i !== id));
  };

  return {
    addPlaylist,
    removePlaylist,
  };
};
