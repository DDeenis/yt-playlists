import { Box, Center } from "@chakra-ui/react";
import React from "react";

export const PageLoader = () => {
  return (
    <Center h="100vh">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </Center>
  );
};
