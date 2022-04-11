import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { PlaylistsList } from "../components/Playlists/PlaylistsList";
import { useLocalPlaylistsIds } from "../hooks/storage";
import {
  usePlaylists,
  usePlaylistsTools,
  useSavedPlaylists,
} from "../hooks/youtube";

export const LibraryPage = () => {
  const { playlists, removePlaylist } = useSavedPlaylists();

  return (
    <Box maxW={"container.xl"} mx="auto" py="8" px="4">
      {playlists !== undefined && (
        <PlaylistsList playlists={playlists} removePlaylist={removePlaylist} />
      )}
    </Box>
  );
};
