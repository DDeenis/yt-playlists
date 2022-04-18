import { Box, ButtonGroup, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { convertToRange, formatTime } from "../../helpers/playlists";

type Props = {
  durationSeconds: number;
  currentTimeSeconds: number;
  onSeek: (seconds: number) => void;
};

export const PlayerProgressBar = ({
  durationSeconds,
  currentTimeSeconds,
  onSeek,
}: Props) => {
  const [selectedSecond, setSelectedSecond] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const tipMunites = Math.floor(selectedSecond / 60);
  const tipSeconds = selectedSecond % 60;
  const progressWidth = convertToRange(
    currentTimeSeconds,
    0,
    durationSeconds,
    0,
    100
  );

  const mouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (boxRef.current) {
      boxRef.current.style.left = `${e.clientX}px`;
    }
  };
  const mouseLeave = () => {
    if (boxRef.current) {
      boxRef.current.style.left = "-100%";
    }
  };
  const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = document.documentElement.clientWidth;
    const step = width / durationSeconds;
    const videoSecond = Math.ceil(e.clientX / step);

    if (selectedSecond !== videoSecond) {
      setSelectedSecond(videoSecond);
    }
  };

  return (
    <Box
      position={"absolute"}
      w={"100%"}
      h={"10px"}
      onMouseOver={mouseOver}
      onMouseLeave={mouseLeave}
      onMouseMove={mouseMove}
    >
      <Tooltip
        hasArrow
        placement="top"
        label={formatTime(tipMunites, tipSeconds)}
      >
        <Box
          ref={boxRef}
          height={"10px"}
          width={`5px`}
          bg={"transparent"}
          cursor={"pointer"}
          pos={"absolute"}
          left={"-100%"}
          zIndex={10}
          onClick={() => onSeek(selectedSecond)}
        />
      </Tooltip>
      <Box
        bg={"gray.400"}
        height={"5px"}
        position={"absolute"}
        width={"100%"}
      />
      <Box
        bg={"red.600"}
        height={"5px"}
        position={"absolute"}
        left={"0"}
        style={{ width: `${progressWidth}%` }}
      />
    </Box>
  );
};
