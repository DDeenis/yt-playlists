import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTryLogin } from "./hooks/auth";
import { LoadPlaylistsPage } from "./pages/LoadPlaylistsPage";

function App() {
  const tryLogin = useTryLogin();

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <Box w="100%" bg="black" minH="100vh" as="main">
      <Routes>
        <Route index element={<LoadPlaylistsPage />} />
      </Routes>
    </Box>
  );
}

export default App;
