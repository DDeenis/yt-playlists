import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { YTButton } from "../components/Common/YTButton";
import { PageLoader } from "../components/Common/PageLoader";
import { Player } from "../components/Player/Player";
import { PlaylistInfoBlock } from "../components/Playlists/PlaylistInfoBlock";
import { PlaylistItemsList } from "../components/Playlists/tracks/PlaylistItemsList";
import { usePlaylist, usePlaylistVideos } from "../hooks/youtube";
import { FaArrowLeft } from "react-icons/fa";
import { usePlayerConfig } from "../hooks/playlist";

export const PlaylistPage = () => {
  const { id } = useParams();
  const { playlistVideos, loadVideos } = usePlaylistVideos();
  const { playlist, loadPlaylist } = usePlaylist();
  const navigate = useNavigate();
  const { config, setVolume, setPlayInfo, setOnVolumeChange } =
    usePlayerConfig();

  useEffect(() => {
    if (id) {
      loadVideos(id);
      loadPlaylist(id);
    }
  }, []);

  const onPlay = (id?: string) => {
    const videoIndex = id ? playlistVideos?.findIndex((v) => v.id === id) : -1;

    if (playlist?.id) {
      setPlayInfo(playlist?.id, videoIndex);
    }
  };

  const navigateLibrary = () => navigate("/library");

  return playlistVideos !== undefined ? (
    <Box maxW={"container.xl"} mx={"auto"} py={"8"}>
      <Box mb={"6"} isolation={"isolate"}>
        <YTButton className="playlist-back-btn" onClick={navigateLibrary}>
          <FaArrowLeft /> Back
        </YTButton>
      </Box>
      {playlist && (
        <Box mb={"min(54px, 6vw)"}>
          <PlaylistInfoBlock playlist={playlist} />
        </Box>
      )}
      <PlaylistItemsList videos={playlistVideos} onPlay={onPlay} />
      <Player {...config} />
    </Box>
  ) : (
    <PageLoader />
  );
};
