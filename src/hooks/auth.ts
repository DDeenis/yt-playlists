import { useSetRecoilState } from "recoil";
import { authGoogle, vaidateToken } from "../api/google";
import { isAuthAtom, userTokenAtom } from "../store/auth";

export const useGoogleAuth = () => {
  const setToken = useSetRecoilState(userTokenAtom);
  const setIsAuth = useSetRecoilState(isAuthAtom);

  return () => {
    const gapi = window.gapi;

    gapi.load("client", () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken !== null) {
        const token = JSON.parse(storedToken);
        setToken(token);
        gapi.client.setToken(token);
      } else {
        authGoogle((token) => {
          const tokenCopy = JSON.parse(JSON.stringify(token));
          setToken(tokenCopy);
          localStorage.setItem("token", JSON.stringify(token));
        });
      }

      gapi.client.load("youtube", "v3", () => setIsAuth(true));
    });
  };
};

export function useTryLogin() {
  const setIsAuth = useSetRecoilState(isAuthAtom);
  const setToken = useSetRecoilState(userTokenAtom);

  return () =>
    window.gapi.load("client", async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken === null) {
        return;
      }

      const token: GoogleApiOAuth2TokenObject = JSON.parse(storedToken);
      const isValid = await vaidateToken(token.access_token);

      if (isValid) {
        setToken(token);
        window.gapi.client.setToken(token);
        window.gapi.client.load("youtube", "v3", () => setIsAuth(true));
      } else {
        setIsAuth(false);
        localStorage.removeItem("token");
      }
    });
}
