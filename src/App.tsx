import {
  Container,
  Textarea,
  Text,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { getPlaylists } from "./api/youtube";
import { useGoogleAuth } from "./hooks/auth";
import { isAuthAtom, userTokenAtom } from "./store/auth";

function App() {
  const auth = useGoogleAuth();

  const token = useRecoilValue(userTokenAtom);
  const isAuth = useRecoilValue(isAuthAtom);
  const [playlistsStr, setPlaylistsStr] = useState("");
  const [playlists, setPlaylists] = useState<gapi.client.youtube.Playlist[]>();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setPlaylistsStr(e.target.value);

  const loadPlaylists = () => {
    getPlaylists(playlistsStr.split("\n"), (res) =>
      setPlaylists(res.result.items)
    );
  };

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
      <Button onClick={loadPlaylists}>Confirm</Button>
      {!isAuth && <Button onClick={auth}>Auth</Button>}
      {Boolean(playlists) && (
        <Box display={"flex"} flexDir="column" gap={"6"}>
          {playlists?.map((p) => (
            <Box display={"flex"} gap={"3"}>
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
