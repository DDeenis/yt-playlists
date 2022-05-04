import { Box, Button, Center, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { YTButton } from "../Common/YTButton";

type Props = {
  onConfirm: (urls: string[]) => void;
  isAuth: boolean;
  error?: string;
};

export const LoadPlaylists = ({ onConfirm, isAuth, error }: Props) => {
  const [playlistsStr, setPlaylistsStr] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setPlaylistsStr(e.target.value);
  const confirmLoad = () => onConfirm(playlistsStr.split("\n"));

  return (
    <Box
      bg="gray.900"
      borderRadius={"md"}
      p="4"
      maxW="container.md"
      w="100%"
      display={"flex"}
      flexDir="column"
      gap={"6"}
      isolation="isolate"
    >
      <Text color={"white"} fontWeight={"semibold"} fontSize="lg">
        Enter YouTube playlists urls (each on new line)
      </Text>
      <Textarea
        placeholder="Ex: https://www.youtube.com/playlist?list=xxxxxxxxxxxxxxxxxxxxxx"
        resize={"none"}
        h="200px"
        color={"white"}
        value={playlistsStr}
        onChange={onChange}
        isInvalid={Boolean(error)}
      />
      <YTButton onClick={confirmLoad}>Confirm</YTButton>
      {isAuth && (
        <YTButton>
          <Link to={"/library"} style={{ display: "block" }}>
            To Library
          </Link>
        </YTButton>
      )}
    </Box>
  );
};
