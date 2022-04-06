import { GOOGLE_API_KEY, GOOGLE_AUTH_KEY } from "../constants";

export function authGoogle(cb: (token: GoogleApiOAuth2TokenObject) => void) {
  window.gapi.client
    .init({
      apiKey: GOOGLE_API_KEY,
      clientId: GOOGLE_AUTH_KEY,
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
      ],
      //scope: "https://www.googleapis.com/auth/youtube.force-ssl",
      scope: "https://www.googleapis.com/auth/youtube.readonly",
    })
    .then(() => {
      gapi.auth.authorize(
        {
          authuser: -1,
          client_id: GOOGLE_AUTH_KEY,
          scope: "https://www.googleapis.com/auth/youtube.force-ssl",
        },
        (token) => {
          gapi.client.setToken(token);
          cb(token);
        }
      );
    });
}
