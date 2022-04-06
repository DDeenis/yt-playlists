import { useState } from "react";
import { getPlaylists } from "../api/youtube";

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<gapi.client.youtube.Playlist[]>();

  const loadPlaylists = (urls: string[]) => {
    getPlaylists(urls, (res) => setPlaylists(res.result.items));
  };

  return { playlists, loadPlaylists };
};
