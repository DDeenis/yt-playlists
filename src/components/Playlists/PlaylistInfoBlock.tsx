import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { PlaylistDescription } from "./PlaylistDescription";

type Props = {
  playlist: gapi.client.youtube.Playlist;
};

export const PlaylistInfoBlock = ({ playlist }: Props) => {
  const channelLink = `https://www.youtube.com/channel/${playlist.snippet?.channelId}`;
  const publishedYear = playlist.snippet?.publishedAt
    ? new Date(playlist.snippet?.publishedAt).getFullYear()
    : new Date().getFullYear();

  const preferredImg = playlist.snippet?.thumbnails?.maxres?.url;
  const fallbackImg = playlist.snippet?.thumbnails?.high?.url;
  const imgUrl = preferredImg ? preferredImg : fallbackImg;

  return (
    <Box w={"100%"} className={"playlist-info-layout"}>
      <Image
        gridArea={"image"}
        src={imgUrl}
        w={"264px"}
        h={"264px"}
        objectFit={"cover"}
        borderRadius={"md"}
      />
      <Box className={"playlist-info-layout__info"}>
        <Text
          as={"h1"}
          fontSize={"3xl"}
          fontWeight={"bold"}
          color={"white"}
          mb={"4"}
        >
          {playlist.snippet?.title}
        </Text>
        <Text color={"gray.400"} fontWeight={"semibold"} mb={"3"}>
          <Text as={"span"} _hover={{ textDecoration: "underline" }}>
            <a href={channelLink} target={"_blank"} rel={"noopener noreferrer"}>
              {playlist.snippet?.channelTitle}
            </a>
          </Text>{" "}
          • {publishedYear} • {playlist.contentDetails?.itemCount} tracks
        </Text>
        <PlaylistDescription descr={playlist.snippet?.description} />
      </Box>
    </Box>
  );
};
