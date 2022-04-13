import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageLoader } from "../components/Common/PageLoader";
import { Player } from "../components/Player/Player";
import { PlaylistInfoBlock } from "../components/Playlists/PlaylistInfoBlock";
import { PlaylistItemsList } from "../components/Playlists/tracks/PlaylistItemsList";
import { usePlaylist, usePlaylistVideos } from "../hooks/youtube";

export const PlaylistPage = () => {
  const { id } = useParams();
  const { playlistVideos, loadVideos } = usePlaylistVideos();
  const { playlist, loadPlaylist } = usePlaylist();
  const [playingVideo, setPlayingVideo] = useState<string>();

  useEffect(() => {
    if (id) {
      loadVideos(id);
      loadPlaylist(id);
    }
  }, []);

  const onPlay = (id?: string) => {
    setPlayingVideo(id);
  };

  return playlistVideos !== undefined ? (
    <Box maxW={"container.xl"} mx={"auto"} py={"8"}>
      {playlist && (
        <Box mb={"min(54px, 6vw)"}>
          <PlaylistInfoBlock playlist={playlist} />
        </Box>
      )}
      <PlaylistItemsList videos={playlistVideos} onPlay={onPlay} />
      <Player videoId={playingVideo} />
    </Box>
  ) : (
    <PageLoader />
  );
};
