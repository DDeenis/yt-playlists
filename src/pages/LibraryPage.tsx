import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { YTButton } from "../components/Common/YTButton";
import { LibraryControls } from "../components/Layout/LibraryControls";
import { PlaylistsList } from "../components/Playlists/PlaylistsList";
import { routes } from "../helpers/routes";
import { usePlayerConfig } from "../hooks/playlist";
import { usePlaylistsFilter } from "../hooks/storage";
import { useSavedPlaylists } from "../hooks/youtube";

export const LibraryPage = () => {
  const { playlists, removePlaylist } = useSavedPlaylists();
  const { setPlayInfo } = usePlayerConfig();
  const { filter, applyFilter, createSetFilterValue } = usePlaylistsFilter();

  const filteredPlaylists = applyFilter(playlists);

  const playPlaylist = (id: string) => setPlayInfo(id, 0);

  return (
    <Box maxW={"container.xl"} mx="auto" py="8" px="4">
      <Box isolation={"isolate"} mb={"6"}>
        <Link to={routes.add}>
          <YTButton>Add playlists</YTButton>
        </Link>
      </Box>
      <Box mb={"6"}>
        <LibraryControls
          filter={filter}
          onFilterChange={createSetFilterValue("filter")}
          onOrderChange={createSetFilterValue("orderBy")}
        />
      </Box>
      {filteredPlaylists !== undefined && (
        <PlaylistsList
          playlists={filteredPlaylists}
          removePlaylist={removePlaylist}
          playPlaylist={playPlaylist}
        />
      )}
    </Box>
  );
};
