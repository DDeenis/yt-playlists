import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Vlitejs from "vlitejs";
import VlitejsYoutube from "vlitejs/dist/providers/youtube";
import "./styles.css";
import { useVideo } from "../../hooks/youtube";
import { durationToSeconds } from "../../helpers/playlists";
import { PlayerLeftControls } from "./PlayerLeftControls";
import { PlayerProgressBar } from "./PlayerProgressBar";
import { PlayerMiddleControls } from "./PlayerMiddleControls";
import { PlayerRightControls } from "./PlayerRightControls";

type Props = {
  resourceId?: string;
  volume?: number;
  onVolumeChange: (volume: number) => void;
};

try {
  Vlitejs.registerProvider("youtube", VlitejsYoutube);
} catch (error) {
  console.error("Failed to register youtube provider");
}

export const Player = ({
  resourceId: videoId,
  onVolumeChange,
  volume = 50,
}: Props) => {
  const playerRef = useRef<any>(null);
  const { video, loadVideo } = useVideo();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const videoDurationSeconds = durationToSeconds(
    video?.contentDetails?.duration
  );

  const getCurrentTime = () => {
    const time = playerRef.current?.getCurrentTime();
    return time !== undefined ? Math.ceil(time) : 0;
  };
  const startVideoInterval = () => {
    setCurrentTime(getCurrentTime());
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(intervalId);
  };

  const onPlay = () => {
    playerRef.current.playVideo();
  };
  const onPause = () => {
    playerRef.current.pauseVideo();
  };
  const onSeek = (seconds: number) => {
    console.log(seconds);

    playerRef.current.seekTo(seconds, true);
  };

  useEffect(() => {
    new Vlitejs("#player", {
      options: {
        autoplay: false,
      },
      onReady: (player: any) => {
        playerRef.current = player.instance;
        player.instance.setVolume(volume);
        player.instance.setPlaybackQuality("small");

        player.instance.addEventListener(
          "onStateChange",
          function (state: { target: any; data: number }) {
            const { data } = state;

            if (data === 2) {
              setIsPlaying(false);
            } else if (data === 0) {
              setTimeout(() => setIsPlaying(false), 1000);
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

    if (playerRef.current && videoId) {
      playerRef.current.loadVideoById(videoId);
    }
  }, [videoId]);

  useEffect(() => {
    if (playerRef.current && volume !== undefined) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      return startVideoInterval();
    }
  }, [isPlaying]);

  return (
    <Box
      position={"fixed"}
      inset={"auto 0 0 0"}
      bg={"gray.900"}
      py={"4"}
      px={"8"}
      className={"player-layout"}
    >
      <PlayerProgressBar
        durationSeconds={videoDurationSeconds}
        currentTimeSeconds={currentTime}
        onSeek={onSeek}
      />
      <PlayerLeftControls
        durationSeconds={videoDurationSeconds}
        currentTimeSeconds={currentTime}
        isPlaying={isPlaying}
        onPlay={onPlay}
        onPause={onPause}
      />
      <PlayerMiddleControls video={video} />
      <PlayerRightControls volume={volume} onVolumeChange={onVolumeChange} />
      <Box opacity={0} position={"fixed"} bottom={"-100vh"}>
        <div id="player" className="vlite-js" />
      </Box>
    </Box>
  );
};
