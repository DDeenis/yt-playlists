import { Box } from "@chakra-ui/react";
import { PlaylistsList } from "../components/Playlists/PlaylistsList";
import { useSavedPlaylists } from "../hooks/youtube";

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
