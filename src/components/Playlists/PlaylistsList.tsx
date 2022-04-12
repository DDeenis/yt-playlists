import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { PlaylistEntry } from "./PlaylistEntry";
import "./styles.css";

type Props = {
  playlists: gapi.client.youtube.Playlist[];
  removePlaylist: (id: string) => void;
};

export const PlaylistsList = ({ playlists, removePlaylist }: Props) => {
  return (
    <Box className="playlists-grid">
      {playlists?.map((p) => (
        <PlaylistEntry playlist={p} onRemove={removePlaylist} key={p.id} />
      ))}
    </Box>
  );
};
