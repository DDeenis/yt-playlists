import {
  Container,
  Textarea,
  Text,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useGoogleAuth, useTryLogin } from "./hooks/auth";
import { usePlaylists } from "./hooks/youtube";
import { isAuthAtom } from "./store/auth";

function App() {
  const auth = useGoogleAuth();
  const tryLogin = useTryLogin();
  const { playlists, loadPlaylists } = usePlaylists();

  const isAuth = useRecoilValue(isAuthAtom);
  const [playlistsStr, setPlaylistsStr] = useState("");

  useEffect(() => {
    tryLogin();
  });

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setPlaylistsStr(e.target.value);
  const onClick = () => loadPlaylists(playlistsStr.split("\n"));

  return (
    <Container maxW="container.xl" bg="gray.700" minH="100vh">
      <Text color={"white"}>YouTube playlists urls (each on new line)</Text>
      <Textarea
        placeholder="Ex: https://www.youtube.com/playlist?list=xxxxxxxxxxxxxxxxxxxxxx"
        resize={"none"}
        h="200px"
        my="4"
        color={"white"}
        value={playlistsStr}
        onChange={onChange}
      />
      <Button onClick={onClick}>Confirm</Button>
      {!isAuth && (
        <Button onClick={auth} ml="8">
          Auth
        </Button>
      )}
      {Boolean(playlists) && (
        <Box display={"flex"} flexDir="column" gap={"6"}>
          {playlists?.map((p) => (
            <Box display={"flex"} gap={"3"} key={p.id}>
              <Image
                w="60px"
                h="60px"
                src={p.snippet?.thumbnails?.default?.url}
              />
              <Text color={"white"}>{p.snippet?.localized?.title}</Text>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default App;
