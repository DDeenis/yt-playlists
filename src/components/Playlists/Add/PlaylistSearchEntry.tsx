import { Box, IconButton, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";

type Props = {
  playlist: gapi.client.youtube.SearchResult;
  isAdded: boolean;
  onAdd: (id: string) => void;
};

export const PlaylistSearchEntry = ({ playlist, isAdded, onAdd }: Props) => {
  const youtubeLisk = `https://www.youtube.com/playlist?list=${playlist.id?.playlistId}`;

  const handleAdd = () => {
    if (!isAdded && playlist.id?.playlistId) {
      onAdd(playlist.id?.playlistId);
    }
  };

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"50px 1fr 50px"}
      gap={"4"}
      alignItems={"center"}
      key={playlist.id?.videoId}
    >
      <Image
        src={playlist.snippet?.thumbnails?.default?.url}
        alt={playlist.snippet?.title}
        w={"50px"}
        h={"50px"}
        objectFit={"cover"}
      />
      <Text
        color={"white"}
        overflow={"hidden"}
        whiteSpace={"nowrap"}
        textOverflow={"ellipsis"}
      >
        <a href={youtubeLisk} target={"_blank"} rel={"noopener noreferrer"}>
          {playlist.snippet?.title}
        </a>
      </Text>
      <IconButton
        aria-label={"Add playlist"}
        title={"Add"}
        icon={isAdded ? <FaCheckCircle color="green" /> : <FaPlusCircle />}
        variant={"ghost"}
        isRound
        fontSize={"20px"}
        _hover={{ bg: "whiteAlpha.300" }}
        _active={{ bg: "whiteAlpha.400" }}
        onClick={handleAdd}
      />
    </Box>
  );
};
