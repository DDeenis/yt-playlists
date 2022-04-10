import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/Common/PrivateRoute";
import { useTryLogin } from "./hooks/auth";
import { LibraryPage } from "./pages/LibraryPage";
import { LoadPlaylistsPage } from "./pages/LoadPlaylistsPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const tryLogin = useTryLogin();

  useEffect(() => {
    tryLogin().catch(() => console.log("Authomatic auth was not successfull"));
  }, []);

  return (
    <Box w="100%" bg="black" minH="100vh" as="main">
      <Routes>
        <Route index element={<LoadPlaylistsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/library"
          element={
            <PrivateRoute then="/library">
              <LibraryPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
