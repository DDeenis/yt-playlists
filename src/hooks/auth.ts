import { useSetRecoilState } from "recoil";
import { authGoogle, vaidateToken } from "../api/google";
import { isAuthAtom, userTokenAtom } from "../store/auth";

export const useGoogleAuth = () => {
  const setToken = useSetRecoilState(userTokenAtom);
  const setIsAuth = useSetRecoilState(isAuthAtom);

  return () => {
    const gapi = window.gapi;

    return new Promise((res, rej) => {
      gapi.load("client", () => {
        const storedToken = localStorage.getItem("token");

        if (storedToken !== null) {
          const token = JSON.parse(storedToken);
          setToken(token);
          setIsAuth(true);
          gapi.client.setToken(token);
          gapi.client.load("youtube", "v3", () => res(token));
        } else {
          authGoogle((token) => {
            const tokenCopy = JSON.parse(JSON.stringify(token));
            setToken(tokenCopy);
            setIsAuth(true);
            localStorage.setItem("token", JSON.stringify(token));
            gapi.client.load("youtube", "v3", () => res(token));
          }).catch(() => rej());
        }
      });
    });
  };
};

export function useTryLogin() {
  const setIsAuth = useSetRecoilState(isAuthAtom);
  const setToken = useSetRecoilState(userTokenAtom);

  return () =>
    new Promise((res, rej) => {
      window.gapi.load("client", async () => {
        const storedToken = localStorage.getItem("token");

        if (storedToken === null) {
          rej();
          return;
        }

        const token: GoogleApiOAuth2TokenObject = JSON.parse(storedToken);
        const isValid = await vaidateToken(token.access_token);

        if (isValid) {
          setToken(token);
          window.gapi.client.setToken(token);
          window.gapi.client.load("youtube", "v3", () => {
            setIsAuth(true);
            res(token);
          });
        } else {
          setIsAuth(false);
          localStorage.removeItem("token");
          rej();
        }
      });
    });
}
