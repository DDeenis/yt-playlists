import { LockIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../hooks/auth";

export const LoginPage = () => {
  const auth = useGoogleAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onAuth = () => {
    const params = new URLSearchParams(location.search);
    const nextPage = params.get("then");
    const fallbackPage = "/library";

    auth().then(() => (nextPage ? navigate(nextPage) : navigate(fallbackPage)));
  };

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
        >
          <LockIcon color="white" mr="3" />
          Auth with Google
        </Button>
      </Box>
    </Center>
  );
};
