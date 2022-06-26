import { Box, IconButton, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { formatVideoDuration } from "../../../helpers/playlists";
import { YoutubeVideo } from "../../../hooks/youtube";

type Props = {
  video: YoutubeVideo;
  onPlay: () => void;
};

export const PlaylistListItem = ({ video, onPlay }: Props) => {
  const channelLink = `https://www.youtube.com/channel/${video.snippet?.channelId}`;

  return (
    <Box
      w={"100%"}
      // display={"flex"}
      display={{ md: "flex", base: "grid" }}
      gridAutoFlow={"column"}
      alignItems={"center"}
      p={"1"}
      borderBottom={"1px"}
      borderStyle={"solid"}
      borderColor={"gray.800"}
    >
      <Box position={"relative"} mr={"6"} className={"track-image-container"}>
        <Image
          src={video.snippet?.thumbnails?.default?.url}
          alt={video.snippet?.title}
          w={"48px"}
          h={"48px"}
          objectFit={"contain"}
        />
        <Box
          as={"button"}
          aria-label={"Play track"}
          className={"track-play-btn"}
          onClick={onPlay}
        >
          <FaPlay />
        </Box>
      </Box>
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
      <Text
        color={"gray.400"}
        overflow={"hidden"}
        whiteSpace={"nowrap"}
        textOverflow={"ellipsis"}
        _hover={{ textDecoration: "underline" }}
      >
        <a href={channelLink} target={"_blank"} rel={"noopener noreferrer"}>
          {video.snippet?.channelTitle}
        </a>
      </Text>
      <Text color={"gray.400"} fontWeight={"semibold"} ml={"auto"}>
        {formatVideoDuration(video.duration)}
      </Text>
    </Box>
  );
};
