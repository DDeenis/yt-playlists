type PlaylistsResponse =
  gapi.client.Response<gapi.client.youtube.PlaylistListResponse>;

type PlaylistsItemsResponse =
  gapi.client.Response<gapi.client.youtube.PlaylistItemListResponse>;

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

export const getPlaylistItems = (playlistId: string) => {
  return window.gapi.client.youtube.playlistItems.list({
    part: ["id", "snippet", "contentDetails"].join(","),
    playlistId,
    maxResults: 50,
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
