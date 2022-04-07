import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  playlists: gapi.client.youtube.Playlist[];
};

export const PlaylistsList = ({ playlists }: Props) => {
  return (
    <Box display={"flex"} flexDir="column" gap={"6"}>
      {playlists?.map((p) => (
        <Box display={"flex"} gap={"3"} key={p.id}>
          <Image w="60px" h="60px" src={p.snippet?.thumbnails?.default?.url} />
          <Text color={"white"}>{p.snippet?.localized?.title}</Text>
        </Box>
      ))}
    </Box>
  );
};
