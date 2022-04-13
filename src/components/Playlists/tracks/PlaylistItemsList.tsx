import { Box } from "@chakra-ui/react";
import React from "react";
import { PlaylistListItem } from "./PlaylistListItem";

type Props = {
  videos: gapi.client.youtube.Video[];
  onPlay: (id?: string) => void;
};

export const PlaylistItemsList = ({ videos, onPlay }: Props) => {
  const createOnPlay = (id?: string) => () => onPlay(id);

  return (
    <Box display={"flex"} flexDir={"column"}>
      {videos.map((v) => (
        <PlaylistListItem video={v} onPlay={createOnPlay(v.id)} key={v.id} />
      ))}
    </Box>
  );
};
