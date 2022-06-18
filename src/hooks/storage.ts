import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { linksToIds } from "../helpers/playlists";
import { playlistsIdsBuffer } from "../store/playlists";

export const useLocalPlaylistsIds = () => {
  const [playlistsIds, setPlaylistsIds] = useRecoilState(playlistsIdsBuffer);

  const reloadPlaylists = () => {
    const saved = localStorage.getItem("savedPlaylists");

    if (saved) {
      setPlaylistsIds(JSON.parse(saved));
    }
  };

  const savePlaylistsLinks = (urls: string[], append = false) =>
    savePlaylistsIds(linksToIds(urls), append);

  const savePlaylistsIds = (ids: string[], append = false) => {
    let idsToSave = [...new Set(ids)];

    if (append) {
      idsToSave = [...new Set([...ids, ...playlistsIds])];
    }

    localStorage.setItem("savedPlaylists", JSON.stringify(idsToSave));
    reloadPlaylists();
  };

  const savePlaylists = (idsOrLinks: string[], append = false) => {
    if (idsOrLinks.every((l) => l.startsWith("https://www.youtube.com/"))) {
      savePlaylistsLinks(idsOrLinks, append);
    } else {
      savePlaylistsIds(idsOrLinks, append);
    }
  };

  useEffect(() => {
    reloadPlaylists();
  }, []);

  return {
    playlistsIds,
    reloadPlaylists,
    savePlaylistsLinks,
    savePlaylistsIds,
    savePlaylists,
  };
};

interface AppConfig {
  volume?: number;
}

export const useAppConfig = () => {
  const [appConfig, setAppConfig] = useState<AppConfig>();

  useEffect(() => {
    if (appConfig) localStorage.setItem("config", JSON.stringify(appConfig));
  }, [appConfig]);

  const loadConfig = (): Promise<AppConfig> => {
    const savedConfig = localStorage.getItem("config");
    if (!savedConfig) return new Promise((_, rej) => rej("No config found"));

    const config = JSON.parse(savedConfig);
    setAppConfig(config);
    return new Promise((res) => res(config));
  };

  const setConfigValue = (
    name: keyof AppConfig,
    value: AppConfig[typeof name]
  ) => {
    setAppConfig((config) => ({
      ...config,
      [name]: value,
    }));
  };

  return {
    appConfig,
    loadConfig,
    setConfigValue,
  };
};

export interface PlaylistsFilter {
  filter?: string;
  orderBy: "ascending" | "descending";
}

export const usePlaylistsFilter = () => {
  const [filter, setFilter] = useState<PlaylistsFilter>({
    orderBy: "descending",
  });

  const setFilterValue = (
    name: keyof PlaylistsFilter,
    value: PlaylistsFilter[typeof name]
  ) => {
    setFilter((filter) => ({
      ...filter,
      [name]: value,
    }));
  };

  const createSetFilterValue =
    (name: keyof PlaylistsFilter) => (value: PlaylistsFilter[typeof name]) => {
      setFilterValue(name, value);
    };

  const applyFilter = (playlists?: gapi.client.youtube.Playlist[]) => {
    if (!playlists) return playlists;

    let filtered = playlists;

    if (filter.filter) {
      filtered = filtered.filter((pl) => {
        const lowFilter = filter.filter?.toLowerCase();
        const lowTitle = pl.snippet?.title?.toLowerCase();

        if (lowFilter && lowTitle?.includes(lowFilter)) {
          return true;
        }
      });
    }

    return filtered.sort((a, b) => {
      const aTitle = String(a.snippet?.title);
      const bTitle = String(b.snippet?.title);

      if (filter.orderBy === "descending") return bTitle > aTitle ? -1 : 1;
      else return aTitle > bTitle ? -1 : 1;
    });
  };

  return {
    filter,
    setFilterValue,
    createSetFilterValue,
    applyFilter,
  };
};
