import { useState } from "react";
import { getPlaylists, getPlaylistVideos } from "../api/youtube";

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<gapi.client.youtube.Playlist[]>();

  const loadPlaylists = (urls: string[]) => {
    getPlaylists(urls).then((res) => setPlaylists(res.result.items));
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
