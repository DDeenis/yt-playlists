import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useTryLogin } from "../../hooks/auth";
import { isAuthAtom } from "../../store/auth";
import { PageLoader } from "./PageLoader";

type Props = {
  redirectTo: string;
};

export const PrivateRoute: React.FC<Props> = ({ redirectTo, children }) => {
  const isAuth = useRecoilValue(isAuthAtom);
  const [needLogin, setNeedLogin] = useState<boolean>();
  const tryLogin = useTryLogin();

  useEffect(() => {
    tryLogin()
      .then(() => setNeedLogin(false))
      .catch(() => setNeedLogin(true));
  }, []);

  if (needLogin === undefined) {
    return <PageLoader />;
  }

  if (needLogin) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};
