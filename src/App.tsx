import { Button, Box, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { AuthNotice } from "./components/Auth/AuthNotice";
import { LoadPlaylists } from "./components/Layout/LoadPlaylists";
import { PlaylistsList } from "./components/Playlists/PlaylistsList";
import { useGoogleAuth, useTryLogin } from "./hooks/auth";
import { usePlaylists } from "./hooks/youtube";
import { isAuthAtom } from "./store/auth";

function App() {
  const tryLogin = useTryLogin();
  const { loadPlaylists } = usePlaylists();

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <Box w="100%" bg="black" minH="100vh" as="main">
      <AuthNotice />
      <Center h="100vh">
        <LoadPlaylists onConfirm={loadPlaylists} />
      </Center>
    </Box>
  );
}

export default App;
