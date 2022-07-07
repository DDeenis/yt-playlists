import { Box } from "@chakra-ui/react";
import React from "react";
import { PlaylistEntry } from "./PlaylistEntry";
import "./styles.css";

type Props = {
  playlists: gapi.client.youtube.Playlist[];
  currentPlaylistId?: string;
  removePlaylist: (id: string) => void;
  playPlaylist: (id: string) => void;
};

export const PlaylistsList = ({
  playlists,
  currentPlaylistId,
  removePlaylist,
  playPlaylist,
}: Props) => {
  return (
    <Box className="playlists-grid">
      {playlists?.map((p) => (
        <PlaylistEntry
          playlist={p}
          isPlaying={currentPlaylistId === p.id}
          onRemove={removePlaylist}
          onPlay={playPlaylist}
          key={p.id}
        />
      ))}
    </Box>
  );
};
