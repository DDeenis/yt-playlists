import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { PlaylistEntry } from "./PlaylistEntry";
import "./styles.css";

type Props = {
  playlists: gapi.client.youtube.Playlist[];
  removePlaylist: (id: string) => void;
  playPlaylist: (id: string) => void;
};

export const PlaylistsList = ({
  playlists,
  removePlaylist,
  playPlaylist,
}: Props) => {
  return (
    <Box className="playlists-grid">
      {playlists?.map((p) => (
        <PlaylistEntry
          playlist={p}
          onRemove={removePlaylist}
          onPlay={playPlaylist}
          key={p.id}
        />
      ))}
    </Box>
  );
};
