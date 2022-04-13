import { Box, IconButton, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Vlitejs from "vlitejs";
import VlitejsYoutube from "vlitejs/dist/providers/youtube";
import { CgPlayTrackNext, CgPlayTrackPrev, CgPlayButton } from "react-icons/cg";
import "./styles.css";
import { useVideo } from "../../hooks/youtube";
import {
  durationToSeconds,
  formatTime,
  formatVideoDuration,
} from "../../helpers/playlists";

type Props = {
  videoId?: string;
  volume?: number;
};

Vlitejs.registerProvider("youtube", VlitejsYoutube);

export const Player = ({ videoId, volume = 50 }: Props) => {
  const playerRef = useRef<any>(null);
  const isPlayingRef = useRef<boolean>(false);
  const { video, loadVideo } = useVideo();
  const [playerLoaded, setPlayerLoaded] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const videoDurationSeconds = durationToSeconds(
    video?.contentDetails?.duration
  );
  const videoDurationStr = formatVideoDuration(video?.contentDetails?.duration);
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = currentTime % 60;

  const startVideoInterval = useCallback(() => {
    setCurrentTime(0);
    const intervalId = setInterval(() => {
      if (isPlayingRef.current) {
        setCurrentTime((val) => val + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // TODO: uncomment after creating a player ui
    new Vlitejs("#player", {
      options: {
        autoplay: false,
      },
      onReady: (player: any) => {
        playerRef.current = player.instance;
        player.instance.setVolume(volume);
        setPlayerLoaded(true);
      },
      provider: "youtube",
      plugins: [],
    });
  }, []);

  useEffect(() => {
    videoId && loadVideo(videoId);
    return startVideoInterval();
  }, [videoId]);

  useEffect(() => {
    if (playerLoaded && videoId) {
      playerRef.current.loadVideoById(videoId);
      isPlayingRef.current = true;
    }
  }, [videoId, playerLoaded]);

  useEffect(() => {
    if (playerLoaded && volume !== undefined) {
      playerRef.current.setVolume(volume);
    }
  }, [volume, playerLoaded]);

  useEffect(() => {
    if (currentTime >= videoDurationSeconds) {
      isPlayingRef.current = false;
    }
  }, [currentTime]);

  return (
    <Box
      position={"fixed"}
      inset={"auto 0 0 0"}
      bg={"gray.900"}
      py={"4"}
      px={"8"}
      className={"player-layout"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        color={"white"}
      >
        <CgPlayTrackPrev className="player-next-prev-btn play-controls-btn" />
        <CgPlayButton
          viewBox="5 5 14 14"
          className="player-play-btn play-controls-btn"
        />
        <CgPlayTrackNext className="player-next-prev-btn play-controls-btn" />
        <Box w={"80px"} position={"relative"}>
          <Text
            color={"gray.400"}
            fontWeight={"semibold"}
            position={"absolute"}
            left={0}
            top={"50%"}
            transform={"translateY(-50%)"}
          >
            {formatTime(currentMinutes, currentSeconds)} / {videoDurationStr}
          </Text>
        </Box>
      </Box>
      <Box opacity={0} position={"fixed"} bottom={"-100vh"}>
        <div id="player" className="vlite-js" />
      </Box>
    </Box>
  );
};
