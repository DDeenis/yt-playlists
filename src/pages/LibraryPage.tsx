import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { YTButton } from "../components/Common/YTButton";
import { Player } from "../components/Player/Player";
import { PlaylistsList } from "../components/Playlists/PlaylistsList";
import { usePlayerConfig } from "../hooks/playlist";
import { useSavedPlaylists } from "../hooks/youtube";

export const LibraryPage = () => {
  const { playlists, removePlaylist } = useSavedPlaylists();
  const { config, setPlayInfo, setVisible } = usePlayerConfig();

  const playPlaylist = (id: string) => {
    setPlayInfo(id, 0);
  };

  return (
    <Box maxW={"container.xl"} mx="auto" py="8" px="4">
      <Box isolation={"isolate"} mb={"6"}>
        <Link to={"/"}>
          <YTButton>Add playlists</YTButton>
        </Link>
      </Box>
      {playlists !== undefined && (
        <PlaylistsList
          playlists={playlists}
          removePlaylist={removePlaylist}
          playPlaylist={playPlaylist}
        />
      )}
      <Player {...config} setVisible={setVisible} />
    </Box>
  );
};
