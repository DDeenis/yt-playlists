import { useSetRecoilState } from "recoil";
import { authGoogle } from "../api/google";
import { isAuthAtom, userTokenAtom } from "../store/auth";

export const useGoogleAuth = () => {
  const setToken = useSetRecoilState(userTokenAtom);
  const setIsAuth = useSetRecoilState(isAuthAtom);

  return () => {
    const gapi = window.gapi;

    gapi.load("client", () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken !== null) {
        setToken(JSON.parse(storedToken));
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
