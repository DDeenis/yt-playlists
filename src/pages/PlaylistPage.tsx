import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageLoader } from "../components/Common/PageLoader";
import { PlaylistItemsList } from "../components/Playlists/tracks/PlaylistItemsList";
import { usePlaylistVideos } from "../hooks/youtube";

export const PlaylistPage = () => {
  const { id } = useParams();
  const { playlistVideos, loadVideos } = usePlaylistVideos();

  useEffect(() => {
    if (id) {
      loadVideos(id);
    }
  }, []);

  return playlistVideos !== undefined ? (
    <Box maxW={"container.xl"} mx={"auto"}>
      <PlaylistItemsList videos={playlistVideos} />
    </Box>
  ) : (
    <PageLoader />
  );
};
