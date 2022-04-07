import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { useGoogleAuth } from "../../hooks/auth";
import { isAuthAtom } from "../../store/auth";
import { CheckCircleIcon, LockIcon } from "@chakra-ui/icons";

export const AuthNotice = () => {
  const auth = useGoogleAuth();
  const isAuth = useRecoilValue(isAuthAtom);

  return (
    <Box
      bg="gray.900"
      borderBottomRadius={"md"}
      p="4"
      maxW="container.md"
      w="100%"
      position="fixed"
      left={"50%"}
      transform="auto"
      translateX={"-50%"}
      textAlign="center"
    >
      {!isAuth ? (
        <Button
          onClick={auth}
          w="100%"
          h="56px"
          color={"white"}
          bg="gray.700"
          _hover={{ bg: "gray.600" }}
          _active={{ bg: "gray.600" }}
          position="absolute"
          inset={0}
          borderTopRadius={0}
        >
          <LockIcon color="white" mr="3" />
          Auth with Google
        </Button>
      ) : (
        <Text
          color={"white"}
          fontWeight="semibold"
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
        >
          <CheckCircleIcon color="green.500" mr="3" w="5" h="5" />
          Authentificated with Google
        </Text>
      )}
    </Box>
  );
};
