import { Box, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AuthNotice } from "./components/Auth/AuthNotice";
import { LoadPlaylists } from "./components/Layout/LoadPlaylists";
import { linksToIds } from "./helpers/playlists";
import { useGoogleAuth, useTryLogin } from "./hooks/auth";
import { isAuthAtom } from "./store/auth";
import { playlistsIdsBuffer } from "./store/playlists";

function App() {
  const tryLogin = useTryLogin();
  const authGoole = useGoogleAuth();
  const setPlaysistsBuffer = useSetRecoilState(playlistsIdsBuffer);
  const isAuth = useRecoilValue(isAuthAtom);

  const setBufferIds = (urls: string[]) =>
    isAuth
      ? setPlaysistsBuffer(linksToIds(urls))
      : authGoole().then(() => setPlaysistsBuffer(linksToIds(urls)));

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <Box w="100%" bg="black" minH="100vh" as="main">
      <AuthNotice />
      <Center h="100vh">
        <LoadPlaylists onConfirm={setBufferIds} />
      </Center>
    </Box>
  );
}

export default App;
