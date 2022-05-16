import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/Common/PrivateRoute";
import { Player } from "./components/Player/Player";
import { useTryLogin } from "./hooks/auth";
import { usePlayerConfig } from "./hooks/playlist";
import { useAppConfig } from "./hooks/storage";
import { LibraryPage } from "./pages/LibraryPage";
import { LoadPlaylistsPage } from "./pages/LoadPlaylistsPage";
import { LoginPage } from "./pages/LoginPage";
import { PlaylistPage } from "./pages/PlaylistPage";

function App() {
  const tryLogin = useTryLogin();
  const { config, setConfigValue } = usePlayerConfig();
  const { appConfig, loadConfig } = useAppConfig();

  const setVisible = (val: boolean) => setConfigValue("visible", val);

  useEffect(() => {
    tryLogin().catch(() => console.warn("Authomatic auth was not successfull"));
    loadConfig()
      ?.then((config) => {
        if (config.volume) setConfigValue("volume", config.volume);
      })
      .catch(() => console.log("No app config found"));
  }, []);

  return (
    <Box w="100%" bg="black" minH="100vh" as="main">
      <Routes>
        <Route index element={<LoadPlaylistsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/library"
          element={
            <PrivateRoute>
              <LibraryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlist/:id"
          element={
            <PrivateRoute>
              <PlaylistPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Player {...config} setVisible={setVisible} />
    </Box>
  );
}

export default App;
