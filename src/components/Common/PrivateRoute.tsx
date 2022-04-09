import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useTryLogin } from "../../hooks/auth";
import { isAuthAtom } from "../../store/auth";

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
    // TODO: add loader component
    return <span style={{ color: "white" }}>Loading...</span>;
  }

  if (needLogin) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};
