import { Center } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AuthNotice } from "../components/Auth/AuthNotice";
import { LoadPlaylists } from "../components/Layout/LoadPlaylists";
import { useGoogleAuth } from "../hooks/auth";
import { useLocalPlaylistsIds } from "../hooks/storage";
import { isAuthAtom } from "../store/auth";

export const LoadPlaylistsPage = () => {
  const navigate = useNavigate();
  const authGoole = useGoogleAuth();
  const { savePlaylistsLinks, playlistsIds } = useLocalPlaylistsIds();
  const isAuth = useRecoilValue(isAuthAtom);

  const setBufferIds = (urls: string[]) => {
    const append = playlistsIds.length !== 0;
    savePlaylistsLinks(urls, append);
    navigate("/library");
  };

  const onClick = (urls: string[]) => {
    isAuth ? setBufferIds(urls) : authGoole().then(() => setBufferIds(urls));
  };

  return (
    <>
      <AuthNotice auth={authGoole} isAuth={isAuth} />
      <Center h="100vh">
        <LoadPlaylists onConfirm={onClick} isAuth={isAuth} />
      </Center>
    </>
  );
};
