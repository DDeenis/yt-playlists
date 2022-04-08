import { GOOGLE_API_KEY, GOOGLE_AUTH_KEY } from "../constants";

export function authGoogle(cb: (token: GoogleApiOAuth2TokenObject) => void) {
  return window.gapi.client
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

export async function vaidateToken(access_token: string) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${access_token}`
  );

  return response?.ok;
}
