import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  CgPlayButton,
  CgPlayPause,
  CgPlayTrackNext,
  CgPlayTrackPrev,
} from "react-icons/cg";
import { durationToTime, formatTime } from "../../helpers/playlists";
import "./styles.css";

type Props = {
  durationSeconds: number;
  currentTimeSeconds: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPlayPrev: () => void;
  onPlayNext: () => void;
};

export const PlayerLeftControls = ({
  durationSeconds,
  currentTimeSeconds,
  isPlaying,
  onPlay,
  onPause,
  onPlayPrev,
  onPlayNext,
}: Props) => {
  const durationTime = durationToTime(durationSeconds);
  const currentTime = durationToTime(currentTimeSeconds);

  const middleHandler = () => {
    isPlaying ? onPause() : onPlay();
  };

  return (
    <Box
      className={"player-controls-left"}
      display={"flex"}
      justifyContent={{ lg: "space-between" }}
      alignItems={"center"}
      color={"white"}
    >
      <button onClick={onPlayPrev}>
        <CgPlayTrackPrev className="player-next-prev-btn play-controls-btn" />
      </button>
      <button onClick={middleHandler}>
        {isPlaying ? (
          <CgPlayPause
            viewBox="5 5 14 14"
            className="player-play-btn play-controls-btn"
          />
        ) : (
          <CgPlayButton
            viewBox="5 5 14 14"
            className="player-play-btn play-controls-btn"
          />
        )}
      </button>
      <button onClick={onPlayNext}>
        <CgPlayTrackNext className="player-next-prev-btn play-controls-btn" />
      </button>
      <Box
        w={{ md: "140px", base: "max-content" }}
        display={{ base: "none", lg: "block" }}
        position={"relative"}
      >
        <Text
          color={"gray.400"}
          fontWeight={"semibold"}
          position={"absolute"}
          left={0}
          top={"50%"}
          transform={"translateY(-50%)"}
          whiteSpace={"nowrap"}
        >
          {formatTime(
            currentTime.hours,
            currentTime.minutes,
            currentTime.seconds
          )}{" "}
          /{" "}
          {formatTime(
            durationTime.hours,
            durationTime.minutes,
            durationTime.seconds
          )}
        </Text>
      </Box>
    </Box>
  );
};
