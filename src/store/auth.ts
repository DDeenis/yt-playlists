import { atom } from "recoil";

export const userTokenAtom = atom<GoogleApiOAuth2TokenObject | undefined>({
  key: "user-google-token",
  default: undefined,
});

export const isAuthAtom = atom<boolean>({
  key: "is-auth-google",
  default: false,
});
