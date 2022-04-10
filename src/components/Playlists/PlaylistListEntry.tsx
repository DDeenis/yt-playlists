import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  playlist: gapi.client.youtube.Playlist;
};

export const PlaylistListEntry = ({ playlist }: Props) => {
  const playlistLink = `/playlist/${playlist.id}`;
  const channelLink = `https://www.youtube.com/channel/${playlist.snippet?.channelId}`;

  const preferredImg = playlist.snippet?.thumbnails?.maxres?.url;
  const fallbackImg = playlist.snippet?.thumbnails?.high?.url;
  const imgUrl = preferredImg ? preferredImg : fallbackImg;

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      maxW={160}
      position={"relative"}
      className="playlist-list-item"
    >
      <Box className="playlist-overlay"></Box>
      <Link to={playlistLink} style={{ marginBottom: "8px" }}>
        <Image
          w={"100%"}
          h={160}
          src={imgUrl}
          alt={playlist.snippet?.localized?.title}
          objectFit={"cover"}
          borderRadius={"md"}
          loading="lazy"
        />
      </Link>
      <Link to={playlistLink}>
        <Text
          color={"white"}
          fontWeight={"semibold"}
          _hover={{ textDecoration: "underline" }}
        >
          {playlist.snippet?.localized?.title}
        </Text>
      </Link>
      <Box>
        <Text color={"gray.300"} fontSize={14} whiteSpace="normal">
          <a href={channelLink} target="_blank" rel="noopener noreferrer">
            <Text as="span" _hover={{ textDecoration: "underline" }}>
              {playlist.snippet?.channelTitle}
            </Text>
          </a>{" "}
          • {playlist.contentDetails?.itemCount} tracks
        </Text>
      </Box>
    </Box>
  );
};
