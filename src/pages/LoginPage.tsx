import { Box, Button, Center, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaUserLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { routes } from "../helpers/routes";
import { useGoogleAuth } from "../hooks/auth";
import { isAuthAtom } from "../store/auth";

export const LoginPage = () => {
  const auth = useGoogleAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = useRecoilValue(isAuthAtom);

  const onAuth = () => {
    const params = new URLSearchParams(location.search);
    const nextPage = params.get("then");
    const fallbackPage = routes.library;

    auth().then(() => (nextPage ? navigate(nextPage) : navigate(fallbackPage)));
  };

  useEffect(() => {
    if (isAuth) {
      navigate(routes.library);
    }
  }, [isAuth]);

  return (
    <Center h="100vh">
      <Box w="container.sm" bg="gray.900" borderRadius="md" p="4">
        <Text
          textAlign={"center"}
          fontSize="4xl"
          fontWeight={"bold"}
          className="logo-text"
        >
          YouTube Playlists Player
        </Text>
        <Text textAlign={"center"} color={"white"} py="5">
          Please, log in with you Google account to be able to use this website
        </Text>
        <Button
          onClick={onAuth}
          w="100%"
          color={"white"}
          bg="gray.700"
          _hover={{ bg: "gray.600" }}
          _active={{ bg: "gray.600" }}
          display={"flex"}
          gap={"3"}
        >
          <FaUserLock />
          Auth with Google
        </Button>
      </Box>
    </Center>
  );
};
