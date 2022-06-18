import { Box, useDisclosure } from "@chakra-ui/react";
import { YTButton } from "../components/Common/YTButton";
import { LibraryControls } from "../components/Layout/LibraryControls";
import { AddPlaylistsModal } from "../components/Playlists/Add/AddPlaylistsModal";
import { PlaylistsList } from "../components/Playlists/PlaylistsList";
import { usePlayerConfig } from "../hooks/playlist";
import { useLocalPlaylistsIds, usePlaylistsFilter } from "../hooks/storage";
import { useSavedPlaylists } from "../hooks/youtube";

export const LibraryPage = () => {
  const { playlists, removePlaylist } = useSavedPlaylists();
  const { setPlayInfo } = usePlayerConfig();
  const { filter, applyFilter, createSetFilterValue } = usePlaylistsFilter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { savePlaylists, playlistsIds } = useLocalPlaylistsIds();

  const setBufferIds = (urls: string[]) => {
    const append = playlistsIds.length !== 0;
    savePlaylists(urls, append);
  };

  const filteredPlaylists = applyFilter(playlists);

  const playPlaylist = (id: string) => setPlayInfo(id, 0);

  return (
    <Box maxW={"container.xl"} mx="auto" py="8" px="4">
      <Box isolation={"isolate"} mb={"6"}>
        <YTButton onClick={onOpen}>Add playlists</YTButton>
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
      <AddPlaylistsModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={setBufferIds}
      />
    </Box>
  );
};
