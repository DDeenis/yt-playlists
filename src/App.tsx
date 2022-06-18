import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/Common/PrivateRoute";
import { Player } from "./components/Player/Player";
import { routes } from "./helpers/routes";
import { useTryLogin } from "./hooks/auth";
import { usePlayerConfig } from "./hooks/playlist";
import { useAppConfig } from "./hooks/storage";
import { LibraryPage } from "./pages/LibraryPage";
import { LoginPage } from "./pages/LoginPage";
import { PlaylistPage } from "./pages/PlaylistPage";

function App() {
  const tryLogin = useTryLogin();
  const { config, setConfigValue } = usePlayerConfig();
  const { loadConfig, setConfigValue: setAppConfigValue } = useAppConfig();

  const setVisible = (val: boolean) => setConfigValue("visible", val);

  useEffect(() => {
    tryLogin().catch(() => console.warn("Authomatic auth was not successfull"));
    loadConfig()
      .then((config) => {
        if (config.volume) setConfigValue("volume", config.volume);
      })
      .catch((reason) => console.log(reason));

    setConfigValue("onVolumeChange", (volume) => {
      setConfigValue("volume", volume);
      setAppConfigValue("volume", volume);
    });
  }, []);

  return (
    <Box w="100%" bg="black" minH="100vh" as="main">
      <Routes>
        <Route index element={<LoginPage />} />
        <Route
          path={routes.library}
          element={
            <PrivateRoute>
              <LibraryPage />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.playlist(":id")}
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
