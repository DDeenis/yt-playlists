import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { PlaylistListEntry } from "./PlaylistListEntry";

type Props = {
  playlists: gapi.client.youtube.Playlist[];
};

export const PlaylistsList = ({ playlists }: Props) => {
  return (
    <Box className="playlists-grid">
      {playlists?.map((p) => (
        <PlaylistListEntry playlist={p} key={p.id} />
      ))}
    </Box>
  );
};
