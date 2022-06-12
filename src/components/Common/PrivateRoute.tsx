import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTryLogin } from "../../hooks/auth";
import { PageLoader } from "./PageLoader";

type Props = {
  redirectTo?: string;
  then?: string;
};

export const PrivateRoute: React.FC<Props> = ({ redirectTo, children }) => {
  const [needLogin, setNeedLogin] = useState<boolean>();
  const location = useLocation();
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
    const then = location.pathname;
    const url = redirectTo ? `${redirectTo}?then=${then}` : `/?then=${then}`;
    return <Navigate to={url} />;
  }

  return <>{children}</>;
};
