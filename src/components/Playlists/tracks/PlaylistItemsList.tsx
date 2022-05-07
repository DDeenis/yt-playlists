import { Box } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { YoutubeVideo } from "../../../hooks/youtube";
import { ItemsLoader } from "../../Common/ItemsLoader";
import { PlaylistListItem } from "./PlaylistListItem";

type Props = {
  videos: YoutubeVideo[];
  onPlay: (id?: string) => void;
  loadVideos: () => void;
  hasMore: boolean;
};

export const PlaylistItemsList = ({
  videos,
  onPlay,
  loadVideos,
  hasMore,
}: Props) => {
  const createOnPlay = (id?: string) => () => onPlay(id);

  return (
    <Box display={"flex"} flexDir={"column"}>
      <InfiniteScroll
        dataLength={videos.length}
        next={loadVideos}
        loader={<ItemsLoader />}
        hasMore={hasMore}
      >
        {videos.map((v) => (
          <PlaylistListItem video={v} onPlay={createOnPlay(v.id)} key={v.id} />
        ))}
      </InfiniteScroll>
    </Box>
  );
};
