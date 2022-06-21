import { Box, Input, Text } from "@chakra-ui/react";
import { debounce } from "debounce";
import React, { useCallback, useState } from "react";
import { ItemsLoader } from "../../Common/ItemsLoader";
import { PlaylistSearchEntry } from "./PlaylistSearchEntry";

type Props = {
  loading: boolean;
  playlists?: gapi.client.youtube.SearchResult[];
  existingPlaylistsIds: string[];
  addPlaylist: (id: string) => void;
  onSearch: (query: string) => void;
};

export const SearchPlaylists = ({
  addPlaylist,
  onSearch,
  loading,
  playlists,
  existingPlaylistsIds,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounced = useCallback(debounce(onSearch, 300), []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    if (value) {
      searchDebounced(value);
    }
  };

  return (
    <>
      <Input w={"full"} mb={"4"} value={searchQuery} onChange={handleSearch} />
      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"2"}
        minH={"14rem"}
        maxH={"md"}
        overflowY={"scroll"}
      >
        {playlists &&
          !loading &&
          playlists.map((p) => (
            <PlaylistSearchEntry
              playlist={p}
              isAdded={
                p.id?.playlistId
                  ? existingPlaylistsIds.includes(p.id?.playlistId)
                  : false
              }
              onAdd={addPlaylist}
            />
          ))}
        {(!playlists || playlists.length === 0) && !loading && (
          <Text color={"white"} alignSelf={"center"}>
            No results
          </Text>
        )}
        {loading && <ItemsLoader />}
      </Box>
    </>
  );
};
