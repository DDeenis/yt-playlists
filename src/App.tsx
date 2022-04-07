import { Button, Box, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { LoadPlaylists } from "./components/Layout/LoadPlaylists";
import { PlaylistsList } from "./components/Playlists/PlaylistsList";
import { useGoogleAuth, useTryLogin } from "./hooks/auth";
import { usePlaylists } from "./hooks/youtube";
import { isAuthAtom } from "./store/auth";

function App() {
  const auth = useGoogleAuth();
  const tryLogin = useTryLogin();
  const { playlists, loadPlaylists } = usePlaylists();

  const isAuth = useRecoilValue(isAuthAtom);

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <Box w="100%" bg="black" minH="100vh" as="main">
      <Center h="100vh">
        <LoadPlaylists onConfirm={loadPlaylists} />
      </Center>

      {!isAuth && (
        <Button onClick={auth} ml="8">
          Auth
        </Button>
      )}
      {playlists !== undefined && <PlaylistsList playlists={playlists} />}
    </Box>
  );
}

export default App;
