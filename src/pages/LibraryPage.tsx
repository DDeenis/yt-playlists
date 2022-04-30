import { Box } from "@chakra-ui/react";
import { Player } from "../components/Player/Player";
import { PlaylistsList } from "../components/Playlists/PlaylistsList";
import { usePlayerConfig } from "../hooks/playlist";
import { useSavedPlaylists } from "../hooks/youtube";

export const LibraryPage = () => {
  const { playlists, removePlaylist } = useSavedPlaylists();
  const { config, setPlayInfo } = usePlayerConfig();

  const playPlaylist = (id: string) => {
    setPlayInfo(id, 0);
  };

  return (
    <Box maxW={"container.xl"} mx="auto" py="8" px="4">
      {playlists !== undefined && (
        <PlaylistsList
          playlists={playlists}
          removePlaylist={removePlaylist}
          playPlaylist={playPlaylist}
        />
      )}
      <Player {...config} />
    </Box>
  );
};
