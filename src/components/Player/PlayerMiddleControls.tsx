import { Box, Center, Image, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  video?: gapi.client.youtube.Video;
};

export const PlayerMiddleControls = ({ video }: Props) => {
  return (
    <Center className="player-controls-middle" display={"flex"}>
      <Image
        src={video?.snippet?.thumbnails?.default?.url}
        w={"64px"}
        h={"64px"}
        objectFit={"contain"}
        mr={"2"}
        display={{ base: "none", md: "block" }}
      />
      <Box display={"flex"} flexDir={"column"} justifyContent={"space-between"}>
        <Text
          color={"white"}
          fontWeight={"semibold"}
          overflow={"hidden"}
          whiteSpace={{ base: "nowrap", lg: "normal" }}
          textOverflow={"ellipsis"}
          maxWidth={{ base: "180px", md: "400px", lg: "full" }}
          fontSize={{ base: "sm", lg: "md" }}
        >
          {video?.snippet?.title}
        </Text>
        <Text color={"gray.400"} fontSize={{ base: "xs", lg: "md" }}>
          {video?.snippet?.channelTitle}
        </Text>
      </Box>
    </Center>
  );
};
