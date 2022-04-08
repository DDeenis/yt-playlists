import { Center } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AuthNotice } from "../components/Auth/AuthNotice";
import { LoadPlaylists } from "../components/Layout/LoadPlaylists";
import { linksToIds } from "../helpers/playlists";
import { useGoogleAuth } from "../hooks/auth";
import { isAuthAtom } from "../store/auth";
import { playlistsIdsBuffer } from "../store/playlists";

export const LoadPlaylistsPage = () => {
  const authGoole = useGoogleAuth();
  const setPlaysistsBuffer = useSetRecoilState(playlistsIdsBuffer);
  const isAuth = useRecoilValue(isAuthAtom);

  const setBufferIds = (urls: string[]) =>
    isAuth
      ? setPlaysistsBuffer(linksToIds(urls))
      : authGoole().then(() => setPlaysistsBuffer(linksToIds(urls)));

  return (
    <>
      <AuthNotice />
      <Center h="100vh">
        <LoadPlaylists onConfirm={setBufferIds} />
      </Center>
    </>
  );
};
