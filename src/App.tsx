import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/Common/PrivateRoute";
import { useTryLogin } from "./hooks/auth";
import { LibraryPage } from "./pages/LibraryPage";
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
        <Route
          path="/library"
          element={
            <PrivateRoute redirectTo="/">
              <LibraryPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
