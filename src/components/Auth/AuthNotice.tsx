import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { FaUserLock, FaLockOpen } from "react-icons/fa";
import "./styles.css";

interface Props {
  auth: () => Promise<unknown>;
  isAuth: boolean;
}

export const AuthNotice = ({ auth, isAuth }: Props) => {
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
          <FaUserLock />
          Auth with Google
        </Button>
      ) : (
        <>
          <Text
            color={"white"}
            fontWeight="semibold"
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            gap={"3"}
          >
            <FaLockOpen className="fill-green" />
            Authentificated with Google
          </Text>
        </>
      )}
    </Box>
  );
};
