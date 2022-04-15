import { Box, Center, Image, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  video?: gapi.client.youtube.Video;
};

export const PlayerMiddleControls = ({ video }: Props) => {
  return (
    <Center display={"flex"}>
      <Image
        src={video?.snippet?.thumbnails?.default?.url}
        w={"64px"}
        h={"64px"}
        objectFit={"contain"}
        mr={"2"}
      />
      <Box display={"flex"} flexDir={"column"} justifyContent={"space-between"}>
        <Text color={"white"} fontWeight={"semibold"}>
          {video?.snippet?.title}
        </Text>
        <Text color={"gray.400"}>{video?.snippet?.channelTitle}</Text>
      </Box>
    </Center>
  );
};
