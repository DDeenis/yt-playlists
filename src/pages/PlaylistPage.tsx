import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { YTButton } from "../components/Common/YTButton";
import { PageLoader } from "../components/Common/PageLoader";
import { Player } from "../components/Player/Player";
import { PlaylistInfoBlock } from "../components/Playlists/PlaylistInfoBlock";
import { PlaylistItemsList } from "../components/Playlists/tracks/PlaylistItemsList";
import { usePlaylist, usePlaylistVideos } from "../hooks/youtube";
import { FaArrowLeft } from "react-icons/fa";

export const PlaylistPage = () => {
  const { id } = useParams();
  const { playlistVideos, loadVideos } = usePlaylistVideos();
  const { playlist, loadPlaylist } = usePlaylist();
  const navigate = useNavigate();
  const [playingVideo, setPlayingVideo] = useState<string>();
  const [volume, setVolume] = useState(20);
  const videoIndex = playingVideo
    ? playlistVideos?.findIndex((v) => v.id === playingVideo)
    : -1;

  useEffect(() => {
    if (id) {
      loadVideos(id);
      loadPlaylist(id);
    }
  }, []);

  const onPlay = (id?: string) => setPlayingVideo(id);
  const onVolumeChange = (val: number) => setVolume(val);

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
      <Player
        playlistId={id}
        videoIndex={videoIndex}
        volume={volume}
        onVolumeChange={onVolumeChange}
      />
    </Box>
  ) : (
    <PageLoader />
  );
};
