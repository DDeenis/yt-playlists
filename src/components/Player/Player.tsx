import { Box } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Vlitejs from "vlitejs";
import VlitejsYoutube from "vlitejs/dist/providers/youtube";
import "./styles.css";
import { useVideo } from "../../hooks/youtube";
import {
  durationToSeconds,
  replayIfAllowed,
  videoIdFromUrl,
} from "../../helpers/playlists";
import { PlayerLeftControls } from "./PlayerLeftControls";
import { PlayerProgressBar } from "./PlayerProgressBar";
import { PlayerMiddleControls } from "./PlayerMiddleControls";
import { PlayerRightControls } from "./PlayerRightControls";
import { useRepeatState, YoutubeRepeatState } from "../../hooks/playlist";

type Props = {
  playlistId?: string;
  videoIndex?: number;
  volume?: number;
  onVolumeChange: (volume: number) => void;
};

try {
  Vlitejs.registerProvider("youtube", VlitejsYoutube);
} catch (error) {
  console.error("Failed to register youtube provider");
}

export const Player = ({
  playlistId,
  videoIndex,
  onVolumeChange,
  volume = 50,
}: Props) => {
  const playerRef = useRef<any>(null);
  const skipNextReplayRef = useRef(false);
  const videoIndexRef = useRef<number>(videoIndex ?? 0);
  const { video, loadVideo } = useVideo();
  const { repeatState, repeatStateRef, setRepeatState } = useRepeatState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const videoDurationSeconds = useMemo(
    () => durationToSeconds(video?.contentDetails?.duration),
    [video?.contentDetails?.duration]
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

            if (data === -1) {
              if (repeatStateRef.current === YoutubeRepeatState.video) {
                replayIfAllowed(skipNextReplayRef, () => {
                  player.instance.loadPlaylist({
                    list: playlistId,
                    index: videoIndexRef.current,
                    suggestedQuality: "small",
                  });
                });
              }
            } else if (data === 0) {
              if (repeatStateRef.current === YoutubeRepeatState.playlist) {
                replayIfAllowed(skipNextReplayRef, () => {
                  player.instance.loadPlaylist({
                    list: playlistId,
                    suggestedQuality: "small",
                  });
                });
              }
            } else if (data === 1) {
              setIsPlaying(true);
            } else if (data === 2) {
              setIsPlaying(false);
            } else if (data === 3) {
              const videoId = videoIdFromUrl(player.instance.getVideoUrl());
              videoId && loadVideo(videoId);
            }
          }
        );
      },
      provider: "youtube",
      plugins: [],
    });

    return () => playerRef.current.destroy();
  }, []);

  useEffect(() => {
    videoIndexRef.current = videoIndex ?? 0;
    if (playerRef.current && playlistId) {
      playerRef.current.loadPlaylist({
        list: playlistId,
        index: videoIndex,
        suggestedQuality: "small",
      });
    }
  }, [playlistId, videoIndex]);

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
      <PlayerRightControls
        volume={volume}
        repeatState={repeatState}
        onVolumeChange={onVolumeChange}
        onRepeat={setRepeatState}
      />
      <Box opacity={0} position={"fixed"} bottom={"-100vh"}>
        <div id="player" className="vlite-js" />
      </Box>
    </Box>
  );
};
