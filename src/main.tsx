import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
