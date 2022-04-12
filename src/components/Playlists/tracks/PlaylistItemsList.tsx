import { Box } from "@chakra-ui/react";
import React from "react";
import { PlaylistListItem } from "./PlaylistListItem";

type Props = {
  videos: gapi.client.youtube.Video[];
};

export const PlaylistItemsList = ({ videos }: Props) => {
  return (
    <Box display={"flex"} flexDir={"column"}>
      {videos.map((v) => (
        <PlaylistListItem video={v} key={v.id} />
      ))}
    </Box>
  );
};
