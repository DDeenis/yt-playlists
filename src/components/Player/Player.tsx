import { Box } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Vlitejs from "vlitejs";
import VlitejsYoutube from "vlitejs/dist/providers/youtube";
import "./styles.css";
import { useVideo } from "../../hooks/youtube";
import {
  durationToSeconds,
  replayIfAllowed,
  toggleRepeat,
  videoIdFromUrl,
} from "../../helpers/playlists";
import { PlayerLeftControls } from "./PlayerLeftControls";
import { PlayerProgressBar } from "./PlayerProgressBar";
import { PlayerMiddleControls } from "./PlayerMiddleControls";
import { PlayerRightControls } from "./PlayerRightControls";
import { useRepeatState } from "../../hooks/playlist";
import { YoutubeRepeatState } from "../../types/playlists";

type Props = {
  playlistId?: string;
  videoIndex?: number;
  volume?: number;
  visible?: boolean;
  onVolumeChange: (volume: number) => void;
  setTrackIndex: (index: number) => void;
  setVisible: (val: boolean) => void;
};

try {
  Vlitejs.registerProvider("youtube", VlitejsYoutube);
} catch (error) {
  console.error("Failed to register youtube provider");
}

const VIDEO_NOT_STARTED = -1;
const VIDEO_ENDED = 0;
const VIDEO_PLAYING = 1;
const VIDEO_PAUSED = 2;
const VIDEO_BUFFERING = 3;

const volumeMin = 0;
const volumeMax = 100;
const volumeStep = 5;
const secondsStep = 10;

export const Player = ({
  playlistId,
  videoIndex,
  volume = 50,
  visible,
  setVisible,
  onVolumeChange,
  setTrackIndex,
}: Props) => {
  const skipNextReplayRef = useRef(false);
  const videoIndexRef = useRef<number>(videoIndex ?? 0);
  const [playerInstance, setPlayerInstance] = useState<any | undefined>();
  const { video, loadVideo } = useVideo();
  const { repeatState, repeatStateRef, setRepeatState } = useRepeatState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

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
  const onSeekSynced = (fn: (prevSeconds: number) => number) => {
    setCurrentTime((prev) => {
      const newVal = fn(prev);
      playerInstance.seekTo(newVal, true);
      return newVal;
    });
  };

  // keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const {
        key,
        // @ts-ignore
        target: { tagName },
      } = e;
      console.log(key);

      if (tagName === "INPUT" || tagName === "TEXTAREA") return;

      e.preventDefault();

      switch (key) {
        case " ":
        case "Space":
          isPlaying ? onPause() : onPlay();
          break;

        case "ArrowUp":
          onVolumeChange(
            volume + volumeStep > volumeMax ? volumeMax : volume + volumeStep
          );
          break;

        case "ArrowDown":
          onVolumeChange(
            volume - volumeStep < volumeMin ? volumeMin : volume - volumeStep
          );
          break;

        case "ArrowRight":
          onSeekSynced((currentTime) => currentTime + secondsStep);
          break;

        case "ArrowLeft":
          onSeekSynced((currentTime) => currentTime - secondsStep);
          break;

        case "r":
        case "R":
          setRepeatState(toggleRepeat(repeatState));
          break;

        case "q":
        case "Q":
          onPlayPrev();
          break;

        case "w":
        case "W":
          onPlayNext();
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, repeatState]);

  // player initialization and events handlings
  useEffect(() => {
    // TODO: fix this
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
            console.log(data);

            switch (data) {
              case VIDEO_NOT_STARTED:
                {
                  if (repeatStateRef.current === YoutubeRepeatState.video) {
                    replayIfAllowed(skipNextReplayRef, () => {
                      player.instance.loadPlaylist({
                        list: playlistId,
                        index: videoIndexRef.current,
                        suggestedQuality: "small",
                      });
                    });
                  }
                }
                break;

              case VIDEO_ENDED:
                {
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
                }
                break;

              case VIDEO_PLAYING:
                {
                  setIsPlaying(true);
                  setVisible(true);
                  setTrackIndex(player.instance.getPlaylistIndex());
                }
                break;

              case VIDEO_PAUSED:
                {
                  setIsPlaying(false);
                }
                break;

              case VIDEO_BUFFERING:
                {
                  const videoId = videoIdFromUrl(player.instance.getVideoUrl());
                  videoId && loadVideo(videoId);
                }
                break;

              default:
                break;
            }
          }
        );
      },
      provider: "youtube",
      plugins: [],
    });
  }, []);

  useEffect(() => {
    videoIndexRef.current = videoIndex ?? 0;

    if (playerInstance && playlistId) {
      playerInstance.stopVideo();
      playerInstance.clearVideo();
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
      px={{ lg: "8", base: "2" }}
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
