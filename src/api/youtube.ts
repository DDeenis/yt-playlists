export type PlaylistsResponse =
  gapi.client.Response<gapi.client.youtube.PlaylistListResponse>;

export const getPlaylists = async (
  urls: string[],
  cb: (res: PlaylistsResponse) => void
) => {
  window.gapi.client.youtube.playlists
    .list({
      // access_token: token,
      part: ["id", "snippet", "contentDetails"].join(","),
      id: urls
        .map((url) => new URL(url).searchParams.get("list"))
        .filter((id) => Boolean(id))
        .join(","),
    })
    .then((val) => cb(val));
};
