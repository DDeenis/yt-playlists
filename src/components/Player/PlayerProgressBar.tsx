import { Box, ButtonGroup, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
  const [tooltips, setTooltips] = useState<JSX.Element[]>();
  const progressWidth = convertToRange(
    currentTimeSeconds,
    0,
    durationSeconds,
    0,
    100
  );

  useEffect(() => {
    const arr: JSX.Element[] = [];
    const width = document.documentElement.clientWidth;
    const step = width / durationSeconds;

    for (let i = 0; i < durationSeconds; i++) {
      const second = i + 1;

      const tipMunites = Math.floor(second / 60);
      const tipSeconds = second % 60;

      arr.push(
        <Tooltip
          hasArrow
          placement="top"
          label={formatTime(tipMunites, tipSeconds)}
          key={second}
        >
          <Box
            height={"5px"}
            width={`${step}px`}
            bg={"transparent"}
            cursor={"pointer"}
            onClick={() => onSeek(second)}
          />
        </Tooltip>
      );
    }

    setTooltips(arr);
  }, [durationSeconds]);

  // const mouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const width = document.documentElement.clientWidth;
  //   const step = width / durationSeconds;
  //   const videoSecond = Math.ceil(e.clientX / step);
  // };

  return (
    <Box position={"absolute"} w={"100%"}>
      <Box pos={"absolute"} w={"100%"} zIndex={10} display={"flex"}>
        {tooltips}
      </Box>
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
