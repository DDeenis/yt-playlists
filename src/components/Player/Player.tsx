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
import {
  usePlayerConfig,
  useRepeatState,
  YoutubeRepeatState,
} from "../../hooks/playlist";

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
  const skipNextReplayRef = useRef(false);
  const videoIndexRef = useRef<number>(videoIndex ?? 0);
  const [playerInstance, setPlayerInstance] = useState<any>();
  const { video, loadVideo } = useVideo();
  const { repeatState, repeatStateRef, setRepeatState } = useRepeatState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const {
    config: { visible },
    setVisible,
  } = usePlayerConfig();

  const videoDurationSeconds = useMemo(
    () => durationToSeconds(video?.contentDetails?.duration),
    [video?.contentDetails?.duration]
  );

  const getCurrentTime = () => {
    const time = playerInstance?.getCurrentTime();
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
    playerInstance.playVideo();
  };
  const onPause = () => {
    playerInstance.pauseVideo();
  };
  const onPlayPrev = () => {
    playerInstance.previousVideo();
  };
  const onPlayNext = () => {
    playerInstance.nextVideo();
  };
  const onSeek = (seconds: number) => {
    playerInstance.seekTo(seconds, true);
    setCurrentTime(seconds);
  };

  useEffect(() => {
    new Vlitejs("#player", {
      options: {
        autoplay: false,
      },
      onReady: (player: any) => {
        setPlayerInstance(player.instance);
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
              } else {
                setVisible(false);
              }
            } else if (data === 1) {
              setIsPlaying(true);
              setVisible(true);
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

    return () => playerInstance.destroy();
  }, []);

  useEffect(() => {
    videoIndexRef.current = videoIndex ?? 0;
    if (playerInstance && playlistId) {
      playerInstance.loadPlaylist({
        list: playlistId,
        index: videoIndex,
        suggestedQuality: "small",
      });
    }
  }, [playlistId, videoIndex, playerInstance]);

  useEffect(() => {
    if (playerInstance && volume !== undefined) {
      playerInstance.setVolume(volume);
    }
  }, [volume, playerInstance]);

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
      style={{ display: visible ? "grid" : "none" }}
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
        onPlayPrev={onPlayPrev}
        onPlayNext={onPlayNext}
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
