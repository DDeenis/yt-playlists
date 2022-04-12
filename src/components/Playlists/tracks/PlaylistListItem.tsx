import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { formatVideoDuration } from "../../../helpers/playlists";

type Props = {
  video: gapi.client.youtube.Video;
};

export const PlaylistListItem = ({ video }: Props) => {
  const channelLink = `https://www.youtube.com/channel/${video.snippet?.channelId}`;

  return (
    <Box
      w={"100%"}
      display={"flex"}
      alignItems={"center"}
      p={"1"}
      borderBottom={"1px"}
      borderStyle={"solid"}
      borderColor={"gray.800"}
    >
      <Image
        src={video.snippet?.thumbnails?.default?.url}
        alt={video.snippet?.title}
        w={"48px"}
        h={"48px"}
        objectFit={"contain"}
        mr={"6"}
      />
      <Box
        maxW={"50ch"}
        whiteSpace={"pre"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        mr={"4"}
      >
        <Text
          color={"white"}
          fontWeight={"semibold"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
        >
          {video.snippet?.title}
        </Text>
      </Box>
      <Text color={"gray.400"} _hover={{ textDecoration: "underline" }}>
        <a href={channelLink} target={"_blank"} rel={"noopener noreferrer"}>
          {video.snippet?.channelTitle}
        </a>
      </Text>
      <Text color={"gray.400"} fontWeight={"semibold"} ml={"auto"}>
        {formatVideoDuration(video.contentDetails?.duration)}
      </Text>
    </Box>
  );
};
