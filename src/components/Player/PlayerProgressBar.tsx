import { Box } from "@chakra-ui/react";
import React from "react";
import { convertToRange } from "../../helpers/playlists";

type Props = {
  durationSeconds: number;
  currentTimeSeconds: number;
};

export const PlayerProgressBar = ({
  durationSeconds,
  currentTimeSeconds,
}: Props) => {
  const progressWidth = convertToRange(
    currentTimeSeconds,
    0,
    durationSeconds,
    0,
    100
  );
  return (
    <>
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
    </>
  );
};
