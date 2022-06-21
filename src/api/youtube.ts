export const getPlaylists = async (urls: string[]) => {
  return window.gapi.client.youtube.playlists.list({
    part: ["id", "snippet", "contentDetails"].join(","),
    id: urls
      .map((url) => new URL(url).searchParams.get("list"))
      .filter((id) => Boolean(id))
      .join(","),
    maxResults: 50,
  });
};

export const getPlaylistsById = async (ids: string[]) => {
  return window.gapi.client.youtube.playlists.list({
    part: ["id", "snippet", "contentDetails"].join(","),
    id: ids.join(","),
    maxResults: 50,
  });
};

export const getPlaylistItems = (playlistId: string, pageToken?: string) => {
  return window.gapi.client.youtube.playlistItems.list({
    part: ["id", "snippet", "contentDetails"].join(","),
    playlistId,
    maxResults: 50,
    pageToken,
  });
};

export const getPlaylistVideos = (ids: string[]) => {
  return window.gapi.client.youtube.videos.list({
    part: ["snippet", "contentDetails"].join(","),
    id: ids.join(","),
    maxResults: 50,
  });
};

export const getVideosWithDuration = (
  playlistItems: gapi.client.youtube.PlaylistItem[]
) => {
  const ids = playlistItems
    ?.map((i) =>
      i.snippet?.resourceId?.videoId ? i.snippet?.resourceId?.videoId : ""
    )
    .filter((i) => i !== "");

  return getPlaylistVideos(ids);
};

export const searchPlaylists = (query: string, count = 15) => {
  return window.gapi.client.youtube.search.list({
    part: ["snippet"],
    maxResults: count,
    order: "relevance",
    q: query,
    safeSearch: "none",
    type: ["playlist"],
  });
};
