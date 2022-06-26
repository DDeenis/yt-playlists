import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
  descr?: string;
};

const maxLenght = 400;

export const PlaylistDescription = ({ descr = "" }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandable = descr?.length > maxLenght && !isExpanded;
  const visibleDescr =
    isExpanded || !isExpandable ? descr : descr?.substring(0, maxLenght) + "…";

  const expand = () => setIsExpanded(true);
  const collapse = () => setIsExpanded(false);

  return (
    <Box>
      <Box position={"relative"} overflow={"hidden"}>
        <Text
          color={"gray.400"}
          whiteSpace={{ md: "pre", base: "normal" }}
          wordBreak={{ md: "break-all", base: "normal" }}
        >
          {visibleDescr}
        </Text>
        {isExpandable && <Box className={"playlist-description-overlay"}></Box>}
      </Box>
      {isExpandable && !isExpanded && (
        <button className={"playlist-description-btn"} onClick={expand}>
          <Text color={"gray.500"}>More</Text>
        </button>
      )}
      {isExpanded && (
        <button className={"playlist-description-btn"} onClick={collapse}>
          <Text color={"gray.500"}>Less</Text>
        </button>
      )}
    </Box>
  );
};
