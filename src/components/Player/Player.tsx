import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Vlitejs from "vlitejs";
import VlitejsYoutube from "vlitejs/dist/providers/youtube";
import "./styles.css";
import { useVideo } from "../../hooks/youtube";
import { durationToSeconds } from "../../helpers/playlists";
import { PlayerLeftControls } from "./PlayerLeftControls";

type Props = {
  videoId?: string;
  volume?: number;
};

try {
  Vlitejs.registerProvider("youtube", VlitejsYoutube);
} catch (error) {
  console.error("Failed to register youtube provider");
}

export const Player = ({ videoId, volume = 50 }: Props) => {
  const playerRef = useRef<any>(null);
  const { video, loadVideo } = useVideo();
  const [isPlaying, setIsPlaying] = useState(false);

  const videoDurationSeconds = durationToSeconds(
    video?.contentDetails?.duration
  );

  // const getIsPlaying = () => playerRef.current?.getPlayerState() === 1;
  const getCurrentTime = () => {
    const time = playerRef.current?.getCurrentTime();
    return time !== undefined ? Math.ceil(time) : 0;
  };

  const onPlay = () => {
    playerRef.current.playVideo();
    // setIsPlaying(true);
  };
  const onPause = () => {
    playerRef.current.pauseVideo();
    // setIsPlaying(false);
  };

  useEffect(() => {
    // TODO: uncomment after creating a player ui
    new Vlitejs("#player", {
      options: {
        autoplay: false,
      },
      onReady: (player: any) => {
        playerRef.current = player.instance;
        player.instance.setVolume(volume);

        player.instance.addEventListener(
          "onStateChange",
          function (state: { target: any; data: number }) {
            const { data } = state;

            if (data === 0 || data === 2) {
              setIsPlaying(false);
            } else if (data === 1) {
              setIsPlaying(true);
            }
          }
        );
      },
      provider: "youtube",
      plugins: [],
    });
  }, []);

  useEffect(() => {
    videoId && loadVideo(videoId);
  }, [videoId]);

  useEffect(() => {
    if (playerRef.current && videoId) {
      playerRef.current.loadVideoById(videoId);
      // setIsPlaying(true);
    }
  }, [videoId]);

  useEffect(() => {
    if (playerRef.current && volume !== undefined) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  return (
    <Box
      position={"fixed"}
      inset={"auto 0 0 0"}
      bg={"gray.900"}
      py={"4"}
      px={"8"}
      className={"player-layout"}
    >
      <PlayerLeftControls
        durationSeconds={videoDurationSeconds}
        getCurrentTime={getCurrentTime}
        isPlaying={isPlaying}
        onPlay={onPlay}
        onPause={onPause}
      />
      <Box opacity={0} position={"fixed"} bottom={"-100vh"}>
        <div id="player" className="vlite-js" />
      </Box>
    </Box>
  );
};
