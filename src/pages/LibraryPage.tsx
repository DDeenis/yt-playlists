import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { PlaylistsList } from "../components/Playlists/PlaylistsList";
import { useLocalPlaylistsIds } from "../hooks/storage";
import { usePlaylists } from "../hooks/youtube";

export const LibraryPage = () => {
  const { playlistsIds } = useLocalPlaylistsIds();
  const { playlists, loadPlaylists } = usePlaylists();

  useEffect(() => {
    loadPlaylists(playlistsIds);
  }, [playlistsIds.length]);

  return (
    <Box maxW={"container.xl"} mx="auto" py="8" px="4">
      {playlists !== undefined && <PlaylistsList playlists={playlists} />}
    </Box>
  );
};
