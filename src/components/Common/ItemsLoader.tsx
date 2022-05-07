import { Center } from "@chakra-ui/react";
import React from "react";
import "./styles.css";

export const ItemsLoader = () => {
  return (
    <Center>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Center>
  );
};
